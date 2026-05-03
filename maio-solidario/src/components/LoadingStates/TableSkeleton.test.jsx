import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { TableSkeleton } from './TableSkeleton'

describe('TableSkeleton', () => {
  it('renders a table element', () => {
    const { container } = render(<TableSkeleton />)
    const table = container.querySelector('.table-skeleton')
    expect(table).toBeTruthy()
    expect(table.tagName).toBe('TABLE')
  })

  it('renders header row with skeleton cells', () => {
    const { container } = render(<TableSkeleton columns={4} />)
    const headerCells = container.querySelectorAll('thead th')
    expect(headerCells.length).toBe(4)
    headerCells.forEach((cell) => {
      const skeleton = cell.querySelector('.skeleton')
      expect(skeleton).toBeTruthy()
    })
  })

  it('renders body rows with correct number of columns', () => {
    const { container } = render(<TableSkeleton rows={3} columns={4} />)
    const bodyRows = container.querySelectorAll('tbody tr')
    expect(bodyRows.length).toBe(3)
    bodyRows.forEach((row) => {
      const cells = row.querySelectorAll('td')
      expect(cells.length).toBe(4)
    })
  })

  it('renders skeleton elements in all cells', () => {
    const { container } = render(<TableSkeleton rows={3} columns={4} />)
    const allSkeletons = container.querySelectorAll('.skeleton-element')
    // 4 headers + (3 rows * 4 columns) = 16 skeletons
    expect(allSkeletons.length).toBe(16)
  })

  it('uses default rows and columns when not provided', () => {
    const { container } = render(<TableSkeleton />)
    const bodyRows = container.querySelectorAll('tbody tr')
    const headerCells = container.querySelectorAll('thead th')
    expect(headerCells.length).toBe(4)
    expect(bodyRows.length).toBe(5)
  })

  it('renders varying widths for cells', () => {
    const { container } = render(<TableSkeleton rows={2} columns={3} />)
    const cells = container.querySelectorAll('tbody td')
    // First column should be 85%, others 60%
    const firstColSkeleton = cells[0].querySelector('.skeleton-element')
    const secondColSkeleton = cells[1].querySelector('.skeleton-element')
    expect(firstColSkeleton).toHaveStyle(/width:\s*85%/)
    expect(secondColSkeleton).toHaveStyle(/width:\s*60%/)
  })
})
