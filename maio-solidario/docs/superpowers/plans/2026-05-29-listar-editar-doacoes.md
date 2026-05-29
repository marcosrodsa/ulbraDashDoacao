# Listar e Editar Doações no Cadastro — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar uma seção accordion na página `/cadastro` que lista todas as doações registradas e permite editá-las (inline) e excluí-las, com filtros por unidade e semana.

**Architecture:** Um componente novo `ListaDoacoes.jsx` busca/filtra/edita/exclui doações via Supabase. Constantes compartilhadas (categorias, semanas) saem para `src/lib/cadastroConstants.js`. `Cadastro.jsx` renderiza o componente entre o formulário e as Configurações, passando as unidades já carregadas e uma `refreshKey` que recarrega a lista quando uma nova doação é registrada.

**Tech Stack:** React 19, Supabase JS, Vite, Vitest + @testing-library/react (a ser configurado), CSS puro.

**Spec:** `docs/superpowers/specs/2026-05-29-listar-editar-doacoes-design.md`

---

### Task 1: Configurar o test runner (Vitest + jsdom)

O projeto tem arquivos `.test.jsx`/`.test.js` que importam `vitest` e `@testing-library/react`, mas não há `vitest`/`jsdom` instalados nem script `test`. Isso bloqueia TDD. Esta task corrige isso.

**Files:**
- Modify: `package.json`
- Modify: `vite.config.js`
- Create: `src/test/setup.js`

- [ ] **Step 1: Instalar dependências de teste**

Run:
```bash
npm install -D vitest@^4 jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```
Expected: instala sem erros e adiciona as entradas em `devDependencies`.

- [ ] **Step 2: Adicionar o script `test` ao package.json**

Em `package.json`, dentro de `"scripts"`, adicionar a linha `"test"` (manter as existentes):

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
```

- [ ] **Step 3: Configurar o bloco `test` no vite.config.js**

Substituir o conteúdo de `vite.config.js` por:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: './src/test/setup.js',
  },
})
```

- [ ] **Step 4: Criar o arquivo de setup**

Criar `src/test/setup.js`:

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Verificar que o runner roda os testes existentes**

Run: `npm test`
Expected: o Vitest executa e roda os `.test.jsx`/`.test.js` existentes. Pode haver falhas em testes antigos desatualizados (ex: `useCampaignSettings.test.js` espera `meta_doacoes` 500 mas o default é 10000) — isso é esperado e **não** faz parte desta task. O importante: o runner inicia, encontra os arquivos e os componentes em `src/components/` que já têm testes passam (ex: `EmptyStateCard.test.jsx`).

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vite.config.js src/test/setup.js
git commit -m "chore: configurar Vitest + jsdom para rodar os testes"
```

---

### Task 2: Extrair constantes compartilhadas e refatorar Cadastro

Move `CATEGORIAS` e a lista de semanas (hoje inline em `Cadastro.jsx`) para um módulo reutilizável, com helpers de label. `ListaDoacoes` vai consumir isso.

**Files:**
- Create: `src/lib/cadastroConstants.js`
- Create: `src/lib/cadastroConstants.test.js`
- Modify: `src/pages/Cadastro.jsx`

- [ ] **Step 1: Escrever o teste das constantes/helpers (vai falhar)**

Criar `src/lib/cadastroConstants.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { CATEGORIAS, SEMANAS, getCategoriaLabel, getSemanaLabel } from './cadastroConstants'

describe('cadastroConstants', () => {
  it('tem 6 categorias com id e label', () => {
    expect(CATEGORIAS).toHaveLength(6)
    CATEGORIAS.forEach(c => {
      expect(c).toHaveProperty('id')
      expect(c).toHaveProperty('label')
    })
  })

  it('tem 4 semanas com value e label', () => {
    expect(SEMANAS).toHaveLength(4)
    expect(SEMANAS[0].value).toBe('2026-05-01')
  })

  it('getCategoriaLabel devolve o label da categoria', () => {
    expect(getCategoriaLabel('alimentos')).toBe('Alimentos')
  })

  it('getCategoriaLabel devolve o próprio id quando desconhecido', () => {
    expect(getCategoriaLabel('inexistente')).toBe('inexistente')
  })

  it('getSemanaLabel devolve o label da semana', () => {
    expect(getSemanaLabel('2026-05-11')).toBe('Semana 2 (11/05 a 17/05)')
  })

  it('getSemanaLabel devolve a própria data quando desconhecida', () => {
    expect(getSemanaLabel('2026-12-25')).toBe('2026-12-25')
  })
})
```

- [ ] **Step 2: Rodar o teste e ver falhar**

Run: `npx vitest run src/lib/cadastroConstants.test.js`
Expected: FAIL — "Failed to resolve import './cadastroConstants'".

- [ ] **Step 3: Criar o módulo de constantes**

Criar `src/lib/cadastroConstants.js`:

```js
import { IconFood, IconCleanliness, IconApparel, IconPetCare, IconSchool, IconOther } from '../components/FontAwesomeIcons'

