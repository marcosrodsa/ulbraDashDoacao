import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmptyStateCard, NoDataMessage, MetaNotConfigured } from './EmptyStateCard'

describe('EmptyStateCard', () => {
  it('renders with title and description', () => {
    render(
      <EmptyStateCard
        icon="📭"
        title="Test Title"
        description="Test description"
      />
    )

    expect(screen.getByText('Test Title')).toBeTruthy()
    expect(screen.getByText('Test description')).toBeTruthy()
    expect(screen.getByText('📭')).toBeTruthy()
  })

  it('renders with default variant styles', () => {
    const { container } = render(
      <EmptyStateCard
        title="Default Variant"
        variant="default"
      />
    )

    const card = container.querySelector('div')
    expect(card).toBeTruthy()
    expect(card.style.backgroundColor).toMatch(/rgba\(4, 90, 82/)
  })

  it('renders with warning variant styles', () => {
    const { container } = render(
      <EmptyStateCard
        title="Warning Variant"
        variant="warning"
      />
    )

    const card = container.querySelector('div')
    expect(card).toBeTruthy()
    expect(card.style.backgroundColor).toMatch(/rgba\(204, 162, 105/)
  })

  it('renders with info variant styles', () => {
    const { container } = render(
      <EmptyStateCard
        title="Info Variant"
        variant="info"
      />
    )

    const card = container.querySelector('div')
    expect(card).toBeTruthy()
    expect(card.style.backgroundColor).toMatch(/rgba\(145, 186, 163/)
  })

  it('renders action button when action is provided', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(
      <EmptyStateCard
        title="With Action"
        action={{
          label: 'Click Me',
          onClick: handleClick,
        }}
      />
    )

    const button = screen.getByText('Click Me')
    expect(button).toBeTruthy()

    await user.click(button)
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('does not render button when action is not provided', () => {
    render(
      <EmptyStateCard
        title="No Action"
      />
    )

    expect(screen.queryByRole('button')).toBeFalsy()
  })

  it('renders icon when provided', () => {
    render(
      <EmptyStateCard
        icon="📊"
        title="With Icon"
      />
    )

    expect(screen.getByText('📊')).toBeTruthy()
  })

  it('does not render icon when not provided', () => {
    const { container } = render(
      <EmptyStateCard
        title="Without Icon"
      />
    )

    const spans = container.querySelectorAll('span')
    expect(spans.length).toBe(0)
  })

  it('applies correct styles to card container', () => {
    const { container } = render(
      <EmptyStateCard
        title="Styled Card"
      />
    )

    const card = container.querySelector('div')
    expect(card.style.display).toBe('flex')
    expect(card.style.flexDirection).toBe('column')
    expect(card.style.alignItems).toBe('center')
    expect(card.style.justifyContent).toBe('center')
    expect(card.style.textAlign).toBe('center')
  })
})

describe('NoDataMessage', () => {
  it('renders with empty mailbox icon when filter is active', () => {
    render(<NoDataMessage filterActive={true} onClearFilters={() => {}} />)

    expect(screen.getByText('📭')).toBeTruthy()
    expect(screen.getByText('Nenhuma doação neste filtro')).toBeTruthy()
  })

  it('renders with chart icon when filter is not active', () => {
    render(<NoDataMessage filterActive={false} onClearFilters={() => {}} />)

    expect(screen.getByText('📊')).toBeTruthy()
    expect(screen.getByText('Sem dados disponíveis')).toBeTruthy()
  })

  it('renders clear filters button when filter is active', async () => {
    const handleClearFilters = vi.fn()
    const user = userEvent.setup()

    render(
      <NoDataMessage
        filterActive={true}
        onClearFilters={handleClearFilters}
      />
    )

    const button = screen.getByText('Limpar filtros')
    expect(button).toBeTruthy()

    await user.click(button)
    expect(handleClearFilters).toHaveBeenCalledOnce()
  })

  it('does not render button when filter is not active', () => {
    render(<NoDataMessage filterActive={false} onClearFilters={() => {}} />)

    expect(screen.queryByText('Limpar filtros')).toBeFalsy()
  })

  it('uses info variant when filter is active', () => {
    const { container } = render(
      <NoDataMessage filterActive={true} onClearFilters={() => {}} />
    )

    const card = container.querySelector('div')
    expect(card.style.backgroundColor).toMatch(/rgba\(145, 186, 163/)
  })

  it('uses default variant when filter is not active', () => {
    const { container } = render(
      <NoDataMessage filterActive={false} onClearFilters={() => {}} />
    )

    const card = container.querySelector('div')
    expect(card.style.backgroundColor).toMatch(/rgba\(4, 90, 82/)
  })
})

describe('MetaNotConfigured', () => {
  it('renders settings icon and title', () => {
    render(<MetaNotConfigured onConfigure={() => {}} />)

    expect(screen.getByText('⚙️')).toBeTruthy()
    expect(screen.getByText('Meta não configurada')).toBeTruthy()
  })

  it('renders configure button', async () => {
    const handleConfigure = vi.fn()
    const user = userEvent.setup()

    render(<MetaNotConfigured onConfigure={handleConfigure} />)

    const button = screen.getByText('Acessar configurações')
    expect(button).toBeTruthy()

    await user.click(button)
    expect(handleConfigure).toHaveBeenCalledOnce()
  })

  it('uses warning variant', () => {
    const { container } = render(
      <MetaNotConfigured onConfigure={() => {}} />
    )

    const card = container.querySelector('div')
    expect(card.style.backgroundColor).toMatch(/rgba\(204, 162, 105/)
  })

  it('displays appropriate description', () => {
    render(<MetaNotConfigured onConfigure={() => {}} />)

    expect(screen.getByText(/Configure uma meta de doação/)).toBeTruthy()
  })
})
