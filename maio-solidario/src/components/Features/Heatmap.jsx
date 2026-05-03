import { useEffect, useRef, useMemo } from 'react'
import * as echarts from 'echarts'

export default function Heatmap({ doacoes }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  // Memoized data processing
  const heatmapData = useMemo(() => {
    if (!doacoes || doacoes.length === 0) {
      return { matrix: [], unidadesList: [], categoriasList: [] }
    }

    // Categorias padrão
    const categoriasList = ['alimentos', 'higiene', 'vestuario', 'pet']
    const categoriasLabel = {
      alimentos: 'Alimentos',
      higiene: 'Higiene & Limpeza',
      vestuario: 'Vestuário',
      pet: 'Pet/Ração',
    }

    // Agregar dados por unidade e categoria
    const aggregated = {}
    let maxValue = 0

    doacoes.forEach(doacao => {
      const key = `${doacao.unidade}|${doacao.categoria}`
      if (!aggregated[key]) {
        aggregated[key] = 0
      }
      aggregated[key] += doacao.quantidade
      maxValue = Math.max(maxValue, aggregated[key])
    })

    // Pegar top 8 unidades por total
    const unidadesTotals = {}
    doacoes.forEach(doacao => {
      if (!unidadesTotals[doacao.unidade]) {
        unidadesTotals[doacao.unidade] = 0
      }
      unidadesTotals[doacao.unidade] += doacao.quantidade
    })

    const unidadesList = Object.entries(unidadesTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name]) => name)

    // Construir matriz para heatmap
    const matrix = []
    unidadesList.forEach((unidade, uIdx) => {
      categoriasList.forEach((categoria, cIdx) => {
        const value = aggregated[`${unidade}|${categoria}`] || 0
        matrix.push([cIdx, uIdx, value])
      })
    })

    return {
      matrix,
      unidadesList,
      categoriasList,
      categoriasLabel,
      maxValue,
    }
  }, [doacoes])

  // Initialize and update chart
  useEffect(() => {
    if (!chartRef.current) return

    // Initialize chart instance if needed
    if (!chartInstance.current) {
      try {
        chartInstance.current = echarts.init(chartRef.current, null, { renderer: 'canvas' })
      } catch (e) {
        console.error('Erro ao inicializar heatmap:', e)
        return
      }
    }

    const { matrix, unidadesList, categoriasList, categoriasLabel, maxValue } = heatmapData

    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        position: 'top',
        backgroundColor: 'rgba(13, 54, 52, 0.95)',
        borderColor: 'rgba(245, 206, 153, 0.2)',
        textStyle: { color: '#faf7f2' },
        formatter: (params) => {
          if (params.componentSubType !== 'heatmap') return ''
          const [cIdx, uIdx, value] = params.value
          const unidade = unidadesList[uIdx]
          const categoria = categoriasList[cIdx]
          return `${unidade}<br/>${categoriasLabel[categoria]}: <strong>${value}</strong>`
        },
      },
      grid: {
        height: '70%',
        left: '120px',
        right: '80px',
        top: '20px',
        bottom: '60px',
        containLabel: false,
      },
      xAxis: {
        type: 'category',
        data: categoriasList.map(cat => categoriasLabel[cat]),
        axisLabel: {
          color: '#c4b5a0',
          fontSize: 12,
          interval: 0,
        },
        axisLine: { lineStyle: { color: 'rgba(245, 206, 153, 0.15)' } },
        splitLine: { show: false },
      },
      yAxis: {
        type: 'category',
        data: unidadesList.map(u => u.replace('ULBRA ', '')),
        axisLabel: {
          color: '#c4b5a0',
          fontSize: 11,
        },
        axisLine: { lineStyle: { color: 'rgba(245, 206, 153, 0.15)' } },
        splitLine: { show: false },
      },
      visualMap: {
        min: 0,
        max: maxValue,
        calculable: true,
        orient: 'vertical',
        right: '10px',
        top: '20px',
        dimension: 2,
        inRange: {
          color: ['#ffffff', '#fee8d5', '#f8b88b', '#e87c3c', '#c41e3a'],
        },
        textStyle: {
          color: '#c4b5a0',
          fontSize: 11,
        },
      },
      series: [
        {
          name: 'Quantidade',
          type: 'heatmap',
          data: matrix,
          emphasis: {
            itemStyle: {
              borderColor: '#ffd700',
              borderWidth: 2,
            },
          },
          label: {
            show: true,
            position: 'inside',
            color: '#000',
            fontSize: 10,
            formatter: (params) => {
              const value = params.value[2]
              return value > 0 ? value : ''
            },
          },
        },
      ],
    }

    try {
      chartInstance.current.setOption(option, true)
      setTimeout(() => {
        chartInstance.current?.resize()
      }, 100)
    } catch (e) {
      console.error('Erro ao atualizar heatmap:', e)
    }
  }, [heatmapData])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      chartInstance.current?.resize()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      ref={chartRef}
      className="echarts-container heatmap-container"
      style={{ minHeight: '400px', width: '100%' }}
    />
  )
}