export const CATEGORIAS = [
  { id: 'alimentos', Icon: IconFood, label: 'Alimentos', unidade: 'kg' },
  { id: 'higiene', Icon: IconCleanliness, label: 'Higiene & Limpeza', unidade: 'unidades' },
  { id: 'vestuario', Icon: IconApparel, label: 'Vestuário', unidade: 'peças' },
  { id: 'pet', Icon: IconPetCare, label: 'Pet/Ração', unidade: 'kg' },
  { id: 'escolar', Icon: IconSchool, label: 'Material Escolar', unidade: 'itens' },
  { id: 'outros', Icon: IconOther, label: 'Outros', unidade: 'itens' },
]

export const SEMANAS = [
  { value: '2026-05-01', label: 'Semana 1 (01/05 a 10/05)' },
  { value: '2026-05-11', label: 'Semana 2 (11/05 a 17/05)' },
  { value: '2026-05-18', label: 'Semana 3 (18/05 a 24/05)' },
  { value: '2026-05-25', label: 'Semana 4 (25/05 a 31/05)' },
]

export function getCategoriaLabel(id) {
  const cat = CATEGORIAS.find(c => c.id === id)
  return cat ? cat.label : id
}

export function getSemanaLabel(date) {
  const semana = SEMANAS.find(s => s.value === date)
  return semana ? semana.label : date
}
```

- [ ] **Step 4: Rodar o teste e ver passar**

Run: `npx vitest run src/lib/cadastroConstants.test.js`
Expected: PASS (6 testes).

- [ ] **Step 5: Refatorar Cadastro.jsx para usar o módulo**

Em `src/pages/Cadastro.jsx`:

1. Remover o import direto dos ícones na linha 2 e o bloco `const CATEGORIAS = [...]` (linhas 10-17).
2. Adicionar o import no topo:

```jsx
import { CATEGORIAS, SEMANAS } from '../lib/cadastroConstants'
```

(Mantém os demais imports: `Toast`, `ulbraLogo`, `supabase`, `useCampaignSettings`, CSS.)

3. Substituir as `<option>` fixas de semana (linhas ~241-244) por geração a partir de `SEMANAS`:

```jsx
              <select
                id="data"
                name="data"
                value={formData.data}
                onChange={handleChange}
                required
              >
                {SEMANAS.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
```

- [ ] **Step 6: Verificar que o app builda e a página de cadastro funciona**

Run: `npm run build`
Expected: build sem erros. (O uso de `CATEGORIAS`/`categoriaAtual` no JSX continua igual, agora vindo do import.)

- [ ] **Step 7: Commit**

```bash
git add src/lib/cadastroConstants.js src/lib/cadastroConstants.test.js src/pages/Cadastro.jsx
git commit -m "refactor: extrair CATEGORIAS e SEMANAS para cadastroConstants"
```

---

### Task 3: ListaDoacoes — buscar e exibir doações

Cria o componente com busca no Supabase e renderização da tabela (sem filtros/edição ainda).

**Files:**
- Create: `src/components/ListaDoacoes.jsx`
- Create: `src/components/ListaDoacoes.test.jsx`

- [ ] **Step 1: Escrever o teste de renderização (vai falhar)**

Criar `src/components/ListaDoacoes.test.jsx`:

```jsx
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
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
})
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx vitest run src/components/ListaDoacoes.test.jsx`
Expected: FAIL — "Failed to resolve import './ListaDoacoes'".

- [ ] **Step 3: Criar o componente (versão fetch + tabela)**

Criar `src/components/ListaDoacoes.jsx`:

```jsx
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'
import { CATEGORIAS, SEMANAS, getCategoriaLabel, getSemanaLabel } from '../lib/cadastroConstants'
import Toast from './Toast'

