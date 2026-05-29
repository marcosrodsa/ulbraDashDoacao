import { useState, useEffect } from 'react'
import Toast from '../components/Toast'
import ulbraLogo from '../assets/ulbra_logo.png'
import { supabase } from '../lib/supabaseClient'
import { useCampaignSettings } from '../hooks/useCampaignSettings'
import { CATEGORIAS, SEMANAS } from '../lib/cadastroConstants'
import '../styles/cadastro.css'
import '../styles/icons.css'

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    unidade_id: '',
    categoria: '',
    quantidade: '',
    descricao: '',
    data: '2026-05-01',
  })
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('')
  const [unidades, setUnidades] = useState([])
  const [loading, setLoading] = useState(false)

  // Meta config states
  const { settings, loading: metaLoading, updateMeta } = useCampaignSettings()
  const [metaValue, setMetaValue] = useState('')
  const [metaSaving, setMetaSaving] = useState(false)
  const [metaSaveMessage, setMetaSaveMessage] = useState('')
  const [metaSaveType, setMetaSaveType] = useState('')

  // Buscar unidades do Supabase
  useEffect(() => {
    const fetchUnidades = async () => {
      try {
        const { data, error: err } = await supabase
          .from('units')
          .select('*')
          .order('name')
        if (err) throw err

        // Filtrar apenas unidades válidas (remover: Pop, Institucional, Geral, Caxias do Sul, Ultec)
        const validUnidades = (data || []).filter(u => {
          const name = u.name?.toLowerCase() || ''
          const excludedKeywords = ['pop', 'institucional', 'geral', 'caxias do sul', 'ultec']
          return !excludedKeywords.some(keyword => name.includes(keyword))
        })

        setUnidades(validUnidades)
      } catch (error) {
        console.error('Erro ao buscar unidades:', error)
      }
    }
    fetchUnidades()
  }, [])

  // Initialize meta value when settings load
  useEffect(() => {
    if (!metaLoading && settings.meta_doacoes) {
      setMetaValue(String(settings.meta_doacoes))
    }
  }, [settings.meta_doacoes, metaLoading])

  const categoriaAtual = CATEGORIAS.find(c => c.id === formData.categoria)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleMetaChange = (e) => {
    setMetaValue(e.target.value)
    setMetaSaveMessage('')
  }

  const handleMetaSave = async (e) => {
    e.preventDefault()

    // Validação
    if (!metaValue || isNaN(metaValue) || parseInt(metaValue) <= 0) {
      setMetaSaveMessage('Meta deve ser um número maior que zero')
      setMetaSaveType('error')
      return
    }

    setMetaSaving(true)
    try {
      const result = await updateMeta(parseInt(metaValue))

      if (result.success) {
        setMetaSaveMessage(`✅ Meta atualizada para ${metaValue}`)
        setMetaSaveType('success')
      } else {
        setMetaSaveMessage('Erro ao atualizar meta: ' + result.error)
        setMetaSaveType('error')
      }
    } catch (error) {
      setMetaSaveMessage('Erro ao atualizar meta: ' + error.message)
      setMetaSaveType('error')
    } finally {
      setMetaSaving(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validação
    if (!formData.unidade_id || !formData.categoria || !formData.quantidade) {
      setToastMessage('Por favor, preencha todos os campos obrigatórios')
      setToastType('error')
      return
    }

    if (isNaN(formData.quantidade) || formData.quantidade <= 0) {
      setToastMessage('Quantidade deve ser um número maior que zero')
      setToastType('error')
      return
    }

    // Salvar no Supabase
    setLoading(true)
    try {
      const { error: err } = await supabase.from('donations').insert([
        {
          unit_id: formData.unidade_id,
          category: formData.categoria,
          quantity: parseInt(formData.quantidade),
          description: formData.descricao,
          donation_date: formData.data,
        }
      ])

      if (err) throw err

      setToastMessage('✓ Doação registrada com sucesso! Seu impacto já está no painel.')
      setToastType('success')
      setFormData({
        unidade_id: '',
        categoria: '',
        quantidade: '',
        descricao: '',
        data: '2026-05-01',
      })
    } catch (error) {
      setToastMessage('Erro ao registrar doação: ' + error.message)
      setToastType('error')
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-wrapper">
        <header className="cadastro-header">
          <img src={ulbraLogo} alt="ULBRA Logo" className="cadastro-logo" />
          <h1>MAIO SOLIDÁRIO</h1>
          <p className="slogan">Toda a Rede Ulbra em uma só corrente</p>
        </header>

        <div className="form-section">
          <h2>📝 Registre uma doação</h2>
          <p className="form-subtitle">Seu impacto é registrado em tempo real no painel da campanha.</p>

          <form onSubmit={handleSubmit} className="cadastro-form">
            {/* Unidade */}
            <div className="form-group">
              <label htmlFor="unidade_id">Qual é a unidade? *</label>
              <select
                id="unidade_id"
                name="unidade_id"
                value={formData.unidade_id}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Selecione uma unidade</option>
                {unidades.map(u => {
                  const dName = u.display_name && u.display_name.trim() !== '' ? u.display_name : u.name;
                  return <option key={u.id} value={u.id}>{dName}</option>
                })}
              </select>
            </div>

            {/* Categoria */}
            <div className="form-group">
              <label>Qual categoria? *</label>
              <div className="categoria-buttons">
                {CATEGORIAS.map(cat => {
                  const Icon = cat.Icon
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`categoria-btn ${formData.categoria === cat.id ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, categoria: cat.id }))}
                    >
                      <span className="categoria-icon"><Icon /></span>
                      <span className="label">{cat.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quantidade */}
            <div className="form-group">
              <label htmlFor="quantidade">
                Quantidade {categoriaAtual && `(${categoriaAtual.unidade})`} *
              </label>
              <input
                type="number"
                id="quantidade"
                name="quantidade"
                value={formData.quantidade}
                onChange={handleChange}
                placeholder="Ex: 50"
                step="0.01"
                min="0"
              />
            </div>

            {/* Semana da Doação */}
            <div className="form-group">
              <label htmlFor="data">Qual Semana? *</label>
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
            </div>

            {/* Descrição */}
            <div className="form-group">
              <label htmlFor="descricao">Descrição (opcional)</label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Ex: Arroz 5kg, 10 kits de higiene..."
                rows="3"
              />
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrar Doação'}
            </button>
          </form>
        </div>

        <div className="config-section">
          <h2>⚙️ Configurações da Campanha</h2>
          <p className="config-subtitle">Ajuste os parâmetros da campanha Maio Solidário</p>

          <form onSubmit={handleMetaSave} className="config-form">
            <div className="config-group">
              <label htmlFor="meta_doacoes" className="config-label">Meta de Doações</label>
              {metaLoading ? (
                <div className="config-loading">
                  <span className="spinner"></span>
                  <span>Carregando configurações...</span>
                </div>
              ) : (
                <>
                  <div className="config-input-wrapper">
                    <input
                      type="number"
                      id="meta_doacoes"
                      className="config-input"
                      value={metaValue}
                      onChange={handleMetaChange}
                      disabled={metaSaving || metaLoading}
                      min="1"
                      placeholder="Ex: 500"
                    />
                    <span className="config-unit">itens/kg</span>
                  </div>
                  <button type="submit" className="config-button" disabled={metaSaving || metaLoading}>
                    {metaSaving ? 'Salvando...' : metaLoading ? 'Carregando...' : 'Salvar'}
                  </button>
                </>
              )}
            </div>

            {metaSaveMessage && (
              <div className={`config-message config-message-${metaSaveType}`}>
                {metaSaveMessage}
              </div>
            )}
          </form>
        </div>

        <footer className="cadastro-footer">
          <p>Cada doação registrada neste painel chegará na mesa de uma família.</p>
        </footer>
      </div>
      <Toast
        type={toastType}
        message={toastMessage}
        onClose={() => setToastMessage('')}
        duration={5000}
      />
    </div>
  )
}
