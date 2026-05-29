import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'
import { CATEGORIAS, SEMANAS, getCategoriaLabel, getSemanaLabel, getSemanaNumero } from '../lib/cadastroConstants'
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
    (!filtroSemana || getSemanaNumero(d.donation_date) === getSemanaNumero(filtroSemana))
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