export default function ListaDoacoes({ unidades = [], refreshKey = 0 }) {
  const [doacoes, setDoacoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [filtroUnidade, setFiltroUnidade] = useState('')
  const [filtroSemana, setFiltroSemana] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('')

  const nomeUnidade = useCallback((unitId) => {
    const u = unidades.find(x => x.id === unitId)
    if (!u) return 'Unidade desconhecida'
    return u.display_name && u.display_name.trim() !== '' ? u.display_name : u.name
  }, [unidades])

  const fetchDoacoes = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setDoacoes(data || [])
    } catch (err) {
      setToastType('error')
      setToastMessage('Erro ao carregar doações: ' + err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchDoacoes() }, [fetchDoacoes, refreshKey])

  const doacoesFiltradas = doacoes.filter(d =>
    (!filtroUnidade || d.unit_id === filtroUnidade) &&
    (!filtroSemana || d.donation_date === filtroSemana)
  )

  const startEdit = (d) => {
    setEditingId(d.id)
    setEditData({
      unit_id: d.unit_id,
      category: d.category,
      quantity: String(d.quantity),
      donation_date: d.donation_date,
      description: d.description || '',
    })
  }
  const cancelEdit = () => { setEditingId(null); setEditData({}) }
  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({ ...prev, [name]: value }))
  }

  const saveEdit = async (id) => {
    if (!editData.unit_id || !editData.category || !editData.quantity ||
        isNaN(editData.quantity) || Number(editData.quantity) <= 0) {
      setToastType('error')
      setToastMessage('Preencha unidade, categoria e uma quantidade válida')
      return
    }
    try {
      const updates = {
        unit_id: editData.unit_id,
        category: editData.category,
        quantity: parseInt(editData.quantity),
        donation_date: editData.donation_date,
        description: editData.description,
      }
      const { error } = await supabase.from('donations').update(updates).eq('id', id)
      if (error) throw error
      setDoacoes(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d))
      setEditingId(null)
      setEditData({})
      setToastType('success')
      setToastMessage('✓ Doação atualizada')
    } catch (err) {
      setToastType('error')
      setToastMessage('Erro ao salvar: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta doação?')) return
    try {
      const { error } = await supabase.from('donations').delete().eq('id', id)
      if (error) throw error
      setDoacoes(prev => prev.filter(d => d.id !== id))
      setToastType('success')
      setToastMessage('✓ Doação excluída')
    } catch (err) {
      setToastType('error')
      setToastMessage('Erro ao excluir: ' + err.message)
    }
  }

  return (
    <div className="lista-section">
      <button
        type="button"
        className="lista-toggle-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>📋 Doações Registradas ({doacoes.length})</span>
        <span className="lista-chevron">{isExpanded ? '▲' : '▼'}</span>
      </button>

      <div className={`lista-content ${isExpanded ? 'expanded' : ''}`}>
        <div className="lista-filtros">
          <select
            value={filtroUnidade}
            onChange={e => setFiltroUnidade(e.target.value)}
            aria-label="Filtrar por unidade"
          >
            <option value="">Todas as unidades</option>
            {unidades.map(u => (
              <option key={u.id} value={u.id}>{nomeUnidade(u.id)}</option>
            ))}
          </select>
          <select
            value={filtroSemana}
            onChange={e => setFiltroSemana(e.target.value)}
            aria-label="Filtrar por semana"
          >
            <option value="">Todas as semanas</option>
            {SEMANAS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="lista-empty">Carregando...</p>
        ) : doacoesFiltradas.length === 0 ? (
          <p className="lista-empty">Nenhuma doação registrada ainda.</p>
        ) : (
          <table className="lista-tabela">
            <thead>
              <tr>
                <th>Unidade</th>
                <th>Categoria</th>
                <th>Qtd</th>
                <th>Semana</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {doacoesFiltradas.map(d => editingId === d.id ? (
                <tr key={d.id} className="lista-row-editing">
                  <td data-label="Unidade">
                    <select name="unit_id" value={editData.unit_id} onChange={handleEditChange} aria-label="Editar unidade">
                      {unidades.map(u => (
                        <option key={u.id} value={u.id}>{nomeUnidade(u.id)}</option>
                      ))}
                    </select>
                  </td>
                  <td data-label="Categoria">
                    <select name="category" value={editData.category} onChange={handleEditChange} aria-label="Editar categoria">
                      {CATEGORIAS.map(c => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
                    </select>
                  </td>
                  <td data-label="Qtd">
                    <input type="number" name="quantity" value={editData.quantity} onChange={handleEditChange} min="0" step="0.01" aria-label="Editar quantidade" />
                  </td>
                  <td data-label="Semana">
                    <select name="donation_date" value={editData.donation_date} onChange={handleEditChange} aria-label="Editar semana">
                      {SEMANAS.map(s => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </td>
                  <td data-label="Descrição">
                    <input type="text" name="description" value={editData.description} onChange={handleEditChange} aria-label="Editar descrição" />
                  </td>
                  <td data-label="Ações" className="lista-acoes">
                    <button type="button" className="lista-btn-salvar" onClick={() => saveEdit(d.id)}>Salvar</button>
                    <button type="button" className="lista-btn-cancelar" onClick={cancelEdit}>Cancelar</button>
                  </td>
                </tr>
              ) : (
                <tr key={d.id}>
                  <td data-label="Unidade">{nomeUnidade(d.unit_id)}</td>
                  <td data-label="Categoria">{getCategoriaLabel(d.category)}</td>
                  <td data-label="Qtd">{d.quantity}</td>
                  <td data-label="Semana">{getSemanaLabel(d.donation_date)}</td>
                  <td data-label="Descrição">{d.description || '—'}</td>
                  <td data-label="Ações" className="lista-acoes">
                    <button type="button" className="lista-btn-editar" onClick={() => startEdit(d)}>Editar</button>
                    <button type="button" className="lista-btn-excluir" onClick={() => handleDelete(d.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Toast
        type={toastType}
        message={toastMessage}
        onClose={() => setToastMessage('')}
        duration={4000}
      />
    </div>
  )
}
```

> Nota: o componente já contém filtros, edição e exclusão (usados nas tasks 4-6). As tasks seguintes só adicionam testes que exercitam esse comportamento — não reescrevem o componente.

- [ ] **Step 4: Rodar e ver passar**

Run: `npx vitest run src/components/ListaDoacoes.test.jsx`
Expected: PASS (3 testes).

- [ ] **Step 5: Commit**

```bash
git add src/components/ListaDoacoes.jsx src/components/ListaDoacoes.test.jsx
git commit -m "feat: componente ListaDoacoes com busca e exibição"
```

---

### Task 4: Filtros por unidade e semana

Adiciona testes que comprovam a filtragem client-side (comportamento já implementado no componente).

**Files:**
- Modify: `src/components/ListaDoacoes.test.jsx`

- [ ] **Step 1: Escrever os testes de filtro**

Adicionar ao final do `describe('ListaDoacoes', ...)` em `src/components/ListaDoacoes.test.jsx` (antes do `})` final), e adicionar `import userEvent from '@testing-library/user-event'` no topo do arquivo:

```jsx
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
```

- [ ] **Step 2: Rodar e ver passar**

Run: `npx vitest run src/components/ListaDoacoes.test.jsx`
Expected: PASS (5 testes — 3 anteriores + 2 novos).

- [ ] **Step 3: Commit**

```bash
git add src/components/ListaDoacoes.test.jsx
git commit -m "test: cobertura de filtros por unidade e semana em ListaDoacoes"
```

---

### Task 5: Edição inline

Testes que comprovam entrar em modo edição, salvar (chama `update`) e cancelar.

**Files:**
- Modify: `src/components/ListaDoacoes.test.jsx`

- [ ] **Step 1: Escrever os testes de edição**

Adicionar dentro do `describe`, ao final:

```jsx
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
```

- [ ] **Step 2: Rodar e ver passar**

Run: `npx vitest run src/components/ListaDoacoes.test.jsx`
Expected: PASS (8 testes).

- [ ] **Step 3: Commit**

```bash
git add src/components/ListaDoacoes.test.jsx
git commit -m "test: cobertura de edição inline (salvar/cancelar) em ListaDoacoes"
```

---

### Task 6: Exclusão com confirmação

Testes que comprovam exclusão com `window.confirm` (confirmado → chama `delete` e remove a linha; cancelado → não chama).

**Files:**
- Modify: `src/components/ListaDoacoes.test.jsx`

- [ ] **Step 1: Escrever os testes de exclusão**

Adicionar dentro do `describe`, ao final:

```jsx
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
```

- [ ] **Step 2: Rodar e ver passar**

Run: `npx vitest run src/components/ListaDoacoes.test.jsx`
Expected: PASS (10 testes).

- [ ] **Step 3: Commit**

```bash
git add src/components/ListaDoacoes.test.jsx
git commit -m "test: cobertura de exclusão com confirmação em ListaDoacoes"
```

---

### Task 7: Integrar ListaDoacoes no Cadastro com recarregamento

Renderiza o componente entre o formulário e as Configurações, passando `unidades` e uma `refreshKey` que muda após cada registro bem-sucedido.

**Files:**
- Modify: `src/pages/Cadastro.jsx`

- [ ] **Step 1: Importar o componente e criar o estado refreshKey**

No topo de `src/pages/Cadastro.jsx`, adicionar:

```jsx
import ListaDoacoes from '../components/ListaDoacoes'
```

Logo após o estado `loading` (linha ~30), adicionar:

```jsx
  const [refreshKey, setRefreshKey] = useState(0)
```

- [ ] **Step 2: Disparar refreshKey após registro bem-sucedido**

Dentro de `handleSubmit`, no bloco de sucesso (logo após `setFormData({...})` que reseta o form, dentro do `try`), adicionar:

```jsx
      setRefreshKey(k => k + 1)
```

(Fica imediatamente após o `setFormData({ ... })` de reset, antes do `catch`.)

- [ ] **Step 3: Renderizar ListaDoacoes entre o form e as Configurações**

No JSX, entre o fechamento da `<div className="form-section">` (linha ~265, o `</div>` que fecha a form-section) e a abertura de `<div className="config-section">`, inserir:

```jsx
        <ListaDoacoes unidades={unidades} refreshKey={refreshKey} />
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: build sem erros.

- [ ] **Step 5: Verificar no navegador**

Run: `npm run dev`
Abrir `/cadastro`. Esperado: abaixo do formulário aparece o botão "📋 Doações Registradas (N)". Clicar expande/recolhe (sem estilo refinado ainda — Task 8). Registrar uma doação deve incrementar a contagem e mostrar o novo registro ao expandir.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Cadastro.jsx
git commit -m "feat: integrar ListaDoacoes na página de Cadastro com refresh automático"
```

---

### Task 8: Estilos (accordion, tabela, responsivo)

Estiliza a seção seguindo o visual ULBRA existente; em mobile a tabela vira cards empilhados.

**Files:**
- Modify: `src/styles/cadastro.css`

- [ ] **Step 1: Adicionar os estilos ao final de cadastro.css**

Acrescentar ao final de `src/styles/cadastro.css`:

```css
/* ===== Lista de Doações (accordion) ===== */
.lista-section {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid var(--surface-line);
}

.lista-toggle-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(204, 162, 105, 0.12);
  border: 1px solid var(--ulbra-gold);
  color: var(--ulbra-gold-light);
  font-size: 18px;
  font-weight: 600;
  padding: 16px 20px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.lista-toggle-btn:hover {
  background: rgba(204, 162, 105, 0.2);
}

.lista-chevron {
  font-size: 14px;
}

.lista-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, margin-top 0.3s ease;
}

.lista-content.expanded {
  max-height: 4000px;
  margin-top: 20px;
}

.lista-filtros {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.lista-filtros select {
  flex: 1;
  min-width: 140px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--surface-line);
  background: var(--ulbra-primary-deep);
  color: var(--fg);
}

.lista-empty {
  color: var(--fg-muted);
  text-align: center;
  padding: 24px 0;
}

.lista-tabela {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.lista-tabela th,
.lista-tabela td {
  padding: 10px 8px;
  text-align: left;
  border-bottom: 1px solid var(--surface-line);
  color: var(--fg);
  vertical-align: middle;
}

.lista-tabela th {
  color: var(--ulbra-gold-light);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.04em;
}

.lista-tabela input,
.lista-tabela select {
  width: 100%;
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid var(--surface-line);
  background: var(--ulbra-primary-deep);
  color: var(--fg);
  font-size: 13px;
}

.lista-acoes {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.lista-acoes button {
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}

.lista-btn-editar,
.lista-btn-salvar {
  background: var(--ulbra-gold);
  color: var(--ulbra-primary-deep);
}

.lista-btn-cancelar {
  background: transparent;
  color: var(--fg-muted);
  border: 1px solid var(--surface-line) !important;
}

.lista-btn-excluir {
  background: rgba(200, 60, 60, 0.18);
  color: #f0a0a0;
  border: 1px solid rgba(200, 60, 60, 0.4) !important;
}

/* Mobile: tabela vira cards empilhados */
@media (max-width: 600px) {
  .lista-tabela,
  .lista-tabela thead,
  .lista-tabela tbody,
  .lista-tabela tr,
  .lista-tabela td {
    display: block;
    width: 100%;
  }

  .lista-tabela thead {
    display: none;
  }

  .lista-tabela tr {
    margin-bottom: 16px;
    border: 1px solid var(--surface-line);
    border-radius: 10px;
    padding: 8px 12px;
  }

  .lista-tabela td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid var(--surface-line);
    padding: 8px 0;
  }

  .lista-tabela td:last-child {
    border-bottom: none;
  }

  .lista-tabela td::before {
    content: attr(data-label);
    font-weight: 600;
    color: var(--ulbra-gold-light);
    font-size: 12px;
    text-transform: uppercase;
  }

  .lista-tabela td input,
  .lista-tabela td select {
    width: auto;
    flex: 1;
  }
}
```

- [ ] **Step 2: Verificar no navegador (desktop e mobile)**

Run: `npm run dev`
Abrir `/cadastro`. Esperado: accordion abre suave; tabela legível no desktop; ao reduzir a janela (< 600px / DevTools mobile) as linhas viram cards com rótulos. Botões Editar/Excluir/Salvar/Cancelar estilizados.

- [ ] **Step 3: Commit**

```bash
git add src/styles/cadastro.css
git commit -m "style: estilos do accordion e tabela de ListaDoacoes (responsivo)"
```

---

### Task 9: Políticas RLS de UPDATE/DELETE no script de segurança

Garante que edição/exclusão de doações — e o ajuste de meta — continuem funcionando quando o RLS for ativado no deploy oficial.

**Files:**
- Modify: `supabase/security_deploy_policy.sql`

- [ ] **Step 1: Adicionar políticas de UPDATE/DELETE em donations**

Em `supabase/security_deploy_policy.sql`, logo após o bloco da política de inserção pública (após a linha 12), adicionar:

```sql

-- Permitir que qualquer pessoa (anon) edite doações (necessário para a Lista de Doações)
CREATE POLICY "Permitir edição pública" ON donations
FOR UPDATE USING (true) WITH CHECK (true);

-- Permitir que qualquer pessoa (anon) exclua doações (necessário para a Lista de Doações)
CREATE POLICY "Permitir exclusão pública" ON donations
FOR DELETE USING (true);
```

- [ ] **Step 2: Adicionar política de UPDATE em campaign_settings**

No final do bloco da seção 3 (após a política de leitura pública de `campaign_settings`, linha ~28), adicionar:

```sql

-- Permitir atualização da meta/datas (necessário para o ajuste de meta no Cadastro)
CREATE POLICY "Permitir atualização config" ON campaign_settings
FOR UPDATE USING (true) WITH CHECK (true);
```

- [ ] **Step 3: Commit**

```bash
git add supabase/security_deploy_policy.sql
git commit -m "security: políticas RLS de UPDATE/DELETE para doações e UPDATE de config"
```

---

## Verificação final

- [ ] `npm test` — a suíte do `ListaDoacoes` (10 testes) e de `cadastroConstants` (6 testes) passam.
- [ ] `npm run build` — build limpo.
- [ ] `npm run lint` — sem novos erros de lint nos arquivos criados/modificados.
- [ ] Manual em `/cadastro`: registrar doação → aparece na lista; editar quantidade/unidade → salva e reflete; excluir → some após confirmação; filtros funcionam; layout responsivo OK.
