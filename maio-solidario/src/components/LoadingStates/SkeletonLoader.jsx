import '../../styles/loading-states.css'

export function SkeletonLoader({ width = '100%', height = '16px', variant = 'default' }) {
  const style = {
    width,
    height,
    display: 'block'
  }

  return <div className="skeleton-element skeleton" style={style} />
}

export function KPICardSkeleton() {
  return (
    <div className="kpi-card-skeleton">
      <div>
        <SkeletonLoader height="14px" width="60%" />
      </div>
      <div>
        <SkeletonLoader height="40px" width="80%" />
      </div>
      <div>
        <SkeletonLoader height="36px" width="100%" />
      </div>
    </div>
  )
}
