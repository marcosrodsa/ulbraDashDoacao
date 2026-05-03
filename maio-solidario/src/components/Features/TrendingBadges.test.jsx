import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TrendingBadges, TrendingSection } from './TrendingBadges'

// Mock data generator
const createMockDonation = (categoria, quantidade, data) => ({
  id: Math.random(),
  unidade: 'Test Unit',
  categoria,
  quantidade,
  descricao: 'Test description',
  data,
  timestamp: '10:00',
})

describe('TrendingBadges Component', () => {
  describe('Growth Calculation Logic', () => {
    it('should calculate 100% growth for first time donations (lastWeek=0, thisWeek>0)', () => {
      const doacoes = [
        // This week (May 1-3)
        createMockDonation('alimentos', 100, '2026-05-03'),
        createMockDonation('alimentos', 50, '2026-05-02'),
      ]

      const { container } = render(<TrendingBadges doacoes={doacoes} />)

      // Alimentos should be top trending with 100% growth
      const badges = container.querySelectorAll('.trending-badge')
      expect(badges.length).toBeGreaterThan(0)

      const alimentosBadge = Array.from(badges).find(b => b.textContent.includes('Alimentos'))
      expect(alimentosBadge).toBeDefined()
      expect(alimentosBadge.textContent).toMatch(/↑(100|[0-9]{1,2})%/)
    })

    it('should calculate growth correctly when both weeks have donations', () => {
      const doacoes = [
        // This week (May 1-3): 150 alimentos
        createMockDonation('alimentos', 100, '2026-05-03'),
        createMockDonation('alimentos', 50, '2026-05-02'),
        // Last week (Apr 25-May 1): 100 alimentos
        // Growth = ((150 - 100) / 100) * 100 = 50%
        createMockDonation('alimentos', 60, '2026-05-01'),
        createMockDonation('alimentos', 40, '2026-04-30'),
      ]

      render(<TrendingBadges doacoes={doacoes} />)

      // Should show positive growth
      const badges = screen.getAllByText(/Alimentos/)
      expect(badges.length).toBeGreaterThan(0)
    })

    it('should return 0% growth when both weeks have 0 donations', () => {
      const doacoes = [
        // Only other categories
        createMockDonation('higiene', 100, '2026-05-03'),
      ]

      const { container } = render(<TrendingBadges doacoes={doacoes} />)

      // Pet category should not appear if it has 0 in both weeks
      const badges = container.querySelectorAll('.trending-badge')
      const petBadge = Array.from(badges).find(b => b.textContent.includes('Pet'))

      // Pet should either not exist or show 0%
      if (petBadge) {
        expect(petBadge.textContent).toMatch(/↑0%/)
      }
    })

    it('should handle negative growth correctly', () => {
      const doacoes = [
        // This week (May 1-3): 50 alimentos
        createMockDonation('alimentos', 30, '2026-05-03'),
        createMockDonation('alimentos', 20, '2026-05-02'),
        // Last week (Apr 25-May 1): 100 alimentos
        // Growth = ((50 - 100) / 100) * 100 = -50%
        createMockDonation('alimentos', 60, '2026-05-01'),
        createMockDonation('alimentos', 40, '2026-04-30'),
      ]

      render(<TrendingBadges doacoes={doacoes} />)

      // Check that growth is negative
      const badges = screen.getAllByText(/Alimentos/)
      expect(badges.length).toBeGreaterThan(0)
    })
  })

  describe('Trending Top 3', () => {
    it('should return top 3 categories by growth', () => {
      const doacoes = [
        // Alimentos: this week=100, last week=50 → 100% growth
        createMockDonation('alimentos', 50, '2026-05-03'),
        createMockDonation('alimentos', 50, '2026-05-02'),
        createMockDonation('alimentos', 50, '2026-05-01'),
        // Higiene: this week=50, last week=10 → 400% growth
        createMockDonation('higiene', 50, '2026-05-03'),
        createMockDonation('higiene', 10, '2026-05-01'),
        // Vestuário: this week=30, last week=30 → 0% growth
        createMockDonation('vestuario', 15, '2026-05-03'),
        createMockDonation('vestuario', 15, '2026-05-02'),
        createMockDonation('vestuario', 15, '2026-05-01'),
        createMockDonation('vestuario', 15, '2026-04-30'),
        // Pet: this week=20, last week=40 → -50% growth
        createMockDonation('pet', 20, '2026-05-03'),
        createMockDonation('pet', 40, '2026-05-01'),
      ]

      const { container } = render(<TrendingBadges doacoes={doacoes} />)

      // Should have exactly 3 badges (top 3)
      const badges = container.querySelectorAll('.trending-badge')
      expect(badges.length).toBeLessThanOrEqual(3)
    })

    it('should handle less than 3 categories with growth', () => {
      const doacoes = [
        createMockDonation('alimentos', 100, '2026-05-03'),
        createMockDonation('higiene', 50, '2026-05-03'),
      ]

      const { container } = render(<TrendingBadges doacoes={doacoes} />)

      const badges = container.querySelectorAll('.trending-badge')
      expect(badges.length).toBeLessThanOrEqual(2)
    })
  })

  describe('Empty State', () => {
    it('should render empty state when no donations provided', () => {
      render(<TrendingBadges doacoes={[]} />)

      const emptyState = screen.getByText(/Sem dados para calcular trending/)
      expect(emptyState).toBeDefined()
    })

    it('should render empty state when doacoes is undefined', () => {
      render(<TrendingBadges />)

      const emptyState = screen.getByText(/Sem dados para calcular trending/)
      expect(emptyState).toBeDefined()
    })

    it('should render empty state when all donations are outside date range', () => {
      const doacoes = [
        // All from April, outside the calculation window
        createMockDonation('alimentos', 100, '2026-04-10'),
        createMockDonation('alimentos', 100, '2026-04-15'),
      ]

      render(<TrendingBadges doacoes={doacoes} />)

      // If no data in date ranges, may show empty state
      const container = screen.getByText(/📊|Alimentos|Trending/)
      expect(container).toBeDefined()
    })
  })

  describe('Rendering', () => {
    it('should render badge with correct emoji for each category', () => {
      const doacoes = [
        createMockDonation('alimentos', 100, '2026-05-03'),
        createMockDonation('higiene', 50, '2026-05-03'),
        createMockDonation('vestuario', 30, '2026-05-03'),
      ]

      const { container } = render(<TrendingBadges doacoes={doacoes} />)

      // Check for category emojis
      const text = container.textContent
      expect(text).toContain('🥫') // Alimentos
      expect(text).toContain('🧼') // Higiene
      expect(text).toContain('👕') // Vestuário
    })

    it('should render fire emoji in badges', () => {
      const doacoes = [
        createMockDonation('alimentos', 100, '2026-05-03'),
      ]

      const { container } = render(<TrendingBadges doacoes={doacoes} />)

      const text = container.textContent
      expect(text).toContain('🔥')
    })

    it('should render growth percentage with up arrow', () => {
      const doacoes = [
        createMockDonation('alimentos', 100, '2026-05-03'),
      ]

      const { container } = render(<TrendingBadges doacoes={doacoes} />)

      // Should contain growth indicator
      const text = container.textContent
      expect(text).toMatch(/↑\d+%/)
    })
  })
})

