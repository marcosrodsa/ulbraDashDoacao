import { describe, it, expect, beforeEach } from 'vitest'
import {
  calculateMetaProjection,
  formatarDataBR,
  formatarDataBRCompleta,
  calcularDiasEntre,
  diasAteData,
} from './metaCalculations'

describe('metaCalculations', () => {
  describe('calculateMetaProjection', () => {
    it('should calculate projection with valid inputs', () => {
      const result = calculateMetaProjection({
        doacoesRegistradas: 250,
        metaTotal: 500,
        dataInicio: '2026-05-01',
        dataFim: '2026-05-31',
      })

      expect(result).toHaveProperty('diasDecorridos')
      expect(result).toHaveProperty('diasTotais')
      expect(result).toHaveProperty('diasRestantes')
      expect(result).toHaveProperty('ritmo')
      expect(result).toHaveProperty('dataETA')
      expect(result).toHaveProperty('atingiraAteOFim')
      expect(result).toHaveProperty('percentualProjetado')
      expect(result).toHaveProperty('percentualFinal')
      expect(result).toHaveProperty('diacalculoETAFormatado')
      expect(result).toHaveProperty('doacoesAteOFim')
    })

    it('should return safe defaults when inputs are missing', () => {
      const result = calculateMetaProjection({
        doacoesRegistradas: null,
        metaTotal: 500,
        dataInicio: '2026-05-01',
        dataFim: '2026-05-31',
      })

      expect(result.diasDecorridos).toBe(0)
      expect(result.diasTotais).toBe(0)
      expect(result.ritmo).toBe(0)
      expect(result.atingiraAteOFim).toBe(false)
    })

    it('should return safe defaults when ritmo is 0', () => {
      const result = calculateMetaProjection({
        doacoesRegistradas: 0,
        metaTotal: 500,
        dataInicio: '2026-05-01',
        dataFim: '2026-05-31',
      })

      expect(result.ritmo).toBe(0)
      expect(result.atingiraAteOFim).toBe(false)
      expect(result.doacoesAteOFim).toBe(0)
    })

    it('should calculate correct number of days', () => {
      const result = calculateMetaProjection({
        doacoesRegistradas: 250,
        metaTotal: 500,
        dataInicio: '2026-05-01',
        dataFim: '2026-05-31',
      })

      // May 1 to May 31 = 31 days
      expect(result.diasTotais).toBe(31)
    })

    it('should indicate if goal will be reached', () => {
      const resultWillReach = calculateMetaProjection({
        doacoesRegistradas: 400,
        metaTotal: 500,
        dataInicio: '2026-05-01',
        dataFim: '2026-05-31',
      })

      // High pace should reach goal
      expect(resultWillReach.atingiraAteOFim).toBe(true)
    })

    it('should indicate if goal will not be reached', () => {
      const resultWontReach = calculateMetaProjection({
        doacoesRegistradas: 50,
        metaTotal: 500,
        dataInicio: '2026-05-01',
        dataFim: '2026-05-31',
      })

      // Low pace should not reach goal
      expect(resultWontReach.atingiraAteOFim).toBe(false)
    })

    it('should calculate percentual projetado correctly', () => {
      const result = calculateMetaProjection({
        doacoesRegistradas: 250,
        metaTotal: 500,
        dataInicio: '2026-05-01',
        dataFim: '2026-05-31',
      })

      // 250 donations in ? days, meta 500 over 31 days
      // percentualProjetado should be reasonable
      expect(result.percentualProjetado).toBeGreaterThan(0)
      expect(result.percentualProjetado).toBeLessThanOrEqual(100)
    })

    it('should return ETA date as valid Date object', () => {
      const result = calculateMetaProjection({
        doacoesRegistradas: 250,
        metaTotal: 500,
        dataInicio: '2026-05-01',
        dataFim: '2026-05-31',
      })

      if (result.dataETA) {
        expect(result.dataETA instanceof Date).toBe(true)
      }
    })
  })

  describe('formatarDataBR', () => {
    it('should format date as DD/MM', () => {
      const date = new Date('2026-05-15')
      const result = formatarDataBR(date)
      expect(result).toBe('15/05')
    })

    it('should pad single digit days and months with zero', () => {
      const date = new Date('2026-05-05')
      const result = formatarDataBR(date)
      expect(result).toBe('05/05')
    })

    it('should return N/A for null input', () => {
      const result = formatarDataBR(null)
      expect(result).toBe('N/A')
    })

    it('should return N/A for invalid input', () => {
      const result = formatarDataBR('invalid')
      expect(result).toBe('N/A')
    })
  })

  describe('formatarDataBRCompleta', () => {
    it('should format date as DD/MM/YYYY', () => {
      const date = new Date('2026-05-15')
      const result = formatarDataBRCompleta(date)
      expect(result).toBe('15/05/2026')
    })

    it('should pad single digit days and months with zero', () => {
      const date = new Date('2026-05-05')
      const result = formatarDataBRCompleta(date)
      expect(result).toBe('05/05/2026')
    })

    it('should return N/A for null input', () => {
      const result = formatarDataBRCompleta(null)
      expect(result).toBe('N/A')
    })
  })

  describe('calcularDiasEntre', () => {
    it('should calculate days between two Date objects', () => {
      const date1 = new Date('2026-05-01')
      const date2 = new Date('2026-05-05')
      const result = calcularDiasEntre(date1, date2)
      expect(result).toBe(4)
    })

    it('should calculate days between two date strings', () => {
      const result = calcularDiasEntre('2026-05-01', '2026-05-05')
      expect(result).toBe(4)
    })

    it('should return 0 for same dates', () => {
      const result = calcularDiasEntre('2026-05-01', '2026-05-01')
      expect(result).toBe(0)
    })

    it('should return negative for reversed dates', () => {
      const result = calcularDiasEntre('2026-05-05', '2026-05-01')
      expect(result).toBeLessThan(0)
    })

    it('should handle month boundaries correctly', () => {
      const result = calcularDiasEntre('2026-05-30', '2026-06-02')
      expect(result).toBe(3)
    })
  })

  describe('diasAteData', () => {
    it('should calculate positive days for future dates', () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 10)
      const result = diasAteData(futureDate)
      expect(result).toBeGreaterThan(0)
    })

    it('should return negative for past dates', () => {
      const pastDate = new Date()
      pastDate.setDate(pastDate.getDate() - 10)
      const result = diasAteData(pastDate)
      expect(result).toBeLessThan(0)
    })

    it('should return 0 for today', () => {
      const today = new Date()
      const result = diasAteData(today)
      expect(result).toBe(0)
    })
  })
})
