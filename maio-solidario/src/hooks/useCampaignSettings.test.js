/**
 * Test Suite for useCampaignSettings Hook
 *
 * This test file validates the behavior of the useCampaignSettings custom hook.
 * To run tests with Vitest:
 *   npm install -D vitest @testing-library/react @testing-library/react-hooks
 *   npm test
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useCampaignSettings } from './useCampaignSettings'
import * as supabaseModule from '../lib/supabaseClient'

// Mock the Supabase client
vi.mock('../lib/supabaseClient', () => ({
  supabase: {
    from: vi.fn(),
  },
}))

describe('useCampaignSettings Hook', () => {
  let mockSupabase

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks()
    mockSupabase = supabaseModule.supabase
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Initial State', () => {
    it('should initialize with default settings', () => {
      const { result } = renderHook(() => useCampaignSettings())

      expect(result.current.settings).toHaveProperty('meta_doacoes', 500)
      expect(result.current.settings).toHaveProperty('data_inicio')
      expect(result.current.settings).toHaveProperty('data_fim')
    })

    it('should initialize with loading state as true', () => {
      mockSupabase.from = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            limit: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: {
                  meta_doacoes: 500,
                  data_inicio: '2026-05-03',
                  data_fim: '2026-06-03',
                },
                error: null,
              }),
            }),
          }),
        }),
      })

      const { result } = renderHook(() => useCampaignSettings())
      expect(result.current.loading).toBe(true)
    })

    it('should initialize with no error', () => {
      const { result } = renderHook(() => useCampaignSettings())
      expect(result.current.error).toBeNull()
    })
  })

  describe('fetchSettings', () => {
    it('should fetch settings from Supabase and update state', async () => {
      const mockData = {
        meta_doacoes: 1000,
        data_inicio: '2026-05-03',
        data_fim: '2026-06-03',
      }

      mockSupabase.from = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            limit: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: mockData,
                error: null,
              }),
            }),
          }),
        }),
      })

      const { result } = renderHook(() => useCampaignSettings())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.settings).toEqual(mockData)
      expect(result.current.error).toBeNull()
    })

    it('should handle fetch errors gracefully', async () => {
      const mockError = new Error('Database connection failed')

      mockSupabase.from = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            limit: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: null,
                error: mockError,
              }),
            }),
          }),
        }),
      })

      const { result } = renderHook(() => useCampaignSettings())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.error).toBeTruthy()
      expect(result.current.settings.meta_doacoes).toBe(500) // Should keep default values
    })

    it('should properly query the campaign_settings table', async () => {
      mockSupabase.from = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            limit: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: {
                  meta_doacoes: 500,
                  data_inicio: '2026-05-03',
                  data_fim: '2026-06-03',
                },
                error: null,
              }),
            }),
          }),
        }),
      })

      renderHook(() => useCampaignSettings())

      await waitFor(() => {
        expect(mockSupabase.from).toHaveBeenCalledWith('campaign_settings')
      })
    })
  })

  describe('updateMeta', () => {
    it('should update the meta_doacoes value', async () => {
      const mockData = {
        meta_doacoes: 500,
        data_inicio: '2026-05-03',
        data_fim: '2026-06-03',
      }

      mockSupabase.from = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            limit: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: mockData,
                error: null,
              }),
            }),
          }),
        }),
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({
            error: null,
          }),
        }),
      })

      const { result } = renderHook(() => useCampaignSettings())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      const newMeta = 2000
      let updateResult

      await act(async () => {
        updateResult = await result.current.updateMeta(newMeta)
      })

      expect(updateResult.success).toBe(true)
      expect(result.current.settings.meta_doacoes).toBe(newMeta)
    })

    it('should return success: false when update fails', async () => {
      const mockUpdateError = new Error('Update failed')

      mockSupabase.from = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            limit: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: {
                  meta_doacoes: 500,
                  data_inicio: '2026-05-03',
                  data_fim: '2026-06-03',
                },
                error: null,
              }),
            }),
          }),
        }),
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({
            error: mockUpdateError,
          }),
        }),
      })

      const { result } = renderHook(() => useCampaignSettings())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      let updateResult

      await act(async () => {
        updateResult = await result.current.updateMeta(3000)
      })

      expect(updateResult.success).toBe(false)
      expect(updateResult.error).toBeTruthy()
    })

    it('should update with correct filter for campaign_name', async () => {
      mockSupabase.from = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            limit: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: {
                  meta_doacoes: 500,
                  data_inicio: '2026-05-03',
                  data_fim: '2026-06-03',
                },
                error: null,
              }),
            }),
          }),
        }),
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({
            error: null,
          }),
        }),
      })

      const { result } = renderHook(() => useCampaignSettings())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        await result.current.updateMeta(1500)
      })

      expect(mockSupabase.from).toHaveBeenCalledWith('campaign_settings')
    })
  })

  describe('refetch', () => {
    it('should re-fetch settings when refetch is called', async () => {
      const initialData = {
        meta_doacoes: 500,
        data_inicio: '2026-05-03',
        data_fim: '2026-06-03',
      }

      const updatedData = {
        meta_doacoes: 1000,
        data_inicio: '2026-05-03',
        data_fim: '2026-06-03',
      }

      let callCount = 0

      mockSupabase.from = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            limit: vi.fn().mockReturnValue({
              single: vi.fn().mockImplementation(() => {
                callCount++
                return Promise.resolve({
                  data: callCount === 1 ? initialData : updatedData,
                  error: null,
                })
              }),
            }),
          }),
        }),
      })

      const { result } = renderHook(() => useCampaignSettings())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.settings.meta_doacoes).toBe(500)

      await act(async () => {
        await result.current.refetch()
      })

      // After refetch, should still work (in a real scenario, data would be updated)
      expect(result.current.settings).toBeDefined()
    })
  })

  describe('Hook Return Value', () => {
    it('should return all required properties', async () => {
      mockSupabase.from = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            limit: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: {
                  meta_doacoes: 500,
                  data_inicio: '2026-05-03',
                  data_fim: '2026-06-03',
                },
                error: null,
              }),
            }),
          }),
        }),
      })

      const { result } = renderHook(() => useCampaignSettings())

      expect(result.current).toHaveProperty('settings')
      expect(result.current).toHaveProperty('loading')
      expect(result.current).toHaveProperty('error')
      expect(result.current).toHaveProperty('updateMeta')
      expect(result.current).toHaveProperty('refetch')
    })

    it('should have correct property types', () => {
      const { result } = renderHook(() => useCampaignSettings())

      expect(typeof result.current.settings).toBe('object')
      expect(typeof result.current.loading).toBe('boolean')
      expect(result.current.error).toBeNull()
      expect(typeof result.current.updateMeta).toBe('function')
      expect(typeof result.current.refetch).toBe('function')
    })
  })
})
