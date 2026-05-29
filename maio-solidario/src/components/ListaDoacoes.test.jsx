import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ListaDoacoes from './ListaDoacoes'
import { supabase } from '../lib/supabaseClient'

vi.mock('../lib/supabaseClient', () => ({ supabase: { from: vi.fn() } }))

const UNIDADES = [
  { id: 'u1', name: 'Unidade A', display_name: '' },
  { id: 'u2', name: 'Unidade B', display_name: 'Campus B' },
]

const DOACOES = [
  { id: 'd1', unit_id: 'u1', category: 'alimentos', quantity: 50, description: 'Arroz', donation_date: '2026-05-01', created_at: '2026-05-02T10:30:00' },
  { id: 'd2', unit_id: 'u2', category: 'higiene', quantity: 10, description: '', donation_date: '2026-05-11', created_at: '2026-05-12T09:00:00' },
]

// Mock flexível: cobre select/order, update/eq e delete/eq.
function mockSupabase({ selectData = [], selectError = null, updateError = null, deleteError = null } = {}) {
  supabase.from.mockReturnValue({
    select: () => ({ order: () => Promise.resolve({ data: selectData, error: selectError }) }),
    update: () => ({ eq: () => Promise.resolve({ error: updateError }) }),
    delete: () => ({ eq: () => Promise.resolve({ error: deleteError }) }),
  })
}

