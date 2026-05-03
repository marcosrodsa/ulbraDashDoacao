import { useMemo } from 'react'
import { calculateMetaProjection, formatarDataBR } from '../../lib/metaCalculations'

/**
 * Componente MetaProjection
 * Projeta quando a meta de doações será atingida com base no ritmo atual
 *
 * @param {Object} props
 * @param {number} props.doacoesRegistradas - Quantidade total de doações registradas
 * @param {number} props.metaTotal - Meta total (e.g., 500)
 * @param {string} props.dataFim - Data final da campanha (YYYY-MM-DD)
 * @param {string} props.dataInicio - Data de início da campanha (YYYY-MM-DD), default '2026-05-01'
 * @returns {JSX.Element}
 */
export default function MetaProjection({
  doacoesRegistradas = 0,
  metaTotal = 500,
  dataFim = '2026-05-31',
  dataInicio = '2026-05-01',
}) {
  // Calcular projeção de forma memoizada
  const projection = useMemo(() => {
    return calculateMetaProjection({
      doacoesRegistradas,
      metaTotal,
      dataInicio,
      dataFim,
    })
  }, [doacoesRegistradas, metaTotal, dataFim, dataInicio])

  // Calcular percentual de progresso atual
  const percentualAtual = Math.round((doacoesRegistradas / metaTotal) * 100)

  // Determinar cor da barra de progresso
  const getProgressColor = (percent) => {
    if (percent >= 100) return '#4CAF50' // Verde
    if (percent >= 75) return '#8BC34A' // Verde claro
    if (percent >= 50) return '#FFC107' // Amarelo
    if (percent >= 25) return '#FF9800' // Laranja
    return '#F44336' // Vermelho
  }

  const progressColor = getProgressColor(percentualAtual)

  // Formatação de ritmo
  const ritmoFormatado = projection.ritmo > 0 ? projection.ritmo.toFixed(1) : '0'

  return (
    <div className="meta-projection-container">
      <div className="meta-projection-card">
        {/* Cabeçalho com totais */}
        <div className="meta-projection-header">
          <h3 className="meta-projection-title">Meta de Doações</h3>
          <div className="meta-projection-totals">
            <div className="meta-total-registered">
              <span className="meta-label">Registradas:</span>
              <span className="meta-value">{doacoesRegistradas}</span>
            </div>
            <span className="meta-separator">/</span>
            <div className="meta-total-goal">
              <span className="meta-label">Meta:</span>
              <span className="meta-value">{metaTotal}</span>
            </div>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="meta-progress-wrapper">
          <div className="meta-progress-bar">
            <div
              className="meta-progress-fill"
              style={{
                width: `${Math.min(percentualAtual, 100)}%`,
                backgroundColor: progressColor,
              }}
            />
          </div>
          <div className="meta-progress-text">
            <span className="meta-progress-percentage">{percentualAtual}%</span>
          </div>
        </div>

        {/* Informações de ritmo */}
        <div className="meta-pace-info">
          <div className="meta-pace-item">
            <span className="meta-pace-label">Ritmo:</span>
            <span className="meta-pace-value">{ritmoFormatado} doações/dia</span>
          </div>
          {projection.diasRestantes > 0 && (
            <div className="meta-pace-item">
              <span className="meta-pace-label">Dias restantes:</span>
              <span className="meta-pace-value">{projection.diasRestantes}</span>
            </div>
          )}
        </div>

        {/* Projeção ETA */}
        <div className="meta-projection-status">
          {projection.atingiraAteOFim ? (
            <div className="meta-status-success">
              <span className="meta-status-icon">✅</span>
              <div className="meta-status-content">
                <p className="meta-status-title">Atingirá a meta</p>
                <p className="meta-status-detail">
                  ~{doacoesRegistradas + Math.round((projection.ritmo * (projection.diasTotais - projection.diasDecorridos)))} em{' '}
                  {projection.diacalculoETAFormatado}
                  {projection.dataETA && projection.dataETA <= new Date(dataFim) && (
                    <span className="meta-status-extra">
                      {' '}
                      ({projection.diasTotais - Math.ceil(metaTotal / projection.ritmo)} dias antes do fim)
                    </span>
                  )}
                </p>
              </div>
            </div>
          ) : (
            <div className="meta-status-warning">
              <span className="meta-status-icon">⚠️</span>
              <div className="meta-status-content">
                <p className="meta-status-title">Projeção</p>
                <p className="meta-status-detail">
                  ~{projection.doacoesAteOFim} ({projection.percentualFinal}%) até o fim da campanha
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Informações detalhadas */}
        {projection.ritmo > 0 && (
          <div className="meta-details">
            <div className="meta-details-grid">
              <div className="meta-details-item">
                <span className="meta-details-label">Dias decorridos</span>
                <span className="meta-details-value">{projection.diasDecorridos}</span>
              </div>
              <div className="meta-details-item">
                <span className="meta-details-label">Dias totais</span>
                <span className="meta-details-value">{projection.diasTotais}</span>
              </div>
              <div className="meta-details-item">
                <span className="meta-details-label">Meta projetada</span>
                <span className="meta-details-value">{projection.doacoesAteOFim}</span>
              </div>
              <div className="meta-details-item">
                <span className="meta-details-label">% projetado</span>
                <span className="meta-details-value">{projection.percentualFinal}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
