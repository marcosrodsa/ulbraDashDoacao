import { useMemo } from 'react'
import { IconFood, IconCleanliness, IconApparel, IconPetCare } from '../FontAwesomeIcons'
import '../../styles/trending-badges.css'

const CATEGORIAS = {
  alimentos: { Icon: IconFood, label: 'Alimentos', color: '#cca269', emoji: '🥫' },
  higiene: { Icon: IconCleanliness, label: 'Higiene', color: '#91baa3', emoji: '🧼' },
  vestuario: { Icon: IconApparel, label: 'Vestuário', color: '#a89e8b', emoji: '👕' },
  pet: { Icon: IconPetCare, label: 'Pet/Ração', color: '#66563d', emoji: '🐾' },
}

// Utility: calcular trending com lógica de crescimento
const calculateTrending = (doacoes) => {
  if (!doacoes || doacoes.length === 0) {
    return []
  }

  const today = new Date('2026-05-03') // Use consistent "today" for testing
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const fourteenDaysAgo = new Date(today)
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)

  // Parse dates consistently
  const dateToString = (date) => date.toISOString().split('T')[0]
  const thisWeekStart = dateToString(sevenDaysAgo)
  const lastWeekStart = dateToString(fourteenDaysAgo)
  const thisWeekEnd = dateToString(today)

  // Calculate totals per category for each period
  const thisWeekTotals = {}
  const lastWeekTotals = {}

  Object.keys(CATEGORIAS).forEach(cat => {
    thisWeekTotals[cat] = 0
    lastWeekTotals[cat] = 0
  })

  doacoes.forEach(doacao => {
    const donationDate = doacao.data // Format: YYYY-MM-DD

    // This week: 7 days ago to today
    if (donationDate >= thisWeekStart && donationDate <= thisWeekEnd) {
      thisWeekTotals[doacao.categoria] += doacao.quantidade
    }

    // Last week: 14 days ago to 7 days ago
    if (donationDate >= lastWeekStart && donationDate < thisWeekStart) {
      lastWeekTotals[doacao.categoria] += doacao.quantidade
    }
  })

  // Calculate growth percentage for each category
  const trending = Object.keys(CATEGORIAS).map(categoria => {
    const thisWeek = thisWeekTotals[categoria]
    const lastWeek = lastWeekTotals[categoria]

    let crescimento = 0

    if (lastWeek === 0 && thisWeek > 0) {
      // First time donations - consider as 100% growth
      crescimento = 100
    } else if (lastWeek === 0 && thisWeek === 0) {
      // No donations in either period
      crescimento = 0
    } else if (lastWeek > 0) {
      // Normal calculation
      crescimento = Math.round(((thisWeek - lastWeek) / lastWeek) * 100)
    }

    return {
      categoria,
      label: CATEGORIAS[categoria].label,
      emoji: CATEGORIAS[categoria].emoji,
      icon: CATEGORIAS[categoria].Icon,
      color: CATEGORIAS[categoria].color,
      thisWeek,
      lastWeek,
      crescimento,
    }
  })

  // Sort by growth descending and return top 3
  return trending
    .sort((a, b) => b.crescimento - a.crescimento)
    .slice(0, 3)
}

export function TrendingBadges({ doacoes = [] }) {
  const trending = useMemo(() => calculateTrending(doacoes), [doacoes])

  if (trending.length === 0) {
    return (
      <div className="trending-empty">
        <span>📊 Sem dados para calcular trending</span>
      </div>
    )
  }

  return (
    <div className="trending-badges">
      {trending.map(item => {
        const Icon = item.icon
        return (
          <div
            key={item.categoria}
            className="trending-badge"
            style={{
              backgroundColor: `${item.color}15`,
              borderColor: item.color,
            }}
          >
            <span className="trending-fire">🔥</span>
            <span className="trending-emoji">{item.emoji}</span>
            <span className="trending-label">{item.label}</span>
            <span className="trending-growth" style={{ color: item.color }}>
              ↑{item.crescimento}%
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function TrendingSection({ doacoes = [] }) {
  return (
    <div className="trending-section">
      <div className="trending-header">
        <h3 className="trending-title">🔥 Trending Agora</h3>
        <p className="trending-subtitle">(vs semana anterior)</p>
      </div>
      <TrendingBadges doacoes={doacoes} />
    </div>
  )
}
