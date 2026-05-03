import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ComposicaoToggle from './ComposicaoToggle'

// Mock echarts
vi.mock('echarts', () => ({
  default: {
    init: vi.fn(() => ({
      setOption: vi.fn(),
      resize: vi.fn(),
      dispose: vi.fn(),
      graphic: {
        LinearGradient: vi.fn((a, b, c, d, stops) => ({ stops })),
      },
    })),
  },
}))

// Mock Heatmap component
vi.mock('./Heatmap', () => ({
  default: ({ doacoes }) => <div data-testid="heatmap-mock">Heatmap: {doacoes?.length || 0} donations</div>,
}))

describe('ComposicaoToggle Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.addEventListener = vi.fn()
    window.removeEventListener = vi.fn()
  })

  const mockDoacoes = [
    { unidade: 'ULBRA Porto Alegre', categoria: 'alimentos', quantidade: 150 },
    { unidade: 'ULBRA Porto Alegre', categoria: 'higiene', quantidade: 100 },
    { unidade: 'ULBRA Gravataí', categoria: 'alimentos', quantidade: 120 },
    { unidade: 'ULBRA Gravataí', categoria: 'vestuario', quantidade: 80 },
    { unidade: 'ULBRA Canoas', categoria: 'alimentos', quantidade: 200 },
    { unidade: 'ULBRA Canoas', categoria: 'pet', quantidade: 60 },
    { unidade: 'ULBRA Novo Hamburgo', categoria: 'alimentos', quantidade: 180 },
    { unidade: 'ULBRA Novo Hamburgo', categoria: 'higiene', quantidade: 90 },
    { unidade: 'ULBRA Torres', categoria: 'alimentos', quantidade: 220 },
    { unidade: 'ULBRA Torres', categoria: 'vestuario', quantidade: 110 },
  ]

  const mockRanking = [
    { nome: 'ULBRA Canoas', total: 260, registros: 2 },
    { nome: 'ULBRA Torres', total: 330, registros: 2 },
    { nome: 'ULBRA Porto Alegre', total: 250, registros: 2 },
    { nome: 'ULBRA Novo Hamburgo', total: 270, registros: 2 },
    { nome: 'ULBRA Gravataí', total: 200, registros: 2 },
  ]

  const mockUnidades = [
    { id: 1, name: 'ULBRA Porto Alegre' },
    { id: 2, name: 'ULBRA Gravataí' },
    { id: 3, name: 'ULBRA Canoas' },
  ]

  it('should render without crashing', () => {
    const { container } = render(
      <ComposicaoToggle doacoes={mockDoacoes} ranking={mockRanking} unidades={mockUnidades} />
    )
    expect(container.querySelector('.composicao-toggle-container')).toBeInTheDocument()
  })

  it('should render toggle buttons', () => {
    render(<ComposicaoToggle doacoes={mockDoacoes} ranking={mockRanking} unidades={mockUnidades} />)
    expect(screen.getByText('Barras')).toBeInTheDocument()
    expect(screen.getByText('Heatmap')).toBeInTheDocument()
  })

  it('should have "Barras" button active by default', () => {
    render(<ComposicaoToggle doacoes={mockDoacoes} ranking={mockRanking} unidades={mockUnidades} />)
    const barrasBtn = screen.getByText('Barras')
    expect(barrasBtn).toHaveClass('active')
  })

  it('should toggle to heatmap mode when heatmap button is clicked', () => {
    render(<ComposicaoToggle doacoes={mockDoacoes} ranking={mockRanking} unidades={mockUnidades} />)
    const heatmapBtn = screen.getByText('Heatmap')
    fireEvent.click(heatmapBtn)
    expect(heatmapBtn).toHaveClass('active')
    expect(screen.getByTestId('heatmap-mock')).toBeInTheDocument()
  })

  it('should toggle back to barras mode when barras button is clicked', () => {
    const { container } = render(
      <ComposicaoToggle doacoes={mockDoacoes} ranking={mockRanking} unidades={mockUnidades} />
    )
    const heatmapBtn = screen.getByText('Heatmap')
    const barrasBtn = screen.getByText('Barras')

    // Switch to heatmap
    fireEvent.click(heatmapBtn)
    expect(heatmapBtn).toHaveClass('active')

    // Switch back to barras
    fireEvent.click(barrasBtn)
    expect(barrasBtn).toHaveClass('active')
    expect(heatmapBtn).not.toHaveClass('active')
  })

  it('should show echarts container in barras mode by default', () => {
    const { container } = render(
      <ComposicaoToggle doacoes={mockDoacoes} ranking={mockRanking} unidades={mockUnidades} />
    )
    expect(container.querySelector('.echarts-container')).toBeInTheDocument()
  })

  it('should hide echarts container when switching to heatmap', () => {
    const { container } = render(
      <ComposicaoToggle doacoes={mockDoacoes} ranking={mockRanking} unidades={mockUnidades} />
    )
    const heatmapBtn = screen.getByText('Heatmap')
    fireEvent.click(heatmapBtn)
    // ECharts container should not be rendered in heatmap mode
    const echartsContainers = container.querySelectorAll('.echarts-container')
    expect(echartsContainers.length).toBe(0)
  })

  it('should display heatmap when in heatmap mode', () => {
    render(<ComposicaoToggle doacoes={mockDoacoes} ranking={mockRanking} unidades={mockUnidades} />)
    const heatmapBtn = screen.getByText('Heatmap')
    fireEvent.click(heatmapBtn)
    expect(screen.getByTestId('heatmap-mock')).toBeInTheDocument()
  })

  it('should handle empty doacoes array', () => {
    const { container } = render(
      <ComposicaoToggle doacoes={[]} ranking={mockRanking} unidades={mockUnidades} />
    )
    expect(container.querySelector('.composicao-toggle-container')).toBeInTheDocument()
  })

  it('should handle empty ranking array', () => {
    const { container } = render(
      <ComposicaoToggle doacoes={mockDoacoes} ranking={[]} unidades={mockUnidades} />
    )
    expect(container.querySelector('.composicao-toggle-container')).toBeInTheDocument()
  })

  it('should render controls section', () => {
    const { container } = render(
      <ComposicaoToggle doacoes={mockDoacoes} ranking={mockRanking} unidades={mockUnidades} />
    )
    expect(container.querySelector('.composicao-controls')).toBeInTheDocument()
  })

  it('should have correct button styling', () => {
    render(<ComposicaoToggle doacoes={mockDoacoes} ranking={mockRanking} unidades={mockUnidades} />)
    const barrasBtn = screen.getByText('Barras')
    const heatmapBtn = screen.getByText('Heatmap')
    expect(barrasBtn).toHaveClass('composicao-btn')
    expect(heatmapBtn).toHaveClass('composicao-btn')
  })

  it('should register resize listener', () => {
    render(<ComposicaoToggle doacoes={mockDoacoes} ranking={mockRanking} unidades={mockUnidades} />)
    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('should cleanup event listeners on unmount', () => {
    const { unmount } = render(
      <ComposicaoToggle doacoes={mockDoacoes} ranking={mockRanking} unidades={mockUnidades} />
    )
    unmount()
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('should render with all button states correctly', () => {
    const { container } = render(
      <ComposicaoToggle doacoes={mockDoacoes} ranking={mockRanking} unidades={mockUnidades} />
    )
    const buttons = container.querySelectorAll('.composicao-btn')
    expect(buttons.length).toBe(2)
  })

  it('should pass doacoes prop to Heatmap', () => {
    render(<ComposicaoToggle doacoes={mockDoacoes} ranking={mockRanking} unidades={mockUnidades} />)
    const heatmapBtn = screen.getByText('Heatmap')
    fireEvent.click(heatmapBtn)
    expect(screen.getByTestId('heatmap-mock')).toHaveTextContent(`Heatmap: ${mockDoacoes.length} donations`)
  })

  it('should maintain toggle state through multiple switches', () => {
    render(<ComposicaoToggle doacoes={mockDoacoes} ranking={mockRanking} unidades={mockUnidades} />)
    const barrasBtn = screen.getByText('Barras')
    const heatmapBtn = screen.getByText('Heatmap')

    // Initial state: barras active
    expect(barrasBtn).toHaveClass('active')

    // Switch to heatmap
    fireEvent.click(heatmapBtn)
    expect(heatmapBtn).toHaveClass('active')
    expect(barrasBtn).not.toHaveClass('active')

    // Switch back to barras
    fireEvent.click(barrasBtn)
    expect(barrasBtn).toHaveClass('active')
    expect(heatmapBtn).not.toHaveClass('active')

    // Switch to heatmap again
    fireEvent.click(heatmapBtn)
    expect(heatmapBtn).toHaveClass('active')
    expect(barrasBtn).not.toHaveClass('active')
  })
})
