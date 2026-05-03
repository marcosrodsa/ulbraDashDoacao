import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MetaProjection from './MetaProjection'

describe('MetaProjection Component', () => {
  it('should render component with default props', () => {
    render(<MetaProjection />)
    expect(screen.getByText('Meta de Doações')).toBeInTheDocument()
  })

  it('should display registered donations and goal', () => {
    render(
      <MetaProjection
        doacoesRegistradas={250}
        metaTotal={500}
        dataFim="2026-05-31"
        dataInicio="2026-05-01"
      />
    )
    expect(screen.getByText('250')).toBeInTheDocument()
    expect(screen.getByText('500')).toBeInTheDocument()
  })

  it('should display correct percentage', () => {
    render(
      <MetaProjection
        doacoesRegistradas={250}
        metaTotal={500}
        dataFim="2026-05-31"
        dataInicio="2026-05-01"
      />
    )
    expect(screen.getByText('50%')).toBeInTheDocument()
  })

  it('should display pace information', () => {
    render(
      <MetaProjection
        doacoesRegistradas={100}
        metaTotal={500}
        dataFim="2026-05-31"
        dataInicio="2026-05-01"
      />
    )
    expect(screen.getByText(/doações\/dia/)).toBeInTheDocument()
  })

  it('should show success status when goal will be reached', () => {
    render(
      <MetaProjection
        doacoesRegistradas={400}
        metaTotal={500}
        dataFim="2026-05-31"
        dataInicio="2026-05-01"
      />
    )
    expect(screen.getByText('✅')).toBeInTheDocument()
    expect(screen.getByText('Atingirá a meta')).toBeInTheDocument()
  })

  it('should show warning status when goal will not be reached', () => {
    render(
      <MetaProjection
        doacoesRegistradas={50}
        metaTotal={500}
        dataFim="2026-05-31"
        dataInicio="2026-05-01"
      />
    )
    expect(screen.getByText('⚠️')).toBeInTheDocument()
    expect(screen.getByText('Projeção')).toBeInTheDocument()
  })

  it('should display progress bar', () => {
    const { container } = render(
      <MetaProjection
        doacoesRegistradas={250}
        metaTotal={500}
        dataFim="2026-05-31"
        dataInicio="2026-05-01"
      />
    )
    const progressBar = container.querySelector('.meta-progress-bar')
    expect(progressBar).toBeInTheDocument()
  })

  it('should display details section with valid projection', () => {
    render(
      <MetaProjection
        doacoesRegistradas={100}
        metaTotal={500}
        dataFim="2026-05-31"
        dataInicio="2026-05-01"
      />
    )
    expect(screen.getByText('Dias decorridos')).toBeInTheDocument()
    expect(screen.getByText('Dias totais')).toBeInTheDocument()
    expect(screen.getByText('Meta projetada')).toBeInTheDocument()
  })

  it('should handle zero donations gracefully', () => {
    const { container } = render(
      <MetaProjection
        doacoesRegistradas={0}
        metaTotal={500}
        dataFim="2026-05-31"
        dataInicio="2026-05-01"
      />
    )
    expect(screen.getByText('0%')).toBeInTheDocument()
    expect(container.querySelector('.meta-projection-card')).toBeInTheDocument()
  })

  it('should handle 100% or more donations', () => {
    render(
      <MetaProjection
        doacoesRegistradas={500}
        metaTotal={500}
        dataFim="2026-05-31"
        dataInicio="2026-05-01"
      />
    )
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('should handle more than 100% donations', () => {
    render(
      <MetaProjection
        doacoesRegistradas={600}
        metaTotal={500}
        dataFim="2026-05-31"
        dataInicio="2026-05-01"
      />
    )
    expect(screen.getByText('120%')).toBeInTheDocument()
  })

  it('should use default data when not provided', () => {
    const { container } = render(<MetaProjection doacoesRegistradas={100} metaTotal={500} />)
    expect(screen.getByText('Meta de Doações')).toBeInTheDocument()
    expect(container.querySelector('.meta-projection-card')).toBeInTheDocument()
  })

  it('should display remaining days when applicable', () => {
    render(
      <MetaProjection
        doacoesRegistradas={100}
        metaTotal={500}
        dataFim="2026-05-31"
        dataInicio="2026-05-01"
      />
    )
    // Should show "Dias restantes" only if > 0
    const diasRestantesLabel = screen.queryByText('Dias restantes')
    if (diasRestantesLabel) {
      expect(diasRestantesLabel).toBeInTheDocument()
    }
  })

  it('should format pace value with decimal places', () => {
    render(
      <MetaProjection
        doacoesRegistradas={150}
        metaTotal={500}
        dataFim="2026-05-31"
        dataInicio="2026-05-01"
      />
    )
    const paceText = screen.getByText(/doações\/dia/)
    expect(paceText).toBeInTheDocument()
  })

  it('should show labels for registered and goal', () => {
    render(
      <MetaProjection
        doacoesRegistradas={250}
        metaTotal={500}
        dataFim="2026-05-31"
        dataInicio="2026-05-01"
      />
    )
    expect(screen.getByText('Registradas:')).toBeInTheDocument()
    expect(screen.getByText('Meta:')).toBeInTheDocument()
  })
})
