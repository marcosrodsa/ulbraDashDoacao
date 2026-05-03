import '../../styles/loading-states.css'

export function ChartSkeleton({ height = '300px' }) {
  return (
    <div className="chart-skeleton" style={{ minHeight: height }}>
      <div className="spinner" />
      <p className="chart-skeleton-message">Carregando gráfico...</p>
    </div>
  )
}
