import { useState, useEffect, useRef, useMemo } from 'react'
import * as echarts from 'echarts'
import Heatmap from './Heatmap'

export default function ComposicaoToggle({ doacoes, ranking, unidades }) {
  const [mode, setMode] = useState('barras') // 'barras' ou 'heatmap'
  const chartComposicaoRef = useRef(null)
  const chartComposicaoInstance = useRef(null)

  // Memoized bar chart data
  const composicaoData = useMemo(() => {
    if (!doacoes || !ranking || ranking.length === 0) {
      return []
    }

    const topUnidades = ranking.slice(0, 8)
    return topUnidades.map(unit => {
      const unidadeDoacoes = doacoes.filter(d => d.unidade === unit.nome)
      return {
        nome: unit.nome,
        alimentos: unidadeDoacoes.filter(d => d.categoria === 'alimentos').reduce((s, d) => s + d.quantidade, 0),
        higiene: unidadeDoacoes.filter(d => d.categoria === 'higiene').reduce((s, d) => s + d.quantidade, 0),
        vestuario: unidadeDoacoes.filter(d => d.categoria === 'vestuario').reduce((s, d) => s + d.quantidade, 0),
        pet: unidadeDoacoes.filter(d => d.categoria === 'pet').reduce((s, d) => s + d.quantidade, 0),
      }
    })
  }, [doacoes, ranking])

  // Initialize and update bar chart
  useEffect(() => {
    if (mode !== 'barras') return
    if (!chartComposicaoRef.current) return

    // Initialize chart instance if needed
    if (!chartComposicaoInstance.current) {
      try {
        chartComposicaoInstance.current = echarts.init(chartComposicaoRef.current, null, { renderer: 'canvas' })
      } catch (e) {
        console.error('Erro ao init ComposicaoToggle barras:', e)
        return
      }
    }

    const optionComposicao = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(13, 54, 52, 0.95)',
        borderColor: 'rgba(245, 206, 153, 0.2)',
        textStyle: { color: '#faf7f2' },
        axisPointer: { type: 'shadow' },
      },
      legend: {
        bottom: 0,
        left: 'center',
        textStyle: { color: '#f5ce99', fontSize: 12, fontWeight: 600 },
        itemWidth: 16,
        itemHeight: 16,
        itemGap: 18,
        icon: 'rect',
      },
      grid: {
        left: '100px',
        right: '40px',
        bottom: '150px',
        top: '20px',
        containLabel: false,
      },
      xAxis: {
        type: 'category',
        data: composicaoData.map(d => d.nome.replace('ULBRA ', '')),
        axisLabel: { color: '#c4b5a0', fontSize: 11, rotate: 45, interval: 0 },
        axisLine: { lineStyle: { color: 'rgba(245, 206, 153, 0.15)' } },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#c4b5a0', fontSize: 12 },
        axisLine: { lineStyle: { color: 'rgba(245, 206, 153, 0.15)' } },
        splitLine: { lineStyle: { color: 'rgba(245, 206, 153, 0.1)' } },
      },
      series: [
        {
          name: 'Alimentos',
          data: composicaoData.map(d => d.alimentos),
          type: 'bar',
          stack: 'total',
          itemStyle: { color: '#cca269' },
          z: 4,
        },
        {
          name: 'Vestuário',
          data: composicaoData.map(d => d.vestuario),
          type: 'bar',
          stack: 'total',
          itemStyle: { color: '#a89e8b' },
          z: 3,
        },
        {
          name: 'Higiene & Limpeza',
          data: composicaoData.map(d => d.higiene),
          type: 'bar',
          stack: 'total',
          itemStyle: { color: '#91baa3' },
          z: 2,
        },
        {
          name: 'Pet/Ração',
          data: composicaoData.map(d => d.pet),
          type: 'bar',
          stack: 'total',
          itemStyle: { color: '#66563d' },
          z: 1,
        },
      ],
    }

    try {
      chartComposicaoInstance.current.setOption(optionComposicao, true)
      setTimeout(() => {
        chartComposicaoInstance.current?.resize()
      }, 100)
    } catch (e) {
      console.error('Erro ao update barras:', e)
    }
  }, [composicaoData, mode])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      chartComposicaoInstance.current?.resize()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="composicao-toggle-container">
      <div className="composicao-controls">
        <button
          className={`composicao-btn ${mode === 'barras' ? 'active' : ''}`}
          onClick={() => setMode('barras')}
          title="Visualizar como gráfico de barras empilhadas"
        >
          Barras
        </button>
        <button
          className={`composicao-btn ${mode === 'heatmap' ? 'active' : ''}`}
          onClick={() => setMode('heatmap')}
          title="Visualizar como mapa de calor"
        >
          Heatmap
        </button>
      </div>

      {mode === 'barras' && (
        <div
          ref={chartComposicaoRef}
          className="echarts-container"
          style={{ minHeight: '400px', width: '100%' }}
        />
      )}

      {mode === 'heatmap' && (
        <Heatmap doacoes={doacoes} unidades={unidades} />
      )}
    </div>
  )
}