describe('ListaDoacoes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('exibe o header com a contagem de doações', async () => {
    mockSupabase({ selectData: DOACOES })
    render(<ListaDoacoes unidades={UNIDADES} refreshKey={0} />)
    await waitFor(() => {
      expect(screen.getByText(/Doações Registradas \(2\)/)).toBeInTheDocument()
    })
  })

  // Obs: textos como "Unidade A" e "Semana 1..." também aparecem nas <option> dos
  // filtros, por isso consultamos pelo papel de célula (cell) para evitar ambiguidade.
  it('renderiza as linhas com unidade, categoria e semana legíveis', async () => {
    mockSupabase({ selectData: DOACOES })
    render(<ListaDoacoes unidades={UNIDADES} refreshKey={0} />)
    await waitFor(() => {
      expect(screen.getByRole('cell', { name: 'Unidade A' })).toBeInTheDocument()
    })
    expect(screen.getByRole('cell', { name: 'Campus B' })).toBeInTheDocument() // display_name tem prioridade
    expect(screen.getByRole('cell', { name: 'Alimentos' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Semana 1 (01/05 a 10/05)' })).toBeInTheDocument()
  })

  it('mostra mensagem de vazio quando não há doações', async () => {
    mockSupabase({ selectData: [] })
    render(<ListaDoacoes unidades={UNIDADES} refreshKey={0} />)
    await waitFor(() => {
      expect(screen.getByText(/Nenhuma doação registrada ainda/)).toBeInTheDocument()
    })
  })

  it('filtra por unidade', async () => {
    const user = userEvent.setup()
    mockSupabase({ selectData: DOACOES })
    render(<ListaDoacoes unidades={UNIDADES} refreshKey={0} />)
    await waitFor(() => expect(screen.getByRole('cell', { name: 'Unidade A' })).toBeInTheDocument())

    await user.selectOptions(screen.getByLabelText('Filtrar por unidade'), 'u2')

    expect(screen.queryByRole('cell', { name: 'Unidade A' })).not.toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Campus B' })).toBeInTheDocument()
  })

  it('filtra por semana', async () => {
    const user = userEvent.setup()
    mockSupabase({ selectData: DOACOES })
    render(<ListaDoacoes unidades={UNIDADES} refreshKey={0} />)
    await waitFor(() => expect(screen.getByRole('cell', { name: 'Unidade A' })).toBeInTheDocument())

    await user.selectOptions(screen.getByLabelText('Filtrar por semana'), '2026-05-11')

    expect(screen.queryByRole('cell', { name: 'Unidade A' })).not.toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Campus B' })).toBeInTheDocument()
  })

  // Bug: o filtro de semana usava igualdade exata com a data inicial da semana,
  // então doações no meio da semana (ex. dia 05) sumiam ao filtrar por Semana 1.
  // A semana deve ser tratada como FAIXA de dias (1-10 = Semana 1).
  it('inclui doações no meio da semana ao filtrar (faixa, não data exata)', async () => {
    const user = userEvent.setup()
    const meioDaSemana = [
      { id: 'm1', unit_id: 'u1', category: 'alimentos', quantity: 5, description: 'Meio S1', donation_date: '2026-05-05', created_at: '2026-05-05T08:00:00' },
      { id: 'm2', unit_id: 'u2', category: 'pet', quantity: 3, description: 'Meio S3', donation_date: '2026-05-20', created_at: '2026-05-20T08:00:00' },
    ]
    mockSupabase({ selectData: meioDaSemana })
    render(<ListaDoacoes unidades={UNIDADES} refreshKey={0} />)
    await waitFor(() => expect(screen.getByRole('cell', { name: 'Meio S1' })).toBeInTheDocument())

    // A doação do dia 05 deve aparecer rotulada como Semana 1
    expect(screen.getByRole('cell', { name: 'Semana 1 (01/05 a 10/05)' })).toBeInTheDocument()

    await user.selectOptions(screen.getByLabelText('Filtrar por semana'), '2026-05-01')

    // Continua visível mesmo não sendo a data inicial exata da semana
    expect(screen.getByRole('cell', { name: 'Meio S1' })).toBeInTheDocument()
    // A do dia 20 (Semana 3) some
    expect(screen.queryByRole('cell', { name: 'Meio S3' })).not.toBeInTheDocument()
  })

  // Helper: devolve o texto da 1ª célula (Unidade) de cada linha de dados, na ordem do DOM.
  function unidadesNaOrdem() {
    const linhas = screen.getAllByRole('row').slice(1) // pula o cabeçalho
    return linhas.map(r => within(r).getAllByRole('cell')[0].textContent)
  }

  it('ordena por quantidade (numérico) alternando asc/desc ao clicar em Qtd', async () => {
    const user = userEvent.setup()
    mockSupabase({ selectData: DOACOES }) // d1 qtd 50, d2 qtd 10
    render(<ListaDoacoes unidades={UNIDADES} refreshKey={0} />)
    await waitFor(() => expect(screen.getByRole('cell', { name: 'Unidade A' })).toBeInTheDocument())

    // Ordem original (created_at desc, como veio do fetch): d1 (Unidade A) antes de d2 (Campus B)
    expect(unidadesNaOrdem()).toEqual(['Unidade A', 'Campus B'])

    // 1º clique: crescente por quantidade → d2 (10) antes de d1 (50)
    await user.click(screen.getByRole('button', { name: /Qtd/ }))
    expect(unidadesNaOrdem()).toEqual(['Campus B', 'Unidade A'])

    // 2º clique: decrescente → d1 (50) antes de d2 (10)
    await user.click(screen.getByRole('button', { name: /Qtd/ }))
    expect(unidadesNaOrdem()).toEqual(['Unidade A', 'Campus B'])
  })

  it('ordena por unidade (texto) alfabeticamente ao clicar em Unidade', async () => {
    const user = userEvent.setup()
    mockSupabase({ selectData: DOACOES })
    render(<ListaDoacoes unidades={UNIDADES} refreshKey={0} />)
    await waitFor(() => expect(screen.getByRole('cell', { name: 'Unidade A' })).toBeInTheDocument())

    // Crescente: "Campus B" < "Unidade A"
    await user.click(screen.getByRole('button', { name: /Unidade/ }))
    expect(unidadesNaOrdem()).toEqual(['Campus B', 'Unidade A'])

    // Decrescente
    await user.click(screen.getByRole('button', { name: /Unidade/ }))
    expect(unidadesNaOrdem()).toEqual(['Unidade A', 'Campus B'])
  })

  it('mostra a seta indicadora apenas na coluna ativa', async () => {
    const user = userEvent.setup()
    mockSupabase({ selectData: DOACOES })
    render(<ListaDoacoes unidades={UNIDADES} refreshKey={0} />)
    await waitFor(() => expect(screen.getByRole('cell', { name: 'Unidade A' })).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: /Qtd/ }))
    expect(screen.getByRole('button', { name: /Qtd ▲/ })).toBeInTheDocument()
    // outras colunas não têm seta
    expect(screen.queryByRole('button', { name: /Unidade ▲|Unidade ▼/ })).not.toBeInTheDocument()
  })

  it('entra em modo edição e mostra os inputs', async () => {
    const user = userEvent.setup()
    mockSupabase({ selectData: DOACOES })
    render(<ListaDoacoes unidades={UNIDADES} refreshKey={0} />)
    await waitFor(() => expect(screen.getByRole('cell', { name: 'Unidade A' })).toBeInTheDocument())

    await user.click(screen.getAllByText('Editar')[0])

    expect(screen.getByLabelText('Editar quantidade')).toBeInTheDocument()
    expect(screen.getByText('Salvar')).toBeInTheDocument()
  })

  it('salva a edição chamando update e atualiza a linha', async () => {
    const user = userEvent.setup()
    mockSupabase({ selectData: DOACOES })
    const updateSpy = vi.fn(() => ({ eq: () => Promise.resolve({ error: null }) }))
    // Re-configura o mock preservando select e injetando o spy de update.
    supabase.from.mockReturnValue({
      select: () => ({ order: () => Promise.resolve({ data: DOACOES, error: null }) }),
      update: updateSpy,
      delete: () => ({ eq: () => Promise.resolve({ error: null }) }),
    })
    render(<ListaDoacoes unidades={UNIDADES} refreshKey={0} />)
    await waitFor(() => expect(screen.getByRole('cell', { name: 'Unidade A' })).toBeInTheDocument())

    await user.click(screen.getAllByText('Editar')[0])
    const qtd = screen.getByLabelText('Editar quantidade')
    await user.clear(qtd)
    await user.type(qtd, '99')
    await user.click(screen.getByText('Salvar'))

    await waitFor(() => {
      expect(updateSpy).toHaveBeenCalledWith(expect.objectContaining({ quantity: 99 }))
    })
  })

  it('cancela a edição sem chamar update', async () => {
    const user = userEvent.setup()
    const updateSpy = vi.fn(() => ({ eq: () => Promise.resolve({ error: null }) }))
    supabase.from.mockReturnValue({
      select: () => ({ order: () => Promise.resolve({ data: DOACOES, error: null }) }),
      update: updateSpy,
      delete: () => ({ eq: () => Promise.resolve({ error: null }) }),
    })
    render(<ListaDoacoes unidades={UNIDADES} refreshKey={0} />)
    await waitFor(() => expect(screen.getByRole('cell', { name: 'Unidade A' })).toBeInTheDocument())

    await user.click(screen.getAllByText('Editar')[0])
    await user.click(screen.getByText('Cancelar'))

    expect(screen.queryByLabelText('Editar quantidade')).not.toBeInTheDocument()
    expect(updateSpy).not.toHaveBeenCalled()
  })

  it('exclui chamando delete quando confirmado', async () => {
    const user = userEvent.setup()
    const deleteSpy = vi.fn(() => ({ eq: () => Promise.resolve({ error: null }) }))
    supabase.from.mockReturnValue({
      select: () => ({ order: () => Promise.resolve({ data: DOACOES, error: null }) }),
      update: () => ({ eq: () => Promise.resolve({ error: null }) }),
      delete: deleteSpy,
    })
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<ListaDoacoes unidades={UNIDADES} refreshKey={0} />)
    await waitFor(() => expect(screen.getByRole('cell', { name: 'Unidade A' })).toBeInTheDocument())

    await user.click(screen.getAllByText('Excluir')[0])

    await waitFor(() => expect(deleteSpy).toHaveBeenCalled())
    await waitFor(() => expect(screen.queryByRole('cell', { name: 'Unidade A' })).not.toBeInTheDocument())
  })

  it('não exclui quando o confirm é cancelado', async () => {
    const user = userEvent.setup()
    const deleteSpy = vi.fn(() => ({ eq: () => Promise.resolve({ error: null }) }))
    supabase.from.mockReturnValue({
      select: () => ({ order: () => Promise.resolve({ data: DOACOES, error: null }) }),
      update: () => ({ eq: () => Promise.resolve({ error: null }) }),
      delete: deleteSpy,
    })
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    render(<ListaDoacoes unidades={UNIDADES} refreshKey={0} />)
    await waitFor(() => expect(screen.getByRole('cell', { name: 'Unidade A' })).toBeInTheDocument())

    await user.click(screen.getAllByText('Excluir')[0])

    expect(deleteSpy).not.toHaveBeenCalled()
    expect(screen.getByRole('cell', { name: 'Unidade A' })).toBeInTheDocument()
  })
})
