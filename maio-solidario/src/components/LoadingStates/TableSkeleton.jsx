import { SkeletonLoader } from './SkeletonLoader'
import '../../styles/loading-states.css'

export function TableSkeleton({ rows = 5, columns = 4 }) {
  const headerCells = Array.from({ length: columns }, (_, i) => (
    <th key={`header-${i}`}>
      <SkeletonLoader height="16px" width={`${70 + Math.random() * 30}%`} />
    </th>
  ))

  const bodyRows = Array.from({ length: rows }, (_, rowIdx) => (
    <tr key={`row-${rowIdx}`}>
      {Array.from({ length: columns }, (_, colIdx) => (
        <td key={`cell-${rowIdx}-${colIdx}`}>
          <SkeletonLoader
            height="16px"
            width={colIdx === 0 ? '85%' : '60%'}
          />
        </td>
      ))}
    </tr>
  ))

  return (
    <table className="table-skeleton">
      <thead>
        <tr>{headerCells}</tr>
      </thead>
      <tbody>{bodyRows}</tbody>
    </table>
  )
}
