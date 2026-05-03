import React from 'react'

export function EmptyStateCard({ icon, title, description, action, variant = 'default' }) {
  const baseStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--sp-8)',
    borderRadius: 'var(--radius-lg)',
    textAlign: 'center',
    minHeight: '300px',
    border: '1px solid var(--surface-line)',
  }

  const variantStyles = {
    default: {
      ...baseStyles,
      backgroundColor: 'rgba(4, 90, 82, 0.08)',
    },
    warning: {
      ...baseStyles,
      backgroundColor: 'rgba(204, 162, 105, 0.12)',
      borderColor: 'rgba(204, 162, 105, 0.3)',
    },
    info: {
      ...baseStyles,
      backgroundColor: 'rgba(145, 186, 163, 0.1)',
      borderColor: 'rgba(145, 186, 163, 0.25)',
    },
  }

  const iconStyles = {
    fontSize: '48px',
    marginBottom: 'var(--sp-4)',
    display: 'block',
    lineHeight: 1,
  }

  const titleStyles = {
    fontSize: 'var(--fs-h3)',
    fontWeight: '600',
    color: 'var(--fg)',
    margin: '0 0 var(--sp-2) 0',
    fontFamily: 'var(--font-sans)',
  }

  const descriptionStyles = {
    fontSize: 'var(--fs-body)',
    color: 'var(--fg-muted)',
    margin: '0 0 var(--sp-4) 0',
    maxWidth: '400px',
  }

  const buttonStyles = {
    padding: 'var(--sp-2) var(--sp-4)',
    backgroundColor: 'var(--ulbra-primary)',
    color: 'var(--fg)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--fs-body)',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all var(--dur-base) var(--ease-standard)',
    textDecoration: 'none',
  }

  const buttonHoverStyles = {
    backgroundColor: 'var(--bg-elev-2)',
    boxShadow: 'var(--shadow-2)',
  }

  const [isHovering, setIsHovering] = React.useState(false)

  return (
    <div style={variantStyles[variant] || variantStyles.default}>
      {icon && <span style={iconStyles}>{icon}</span>}
      {title && <h3 style={titleStyles}>{title}</h3>}
      {description && <p style={descriptionStyles}>{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          style={isHovering ? { ...buttonStyles, ...buttonHoverStyles } : buttonStyles}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

export function NoDataMessage({ filterActive, onClearFilters }) {
  if (filterActive) {
    return (
      <EmptyStateCard
        icon="📭"
        title="Nenhuma doação neste filtro"
        description="Nenhuma doação foi encontrada com os filtros aplicados. Tente ajustar seus critérios de busca."
        action={{
          label: 'Limpar filtros',
          onClick: onClearFilters,
        }}
        variant="info"
      />
    )
  }

  return (
    <EmptyStateCard
      icon="📊"
      title="Sem dados disponíveis"
      description="Não há doações registradas no sistema. As doações aparecerão aqui assim que forem adicionadas."
      variant="default"
    />
  )
}

export function MetaNotConfigured({ onConfigure }) {
  return (
    <EmptyStateCard
      icon="⚙️"
      title="Meta não configurada"
      description="Configure uma meta de doação para começar a acompanhar o progresso das campanhas."
      action={{
        label: 'Acessar configurações',
        onClick: onConfigure,
      }}
      variant="warning"
    />
  )
}
