import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkeletonLoader, KPICardSkeleton } from './SkeletonLoader'

describe('SkeletonLoader', () => {
  it('renders a skeleton element', () => {
    const { container } = render(<SkeletonLoader />)
    const skeleton = container.querySelector('.skeleton-element')
    expect(skeleton).toBeTruthy()
    expect(skeleton).toHaveClass('skeleton')
  })

  it('applies custom width and height', () => {
    const { container } = render(<SkeletonLoader width="200px" height="20px" />)
    const skeleton = container.querySelector('.skeleton-element')
    expect(skeleton).toHaveStyle('width: 200px')
    expect(skeleton).toHaveStyle('height: 20px')
  })

  it('has default width and height', () => {
    const { container } = render(<SkeletonLoader />)
    const skeleton = container.querySelector('.skeleton-element')
    expect(skeleton).toHaveStyle('width: 100%')
    expect(skeleton).toHaveStyle('height: 16px')
  })
})

describe('KPICardSkeleton', () => {
  it('renders three skeleton elements', () => {
    const { container } = render(<KPICardSkeleton />)
    const skeletons = container.querySelectorAll('.skeleton-element')
    expect(skeletons.length).toBe(3)
  })

  it('has correct structure with label, value, and metric', () => {
    const { container } = render(<KPICardSkeleton />)
    const kpiCard = container.querySelector('.kpi-card-skeleton')
    expect(kpiCard).toBeTruthy()
    const skeletons = kpiCard.querySelectorAll('.skeleton-element')
    expect(skeletons.length).toBe(3)
  })

  it('renders with correct height dimensions', () => {
    const { container } = render(<KPICardSkeleton />)
    const skeletons = container.querySelectorAll('.skeleton-element')
    expect(skeletons[0]).toHaveStyle('height: 14px')
    expect(skeletons[1]).toHaveStyle('height: 40px')
    expect(skeletons[2]).toHaveStyle('height: 36px')
  })
})
