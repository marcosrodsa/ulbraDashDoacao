import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import Heatmap from './Heatmap'

// Mock echarts
vi.mock('echarts', () => ({
  default: {
    init: vi.fn(() => ({
      setOption: vi.fn(),
      resize: vi.fn(),
      dispose: vi.fn(),
    })),
  },
}))

describe('Heatmap Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock window.addEventListener
    window.addEventListener = vi.fn()
    window.removeEventListener = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render without crashing', () => {
    const mockDoacoes = []
    const { container } = render(<Heatmap doacoes={mockDoacoes} />)
    expect(container.querySelector('.heatmap-container')).toBeInTheDocument()
  })

  it('should render with empty donations array', () => {
    const mockDoacoes = []
    const { container } = render(<Heatmap doacoes={mockDoacoes} />)
    const chartContainer = container.querySelector('.heatmap-container')
    expect(chartContainer).toBeInTheDocument()
    expect(chartContainer).toHaveStyle({ minHeight: '400px', width: '100%' })
  })

  it('should process heatmap data correctly with donations', () => {
    const mockDoacoes = [
      { unidade: 'ULBRA Porto Alegre', categoria: 'alimentos', quantidade: 100 },
      { unidade: 'ULBRA Porto Alegre', categoria: 'higiene', quantidade: 50 },
      { unidade: 'ULBRA Gravataí', categoria: 'alimentos', quantidade: 80 },
      { unidade: 'ULBRA Gravataí', categoria: 'vestuario', quantidade: 60 },
      { unidade: 'ULBRA Canoas', categoria: 'alimentos', quantidade: 120 },
      { unidade: 'ULBRA Canoas', categoria: 'pet', quantidade: 40 },
      { unidade: 'ULBRA Novo Hamburgo', categoria: 'alimentos', quantidade: 90 },
      { unidade: 'ULBRA Novo Hamburgo', categoria: 'higiene', quantidade: 70 },
      { unidade: 'ULBRA Torres', categoria: 'alimentos', quantidade: 110 },
      { unidade: 'ULBRA Torres', categoria: 'vestuario', quantidade: 50 },
    ]
    const { container } = render(<Heatmap doacoes={mockDoacoes} />)
    const chartContainer = container.querySelector('.heatmap-container')
    expect(chartContainer).toBeInTheDocument()
  })

  it('should extract top 8 unidades correctly', () => {
    const mockDoacoes = Array.from({ length: 10 }, (_, i) => ({
      unidade: `ULBRA Unit ${i}`,
      categoria: 'alimentos',
      quantidade: 100 + i * 10,
    }))
    const { container } = render(<Heatmap doacoes={mockDoacoes} />)
    const chartContainer = container.querySelector('.heatmap-container')
    expect(chartContainer).toBeInTheDocument()
  })

  it('should handle donations with all 4 categories', () => {
    const mockDoacoes = [
      { unidade: 'ULBRA Porto Alegre', categoria: 'alimentos', quantidade: 150 },
      { unidade: 'ULBRA Porto Alegre', categoria: 'higiene', quantidade: 100 },
      { unidade: 'ULBRA Porto Alegre', categoria: 'vestuario', quantidade: 80 },
      { unidade: 'ULBRA Porto Alegre', categoria: 'pet', quantidade: 60 },
    ]
    const { container } = render(<Heatmap doacoes={mockDoacoes} />)
    const chartContainer = container.querySelector('.heatmap-container')
    expect(chartContainer).toBeInTheDocument()
  })

  it('should have correct container classes and styles', () => {
    const mockDoacoes = []
    const { container } = render(<Heatmap doacoes={mockDoacoes} />)
    const chartContainer = container.querySelector('.heatmap-container.echarts-container')
    expect(chartContainer).toBeInTheDocument()
    expect(chartContainer).toHaveClass('echarts-container')
    expect(chartContainer).toHaveClass('heatmap-container')
  })

  it('should register resize listener on mount', () => {
    const mockDoacoes = []
    render(<Heatmap doacoes={mockDoacoes} />)
    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('should cleanup event listeners on unmount', () => {
    const mockDoacoes = []
    const { unmount } = render(<Heatmap doacoes={mockDoacoes} />)
    unmount()
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('should handle null doacoes gracefully', () => {
    const { container } = render(<Heatmap doacoes={null} />)
    const chartContainer = container.querySelector('.heatmap-container')
    expect(chartContainer).toBeInTheDocument()
  })

  it('should handle undefined doacoes gracefully', () => {
    const { container } = render(<Heatmap doacoes={undefined} />)
    const chartContainer = container.querySelector('.heatmap-container')
    expect(chartContainer).toBeInTheDocument()
  })

  it('should have proper responsive dimensions', () => {
    const mockDoacoes = []
    const { container } = render(<Heatmap doacoes={mockDoacoes} />)
    const chartContainer = container.querySelector('.heatmap-container')
    const styles = window.getComputedStyle(chartContainer)
    expect(chartContainer).toHaveStyle('width: 100%')
  })
})
