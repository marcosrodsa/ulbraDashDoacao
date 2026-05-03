import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ChartSkeleton } from './ChartSkeleton'

describe('ChartSkeleton', () => {
  it('renders the chart skeleton container', () => {
    const { container } = render(<ChartSkeleton />)
    const chartSkeleton = container.querySelector('.chart-skeleton')
    expect(chartSkeleton).toBeTruthy()
  })

  it('renders a spinner', () => {
    const { container } = render(<ChartSkeleton />)
    const spinner = container.querySelector('.spinner')
    expect(spinner).toBeTruthy()
  })

  it('renders loading message in Portuguese', () => {
    const { getByText } = render(<ChartSkeleton />)
    const message = getByText('Carregando gráfico...')
    expect(message).toBeTruthy()
    expect(message).toHaveClass('chart-skeleton-message')
  })

  it('applies custom height', () => {
    const { container } = render(<ChartSkeleton height="400px" />)
    const chartSkeleton = container.querySelector('.chart-skeleton')
    expect(chartSkeleton).toHaveStyle('min-height: 400px')
  })

  it('has default height of 300px', () => {
    const { container } = render(<ChartSkeleton />)
    const chartSkeleton = container.querySelector('.chart-skeleton')
    expect(chartSkeleton).toHaveStyle('min-height: 300px')
  })

  it('displays spinner and message centered', () => {
    const { container } = render(<ChartSkeleton />)
    const chartSkeleton = container.querySelector('.chart-skeleton')
    expect(chartSkeleton).toHaveClass('chart-skeleton')
    const computedStyle = window.getComputedStyle(chartSkeleton)
    expect(chartSkeleton).toHaveStyle('display: flex')
  })
})