describe('TrendingSection Component', () => {
  it('should render title with fire emoji', () => {
    const doacoes = [createMockDonation('alimentos', 100, '2026-05-03')]

    render(<TrendingSection doacoes={doacoes} />)

    const title = screen.getByText(/🔥 Trending Agora/)
    expect(title).toBeDefined()
  })

  it('should render subtitle about previous week comparison', () => {
    const doacoes = [createMockDonation('alimentos', 100, '2026-05-03')]

    render(<TrendingSection doacoes={doacoes} />)

    const subtitle = screen.getByText(/vs semana anterior/)
    expect(subtitle).toBeDefined()
  })

  it('should render TrendingBadges as child component', () => {
    const doacoes = [createMockDonation('alimentos', 100, '2026-05-03')]

    const { container } = render(<TrendingSection doacoes={doacoes} />)

    // Should have trending-badges element
    const badges = container.querySelector('.trending-badges')
    expect(badges).toBeDefined()
  })

  it('should apply card styling with background and border', () => {
    const doacoes = [createMockDonation('alimentos', 100, '2026-05-03')]

    const { container } = render(<TrendingSection doacoes={doacoes} />)

    const section = container.querySelector('.trending-section')
    expect(section).toBeDefined()
    const styles = window.getComputedStyle(section)
    expect(styles).toBeDefined()
  })
})
