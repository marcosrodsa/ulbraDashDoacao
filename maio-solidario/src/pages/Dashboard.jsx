import { useState, useEffect, useRef, useMemo, Fragment } from 'react'
import * as echarts from 'echarts'
import ulbraLogo from '../assets/ulbra_logo.png'
import { IconFood, IconCleanliness, IconApparel, IconPetCare, IconChartColumn, IconTrophy, IconRankingStar, IconClipboardList, IconBoxesStacked, IconSchool, IconOther } from '../components/FontAwesomeIcons'
import { supabase } from '../lib/supabaseClient'
import { useCampaignSettings } from '../hooks/useCampaignSettings'
import '../styles/dashboard.css'
import '../styles/icons.css'

// Dados fake para demonstração - expandido para todo maio
const MOCK_DOACOES = [
  // Maio 1
  { id: 1, unidade: 'ULBRA Porto Alegre', categoria: 'alimentos', quantidade: 150, descricao: 'Arroz 15kg', data: '2026-05-01', timestamp: '08:30' },
  { id: 2, unidade: 'ULBRA Gravataí', categoria: 'higiene', quantidade: 45, descricao: 'Kits de higiene', data: '2026-05-01', timestamp: '09:15' },
  { id: 3, unidade: 'ULBRA Canoas', categoria: 'vestuario', quantidade: 120, descricao: 'Camisetas e calças', data: '2026-05-01', timestamp: '10:00' },
  // Maio 2
  { id: 4, unidade: 'ULBRA Porto Alegre', categoria: 'alimentos', quantidade: 200, descricao: 'Feijão 20kg', data: '2026-05-02', timestamp: '08:00' },
  { id: 5, unidade: 'ULBRA Novo Hamburgo', categoria: 'pet', quantidade: 80, descricao: 'Ração para cães', data: '2026-05-02', timestamp: '09:30' },
  { id: 6, unidade: 'ULBRA Torres', categoria: 'alimentos', quantidade: 100, descricao: 'Açúcar e café', data: '2026-05-02', timestamp: '10:45' },
  { id: 7, unidade: 'ULBRA Canoas', categoria: 'higiene', quantidade: 60, descricao: 'Sabonete e detergente', data: '2026-05-02', timestamp: '14:30' },
  // Maio 3
  { id: 8, unidade: 'ULBRA Gravataí', categoria: 'alimentos', quantidade: 180, descricao: 'Arroz integral', data: '2026-05-03', timestamp: '07:45' },
  { id: 9, unidade: 'ULBRA Porto Alegre', categoria: 'vestuario', quantidade: 90, descricao: 'Jaquetas doadas', data: '2026-05-03', timestamp: '11:20' },
  { id: 10, unidade: 'ULBRA Canoas', categoria: 'pet', quantidade: 50, descricao: 'Ração para gatos', data: '2026-05-03', timestamp: '15:00' },
  // Maio 4
  { id: 11, unidade: 'ULBRA Novo Hamburgo', categoria: 'alimentos', quantidade: 160, descricao: 'Macarrão e óleo', data: '2026-05-04', timestamp: '08:15' },
  { id: 12, unidade: 'ULBRA Torres', categoria: 'higiene', quantidade: 75, descricao: 'Pasta de dente e escova', data: '2026-05-04', timestamp: '10:00' },
  { id: 13, unidade: 'ULBRA Gravataí', categoria: 'vestuario', quantidade: 140, descricao: 'Meias e cuecas', data: '2026-05-04', timestamp: '13:45' },
  // Maio 5
  { id: 14, unidade: 'ULBRA Canoas', categoria: 'alimentos', quantidade: 220, descricao: 'Feijão preto 22kg', data: '2026-05-05', timestamp: '07:30' },
  { id: 15, unidade: 'ULBRA Porto Alegre', categoria: 'higiene', quantidade: 85, descricao: 'Sabonete em barra', data: '2026-05-05', timestamp: '09:00' },
  { id: 16, unidade: 'ULBRA Novo Hamburgo', categoria: 'vestuario', quantidade: 110, descricao: 'Camisetas coloridas', data: '2026-05-05', timestamp: '15:30' },
  // Maio 6
  { id: 17, unidade: 'ULBRA Torres', categoria: 'alimentos', quantidade: 130, descricao: 'Lentilha e grão', data: '2026-05-06', timestamp: '08:45' },
  { id: 18, unidade: 'ULBRA Gravataí', categoria: 'pet', quantidade: 95, descricao: 'Ossinhos e brinquedos', data: '2026-05-06', timestamp: '11:15' },
  { id: 19, unidade: 'ULBRA Canoas', categoria: 'higiene', quantidade: 70, descricao: 'Xampu e sabonete', data: '2026-05-06', timestamp: '14:00' },
  // Maio 7
  { id: 20, unidade: 'ULBRA Porto Alegre', categoria: 'alimentos', quantidade: 190, descricao: 'Arroz branco 19kg', data: '2026-05-07', timestamp: '08:00' },
  { id: 21, unidade: 'ULBRA Novo Hamburgo', categoria: 'higiene', quantidade: 100, descricao: 'Kits completos', data: '2026-05-07', timestamp: '10:30' },
  { id: 22, unidade: 'ULBRA Torres', categoria: 'vestuario', quantidade: 150, descricao: 'Shorts e bermudas', data: '2026-05-07', timestamp: '16:45' },
  // Maio 8-12 (Semana 2)
  { id: 23, unidade: 'ULBRA Gravataí', categoria: 'alimentos', quantidade: 210, descricao: 'Macarrão vário', data: '2026-05-08', timestamp: '09:00' },
  { id: 24, unidade: 'ULBRA Canoas', categoria: 'vestuario', quantidade: 165, descricao: 'Vestidos doados', data: '2026-05-08', timestamp: '13:20' },
  { id: 25, unidade: 'ULBRA Porto Alegre', categoria: 'pet', quantidade: 120, descricao: 'Ração premium', data: '2026-05-09', timestamp: '07:50' },
  { id: 26, unidade: 'ULBRA Novo Hamburgo', categoria: 'alimentos', quantidade: 240, descricao: 'Caldo e temperos', data: '2026-05-10', timestamp: '08:30' },
  { id: 27, unidade: 'ULBRA Torres', categoria: 'higiene', quantidade: 130, descricao: 'Fraldas e absorventes', data: '2026-05-11', timestamp: '10:00' },
  { id: 28, unidade: 'ULBRA Gravataí', categoria: 'alimentos', quantidade: 280, descricao: 'Feijão e lentilha bulk', data: '2026-05-12', timestamp: '08:15' },
  // Maio 15-19 (Semana 3)
  { id: 29, unidade: 'ULBRA Canoas', categoria: 'alimentos', quantidade: 320, descricao: 'Arroz 32kg', data: '2026-05-15', timestamp: '07:45' },
  { id: 30, unidade: 'ULBRA Porto Alegre', categoria: 'vestuario', quantidade: 200, descricao: 'Lotes de roupas', data: '2026-05-15', timestamp: '11:30' },
  { id: 31, unidade: 'ULBRA Novo Hamburgo', categoria: 'higiene', quantidade: 160, descricao: 'Higiene pessoal completo', data: '2026-05-16', timestamp: '09:00' },
  { id: 32, unidade: 'ULBRA Gravataí', categoria: 'pet', quantidade: 140, descricao: 'Ração e petiscos', data: '2026-05-17', timestamp: '14:45' },
  { id: 33, unidade: 'ULBRA Torres', categoria: 'alimentos', quantidade: 290, descricao: 'Cesta básica', data: '2026-05-18', timestamp: '10:00' },
  { id: 34, unidade: 'ULBRA Canoas', categoria: 'higiene', quantidade: 185, descricao: 'Detergentes vários', data: '2026-05-19', timestamp: '08:30' },
  // Maio 22-26 (Semana 4)
  { id: 35, unidade: 'ULBRA Porto Alegre', categoria: 'alimentos', quantidade: 410, descricao: 'Doação grande de alimentos', data: '2026-05-22', timestamp: '08:00' },
  { id: 36, unidade: 'ULBRA Gravataí', categoria: 'vestuario', quantidade: 280, descricao: 'Cobertores e roupas', data: '2026-05-22', timestamp: '11:00' },
  { id: 37, unidade: 'ULBRA Novo Hamburgo', categoria: 'alimentos', quantidade: 350, descricao: 'Feijão 35kg', data: '2026-05-23', timestamp: '09:15' },
  { id: 38, unidade: 'ULBRA Canoas', categoria: 'pet', quantidade: 210, descricao: 'Ração estoque grande', data: '2026-05-24', timestamp: '13:45' },
  { id: 39, unidade: 'ULBRA Torres', categoria: 'higiene', quantidade: 240, descricao: 'Higiene lote grande', data: '2026-05-25', timestamp: '10:30' },
  // Maio 29-31 (Semana 5)
  { id: 40, unidade: 'ULBRA Gravataí', categoria: 'alimentos', quantidade: 520, descricao: 'Última grande coleta', data: '2026-05-29', timestamp: '08:00' },
  { id: 41, unidade: 'ULBRA Porto Alegre', categoria: 'higiene', quantidade: 310, descricao: 'Kits finais', data: '2026-05-30', timestamp: '09:30' },
  { id: 42, unidade: 'ULBRA Canoas', categoria: 'vestuario', quantidade: 590, descricao: 'Lote final de roupas', data: '2026-05-31', timestamp: '16:00' },
  { id: 43, unidade: 'ULBRA Novo Hamburgo', categoria: 'alimentos', quantidade: 450, descricao: 'Alimentos finais', data: '2026-05-31', timestamp: '14:00' },
]

const CATEGORIAS = {
  alimentos: { Icon: IconFood, label: 'Alimentos', unidade: 'kg', color: '#cca269' },
  higiene: { Icon: IconCleanliness, label: 'Higiene & Limpeza', unidade: 'unidades', color: '#91baa3' },
  vestuario: { Icon: IconApparel, label: 'Vestuário', unidade: 'peças', color: '#a89e8b' },
  pet: { Icon: IconPetCare, label: 'Pet/Ração', unidade: 'kg', color: '#66563d' },
  escolar: { Icon: IconSchool, label: 'Material Escolar', unidade: 'itens', color: '#6b9080' },
  outros: { Icon: IconOther, label: 'Outros', unidade: 'itens', color: '#7a7a7a' },
}

// Helper: agrupar doações por semana
const groupByWeek = (doacoes) => {
  const byWeek = {}
  doacoes.forEach(d => {
    const date = new Date(d.data + 'T00:00:00')
    const day = date.getDate()
    
    let weekNum
    if (day <= 10) weekNum = 1
    else if (day <= 17) weekNum = 2
    else if (day <= 21) weekNum = 3 // Ajuste para manter 7 dias se possível, ou 24?
    // Vamos usar: 1-10 (S1), 11-17 (S2), 18-24 (S3), 25-31 (S4)
    if (day <= 10) weekNum = 1
    else if (day <= 17) weekNum = 2
    else if (day <= 24) weekNum = 3
    else weekNum = 4
    
    const weekKey = `Semana ${weekNum}`
    if (!byWeek[weekKey]) {
      byWeek[weekKey] = { alimentos: 0, higiene: 0, vestuario: 0, pet: 0, escolar: 0, outros: 0, total: 0 }
    }
    byWeek[weekKey][d.categoria] += d.quantidade
    byWeek[weekKey].total += d.quantidade
  })
  return Object.entries(byWeek)
    .sort((a, b) => {
      const numA = parseInt(a[0].replace('Semana ', ''))
      const numB = parseInt(b[0].replace('Semana ', ''))
      return numA - numB
    })
    .map(([semana, vals]) => ({ semana, ...vals }))
}



export default function DashboardPage() {
  // Configurações da campanha (meta de doações)
  const { settings } = useCampaignSettings()

  // Estado de filtros
  const [filters, setFilters] = useState({
    unidade: '',
    tipoUnidade: 'Todos', // 'Todos', 'Escola', 'Superior'
    categoria: '',
    dateFrom: '2026-04-01',
    dateTo: '2026-05-31',
  })
  const [viewMode, setViewMode] = useState('semanal') // Apenas 'semanal' agora
  const [expandedUnit, setExpandedUnit] = useState(null) // para expandir linha na tabela
  const [auditPage, setAuditPage] = useState(1) // paginação tabela auditoria
  const [rankingPage, setRankingPage] = useState(1) // paginação tabela ranking

  // Dados do Supabase
  const [doacoesDB, setDoacoesDB] = useState([])
  const [unidadesDB, setUnidadesDB] = useState([])
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [totais, setTotais] = useState({})
  const [ranking, setRanking] = useState([])
  const [ultimasDoacoes, setUltimasDoacoes] = useState([])
  const [evolucaoData, setEvolucaoData] = useState([])
  const [isIntroExpanded, setIsIntroExpanded] = useState(false)
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false)

  const chartRankingRef = useRef(null)
  const chartRankingInstance = useRef(null)
  const chartEvolucaoRef = useRef(null)
  const chartEvolucaoInstance = useRef(null)
  const chartComposicaoRef = useRef(null)
  const chartComposicaoInstance = useRef(null)

  // Função para buscar dados
  const fetchData = async () => {
    try {
      // Buscar doações
      const { data: doacoes, error: errorDoacoes } = await supabase
        .from('donations')
        .select('*')

      if (errorDoacoes) throw errorDoacoes

      // Buscar unidades
      const { data: unidades, error: errorUnidades } = await supabase
        .from('units')
        .select('*')
        .order('name')

      if (errorUnidades) throw errorUnidades

      // Filtrar apenas unidades válidas (remover: Pop, Institucional, Geral, Caxias do Sul, Ultec)
      const validUnidades = (unidades || []).filter(u => {
        const name = u.name?.toLowerCase() || ''
        const excludedKeywords = ['pop', 'institucional', 'geral', 'caxias do sul', 'ultec']
        return !excludedKeywords.some(keyword => name.includes(keyword))
      })

      // Transformar dados para o formato esperado
      const doacoesFormatadas = (doacoes || []).map(d => {
        // Usar donation_date como fonte de verdade (data da doação)
        const dataDonacao = d.donation_date
        // Extrair hora e minuto de created_at (timestamp do registro)
        const [, timePart] = d.created_at.split('T')
        const [hora, minuto] = timePart.split(':')

        return {
          id: d.id,
          unidade: (() => {
            const unit = validUnidades?.find(u => u.id === d.unit_id);
            if (!unit) return 'Unidade desconhecida';
            return unit.display_name && unit.display_name.trim() !== '' ? unit.display_name : unit.name;
          })(),
          categoria: d.category,
          quantidade: d.quantity,
          descricao: d.description || '',
          data: dataDonacao, // YYYY-MM-DD da data de doação
          timestamp: `${hora}:${minuto}`
        }
      })

      setDoacoesDB(doacoesFormatadas)
      setUnidadesDB(validUnidades || [])
      setLoading(false)
    } catch (error) {
      console.error('Erro ao buscar dados do Supabase:', error)
      setLoading(false)
    }
  }

  // Buscar dados na primeira renderização
  useEffect(() => {
    fetchData()
  }, [])

  // Handler para refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchData()
    // Force chart update
    setTimeout(() => {
      if (totais && Object.keys(totais).length > 0 && ranking.length > 0) {
        try {
          updateCharts(totais, ranking, evolucaoData, filteredDoacoes)
          chartRankingInstance.current?.resize()
          chartEvolucaoInstance.current?.resize()
          chartComposicaoInstance.current?.resize()
        } catch (e) {
          console.error('Erro ao update charts no refresh:', e)
        }
      }
    }, 100)
    setIsRefreshing(false)
  }

  // Derivar dados filtrados usando useMemo
  const filteredDoacoes = useMemo(() =>
    doacoesDB.filter(d => {
      const isCorrectUnit = !filters.unidade || d.unidade === filters.unidade;
      const isCorrectCategory = !filters.categoria || d.categoria === filters.categoria;
      const isCorrectDate = d.data >= filters.dateFrom && d.data <= filters.dateTo;
      
      let isCorrectType = true;
      if (filters.tipoUnidade !== 'Todos') {
        const isEscola = d.unidade.toLowerCase().includes('colégio') || d.unidade.toLowerCase().includes('escola');
        const type = isEscola ? 'Escola' : 'Superior';
        isCorrectType = type === filters.tipoUnidade;
      }

      return isCorrectUnit && isCorrectCategory && isCorrectDate && isCorrectType;
    }),
    [filters, doacoesDB]
  )

  // Dados calculados a partir de filteredDoacoes
  const calculatedTotais = useMemo(() => {
    const totaisPorCategoria = {}
    Object.keys(CATEGORIAS).forEach(cat => {
      totaisPorCategoria[cat] = filteredDoacoes
        .filter(d => d.categoria === cat)
        .reduce((sum, d) => sum + d.quantidade, 0)
    })
    return totaisPorCategoria
  }, [filteredDoacoes])

  const calculatedRanking = useMemo(() => {
    const rankingPorUnidade = {}
    filteredDoacoes.forEach(doacao => {
      if (!rankingPorUnidade[doacao.unidade]) {
        rankingPorUnidade[doacao.unidade] = { total: 0, categoria: doacao.categoria, registros: 0 }
      }
      rankingPorUnidade[doacao.unidade].total += doacao.quantidade
      rankingPorUnidade[doacao.unidade].registros += 1
    })
    return Object.entries(rankingPorUnidade)
      .map(([nome, data]) => ({
        nome,
        total: data.total,
        categoria: data.categoria,
        registros: data.registros,
      }))
      .sort((a, b) => b.total - a.total)
  }, [filteredDoacoes])

  const calculatedUltimasDoacoes = useMemo(() =>
    filteredDoacoes
      .sort((a, b) => new Date(`${b.data}T${b.timestamp}`) - new Date(`${a.data}T${a.timestamp}`))
      .slice(0, 8),
    [filteredDoacoes]
  )

  const calculatedEvolucaoData = useMemo(() =>
    groupByWeek(filteredDoacoes),
    [filteredDoacoes]
  )

  // Atualizar state com dados calculados
  useEffect(() => {
    setTotais(calculatedTotais)
    setRanking(calculatedRanking)
    setUltimasDoacoes(calculatedUltimasDoacoes)
    setEvolucaoData(calculatedEvolucaoData)
  }, [calculatedTotais, calculatedRanking, calculatedUltimasDoacoes, calculatedEvolucaoData])

  // Efeito para inicializar e atualizar gráficos
  useEffect(() => {
    const initAndUpdate = () => {
      // Inicializar gráficos se ainda não foram
      if (!chartRankingInstance.current && chartRankingRef.current) {
        try {
          chartRankingInstance.current = echarts.init(chartRankingRef.current, null, { renderer: 'canvas' })
        } catch (e) {
          console.error('Erro ao init Ranking:', e)
        }
      }
      if (!chartEvolucaoInstance.current && chartEvolucaoRef.current) {
        try {
          chartEvolucaoInstance.current = echarts.init(chartEvolucaoRef.current, null, { renderer: 'canvas' })
        } catch (e) {
          console.error('Erro ao init Evolucao:', e)
        }
      }
      if (!chartComposicaoInstance.current && chartComposicaoRef.current) {
        try {
          chartComposicaoInstance.current = echarts.init(chartComposicaoRef.current, null, { renderer: 'canvas' })
        } catch (e) {
          console.error('Erro ao init Composicao:', e)
        }
      }

      // Atualizar dados se temos dados válidos
      console.log('Tentando update charts com:', {
        totaisKeys: Object.keys(totais).length,
        rankingLen: ranking.length,
        evolucaoLen: evolucaoData.length
      })

      if (Object.keys(totais).length > 0 && ranking.length > 0) {
        try {
          updateCharts(totais, ranking, evolucaoData, filteredDoacoes)
          console.log('updateCharts executada com sucesso')
        } catch (e) {
          console.error('Erro ao update charts:', e)
        }
      }
    }

    // Tentar inicializar quando componente monta e quando dados chegam
    window.addEventListener('load', initAndUpdate)
    const timer = setTimeout(initAndUpdate, 300)

    return () => {
      window.removeEventListener('load', initAndUpdate)
      clearTimeout(timer)
    }
  }, [totais, ranking, evolucaoData, filteredDoacoes])

  // Handle window resize - make charts responsive
  useEffect(() => {
    const handleResize = () => {
      chartRankingInstance.current?.resize()
      chartEvolucaoInstance.current?.resize()
      chartComposicaoInstance.current?.resize()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const updateCharts = (totaisPorCategoria, rankingArray, evolucaoArray, doacoes) => {
    try {
      // Gráfico 1: Composição por Unidade (Barras empilhadas)
      if (chartComposicaoInstance.current) {
        const topLimit = window.innerWidth < 768 ? 5 : 10;
        const topUnidades = rankingArray.slice(0, topLimit);
        const composicaoData = topUnidades.map(unit => {
          const unidadeDoacoes = doacoes.filter(d => d.unidade === unit.nome)
          return {
            nome: unit.nome,
            alimentos: unidadeDoacoes.filter(d => d.categoria === 'alimentos').reduce((s, d) => s + d.quantidade, 0),
            higiene: unidadeDoacoes.filter(d => d.categoria === 'higiene').reduce((s, d) => s + d.quantidade, 0),
            vestuario: unidadeDoacoes.filter(d => d.categoria === 'vestuario').reduce((s, d) => s + d.quantidade, 0),
            pet: unidadeDoacoes.filter(d => d.categoria === 'pet').reduce((s, d) => s + d.quantidade, 0),
            escolar: unidadeDoacoes.filter(d => d.categoria === 'escolar').reduce((s, d) => s + d.quantidade, 0),
            outros: unidadeDoacoes.filter(d => d.categoria === 'outros').reduce((s, d) => s + d.quantidade, 0),
          }
        })

        const optionComposicao = {
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'axis',
            confine: true,
            backgroundColor: 'rgba(13, 54, 52, 0.95)',
            borderColor: 'rgba(245, 206, 153, 0.2)',
            textStyle: { color: '#faf7f2' },
            axisPointer: { type: 'shadow' },
            formatter: function(params) {
              if (!params || !params.length) return '';
              let html = `<strong style="font-size: 13px;">${params[0].axisValue}</strong><br/>`;
              let hasValue = false;
              params.forEach(item => {
                if (item.value > 0) {
                  html += `<div style="display: flex; justify-content: space-between; gap: 16px; margin-top: 4px;"><span>${item.marker} ${item.seriesName}</span> <strong>${item.value}</strong></div>`;
                  hasValue = true;
                }
              });
              if (!hasValue) html += `<div style="margin-top: 4px; color: #aaa;">Sem doações</div>`;
              return html;
            }
          },
          legend: {
            bottom: 0,
            left: 'center',
            textStyle: { color: '#f5ce99', fontSize: window.innerWidth < 768 ? 10 : 12, fontWeight: 600 },
            itemWidth: window.innerWidth < 768 ? 12 : 16,
            itemHeight: window.innerWidth < 768 ? 12 : 16,
            itemGap: window.innerWidth < 768 ? 10 : 18,
            icon: 'rect',
          },
          grid: {
            left: window.innerWidth < 768 ? '40px' : '100px',
            right: window.innerWidth < 768 ? '20px' : '40px',
            bottom: window.innerWidth < 768 ? '130px' : '150px',
            top: '20px',
            containLabel: false,
          },
          xAxis: {
            type: 'category',
            data: composicaoData.map(d => d.nome.replace('ULBRA ', '')),
            axisLabel: { 
              color: '#c4b5a0', 
              fontSize: window.innerWidth < 768 ? 9 : 11, 
              rotate: 45, 
              interval: 0,
              width: window.innerWidth < 768 ? 60 : 80,
              overflow: 'truncate'
            },
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
              barMaxWidth: 60,
              z: 4,
            },
            {
              name: 'Higiene & Limpeza',
              data: composicaoData.map(d => d.higiene),
              type: 'bar',
              stack: 'total',
              itemStyle: { color: '#91baa3' },
              barMaxWidth: 60,
              z: 3,
            },
            {
              name: 'Vestuário',
              data: composicaoData.map(d => d.vestuario),
              type: 'bar',
              stack: 'total',
              itemStyle: { color: '#a89e8b' },
              barMaxWidth: 60,
              z: 2,
            },
            {
              name: 'Pet/Ração',
              data: composicaoData.map(d => d.pet),
              type: 'bar',
              stack: 'total',
              itemStyle: { color: '#66563d' },
              barMaxWidth: 60,
              z: 1,
            },
            {
              name: 'Material Escolar',
              data: composicaoData.map(d => d.escolar),
              type: 'bar',
              stack: 'total',
              itemStyle: { color: '#6b9080' },
              barMaxWidth: 60,
              z: 0,
            },
            {
              name: 'Outros',
              data: composicaoData.map(d => d.outros),
              type: 'bar',
              stack: 'total',
              itemStyle: { color: '#7a7a7a' },
              barMaxWidth: 60,
              z: -1,
            },
          ],
        }

        try {
          chartComposicaoInstance.current.setOption(optionComposicao, true)
          setTimeout(() => {
            chartComposicaoInstance.current?.resize()
          }, 100)
        } catch (e) {
          console.error('Erro ao update composicao:', e)
        }
      }

      // Gráfico 2: Ranking por Unidade (Barras horizontais)
    if (chartRankingInstance.current) {
      const topRanking = rankingArray.slice(0, 8).reverse()

      // Calcular breakdown por categoria para cada unidade
      const rankingComBreakdown = topRanking.map(unit => {
        const unidadeDoacoes = doacoes.filter(d => d.unidade === unit.nome)
        return {
          ...unit,
          alimentos: unidadeDoacoes.filter(d => d.categoria === 'alimentos').reduce((s, d) => s + d.quantidade, 0),
          higiene: unidadeDoacoes.filter(d => d.categoria === 'higiene').reduce((s, d) => s + d.quantidade, 0),
          vestuario: unidadeDoacoes.filter(d => d.categoria === 'vestuario').reduce((s, d) => s + d.quantidade, 0),
          pet: unidadeDoacoes.filter(d => d.categoria === 'pet').reduce((s, d) => s + d.quantidade, 0),
          escolar: unidadeDoacoes.filter(d => d.categoria === 'escolar').reduce((s, d) => s + d.quantidade, 0),
          outros: unidadeDoacoes.filter(d => d.categoria === 'outros').reduce((s, d) => s + d.quantidade, 0),
        }
      })

      const optionRanking = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(13, 54, 52, 0.95)',
          borderColor: 'rgba(245, 206, 153, 0.2)',
          textStyle: { color: '#faf7f2' },
          formatter: (params) => {
            if (!params[0]) return ''
            const dataIndex = params[0].dataIndex
            const unit = rankingComBreakdown[dataIndex]

            // Array com categorias ordenadas por volume
            const categorias = [
              { nome: 'Alimentos', valor: unit.alimentos, cor: '#cca269' },
              { nome: 'Vestuário', valor: unit.vestuario, cor: '#a89e8b' },
              { nome: 'Higiene & Limpeza', valor: unit.higiene, cor: '#91baa3' },
              { nome: 'Pet/Ração', valor: unit.pet, cor: '#66563d' },
              { nome: 'Material Escolar', valor: unit.escolar, cor: '#6b9080' },
              { nome: 'Outros', valor: unit.outros, cor: '#7a7a7a' },
            ].sort((a, b) => b.valor - a.valor)

            let tooltip = `${params[0].axisValue}<br/>Total: <strong>${unit.total}</strong><br/><br/>`

            categorias.forEach(cat => {
              const pct = unit.total > 0 ? Math.round((cat.valor / unit.total) * 100) : 0
              tooltip += `<span style="color: ${cat.cor}">●</span> ${cat.nome}: <strong>${cat.valor}</strong> <span style="font-size: 11px; color: #999">（${pct}%）</span><br/>`
            })

            return tooltip
          }
        },
        grid: {
          left: '180px',
          right: '60px',
          bottom: '20px',
          top: '20px',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          axisLabel: { color: '#c4b5a0', fontSize: 11 },
          axisLine: { lineStyle: { color: 'rgba(245, 206, 153, 0.15)' } },
          splitLine: { lineStyle: { color: 'rgba(245, 206, 153, 0.1)' } },
        },
        yAxis: {
          type: 'category',
          data: rankingComBreakdown.map((r, i) => `${i + 1}º - ${r.nome}`),
          axisLabel: { color: '#c4b5a0', fontSize: 11 },
          axisLine: { lineStyle: { color: 'rgba(245, 206, 153, 0.15)' } },
        },
        series: [
          {
            data: rankingComBreakdown.map(r => r.total),
            type: 'bar',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                { offset: 0, color: '#91baa3' },
                { offset: 1, color: '#1a5653' },
              ]),
            },
            emphasis: { itemStyle: { color: '#cc9e69' } },
            barRadius: [0, 8, 8, 0],
            label: {
              show: true,
              position: 'right',
              color: '#faf7f2',
              fontSize: 11,
              formatter: '{c}',
            },
          },
        ],
      }

      chartRankingInstance.current.setOption(optionRanking, true)
      setTimeout(() => {
        chartRankingInstance.current?.resize()
      }, 100)
    }

    // Gráfico 4: Evolução da Arrecadação (Linha)
    if (chartEvolucaoInstance.current && evolucaoArray.length > 0) {
      const xAxisLabel = viewMode === 'diario' ? 'dia' : 'semana'
      const optionEvolucao = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          confine: true,
          backgroundColor: 'rgba(13, 54, 52, 0.95)',
          borderColor: 'rgba(245, 206, 153, 0.2)',
          textStyle: { color: '#faf7f2' },
          formatter: function(params) {
            if (!params || !params.length) return '';
            let html = `<strong style="font-size: 13px;">${params[0].axisValue}</strong><br/>`;
            let hasValue = false;
            params.forEach(item => {
              if (item.value > 0) {
                html += `<div style="display: flex; justify-content: space-between; gap: 16px; margin-top: 4px;"><span>${item.marker} ${item.seriesName}</span> <strong>${item.value}</strong></div>`;
                hasValue = true;
              }
            });
            if (!hasValue) html += `<div style="margin-top: 4px; color: #aaa;">Nenhum registro</div>`;
            return html;
          }
        },
        legend: {
          bottom: 0,
          left: 'center',
          textStyle: { color: '#f5ce99', fontSize: window.innerWidth < 768 ? 10 : 12, fontWeight: 600 },
          itemWidth: window.innerWidth < 768 ? 12 : 16,
          itemHeight: window.innerWidth < 768 ? 12 : 16,
          itemGap: window.innerWidth < 768 ? 10 : 18,
          icon: 'rect',
        },
        grid: {
          left: window.innerWidth < 768 ? '40px' : '60px',
          right: window.innerWidth < 768 ? '20px' : '40px',
          bottom: window.innerWidth < 768 ? '100px' : '110px',
          top: '20px',
          containLabel: false,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: evolucaoArray.map(d => d[xAxisLabel]),
          axisLabel: { color: '#c4b5a0', fontSize: 12 },
          axisLine: { lineStyle: { color: 'rgba(245, 206, 153, 0.15)' } },
          splitLine: { show: false },
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
            data: evolucaoArray.map(d => d.alimentos),
            type: 'line',
            smooth: true,
            lineStyle: { width: 3, color: '#cca269' },
            itemStyle: { color: '#cca269' },
            areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(204, 162, 105, 0.3)' },
              { offset: 1, color: 'rgba(204, 162, 105, 0.05)' },
            ]) },
          },
          {
            name: 'Higiene & Limpeza',
            data: evolucaoArray.map(d => d.higiene),
            type: 'line',
            smooth: true,
            lineStyle: { width: 3, color: '#91baa3' },
            itemStyle: { color: '#91baa3' },
            areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(145, 186, 163, 0.3)' },
              { offset: 1, color: 'rgba(145, 186, 163, 0.05)' },
            ]) },
          },
          {
            name: 'Vestuário',
            data: evolucaoArray.map(d => d.vestuario),
            type: 'line',
            smooth: true,
            lineStyle: { width: 3, color: '#a89e8b' },
            itemStyle: { color: '#a89e8b' },
            areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(168, 158, 139, 0.3)' },
              { offset: 1, color: 'rgba(168, 158, 139, 0.05)' },
            ]) },
          },
          {
            name: 'Pet/Ração',
            data: evolucaoArray.map(d => d.pet),
            type: 'line',
            smooth: true,
            lineStyle: { width: 3, color: '#66563d' },
            itemStyle: { color: '#66563d' },
            areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(102, 86, 61, 0.3)' },
              { offset: 1, color: 'rgba(102, 86, 61, 0.05)' },
            ]) },
          },
          {
            name: 'Material Escolar',
            data: evolucaoArray.map(d => d.escolar),
            type: 'line',
            smooth: true,
            lineStyle: { width: 3, color: '#6b9080' },
            itemStyle: { color: '#6b9080' },
            areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(107, 144, 128, 0.3)' },
              { offset: 1, color: 'rgba(107, 144, 128, 0.05)' },
            ]) },
          },
          {
            name: 'Outros',
            data: evolucaoArray.map(d => d.outros),
            type: 'line',
            smooth: true,
            lineStyle: { width: 3, color: '#7a7a7a' },
            itemStyle: { color: '#7a7a7a' },
            areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(122, 122, 122, 0.3)' },
              { offset: 1, color: 'rgba(122, 122, 122, 0.05)' },
            ]) },
          },
        ],
      }

      chartEvolucaoInstance.current.setOption(optionEvolucao, true)
      setTimeout(() => {
        chartEvolucaoInstance.current?.resize()
      }, 100)
    }
    } catch (error) {
      console.error('Erro na função updateCharts:', error)
    }
  }

  const totalGeral = Object.values(totais).reduce((a, b) => a + b, 0)

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-logo">
            <img src={ulbraLogo} alt="ULBRA" className="logo-img" />
          </div>
          <h1>MAIO SOLIDÁRIO 2026</h1>
          <p className="tagline">Toda a Rede Ulbra em uma só corrente</p>
        </div>
      </header>

      {/* Contexto */}
      <section className="contexto-section">
        <div className="container">
          <div className="contexto-box" onClick={() => setIsIntroExpanded(!isIntroExpanded)} style={{ cursor: 'pointer' }}>
            <p>
              O Maio Solidário 2026 é a campanha nacional de arrecadação da Rede Ulbra. Cada unidade é um ponto de coleta. Cada doação recebida é registrada, somada e entregue a quem ainda precisa.
            </p>
            {isIntroExpanded ? (
              <>
                <p>
                  Este painel existe para monitorar, em tempo real, tudo o que está sendo arrecadado em todas as unidades do país. Aqui você acompanha o volume por categoria, o desempenho de cada unidade e o total da rede.
                </p>
                <p>
                  <strong>Cada quilo, cada peça, cada item registrado neste painel chega na mesa de uma família. É por isso que toda doação importa.</strong>
                </p>
                <button className="ler-mais-btn" onClick={(e) => { e.stopPropagation(); setIsIntroExpanded(false); }}>Mostrar menos</button>
              </>
            ) : (
              <button className="ler-mais-btn" onClick={(e) => { e.stopPropagation(); setIsIntroExpanded(true); }}>Ler mais...</button>
            )}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="filter-bar">
        <div className="container">
          <div className="filter-mobile-toggle">
            <button className="filter-toggle-btn" onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}>
              {isFiltersExpanded ? '✕ Ocultar Filtros' : '⚙️ Filtros Avançados'}
            </button>
          </div>
          <div className={`filter-content ${isFiltersExpanded ? 'expanded' : ''}`}>
            <div className="filter-row">
            <div className="filter-group">
              <label>Unidade:</label>
              <select
                value={filters.unidade}
                onChange={(e) => setFilters(f => ({ ...f, unidade: e.target.value }))}
                className="filter-select"
              >
                <option value="">Todas</option>
                {unidadesDB.map(u => {
                  const dName = u.display_name && u.display_name.trim() !== '' ? u.display_name : u.name;
                  return <option key={u.id} value={dName}>{dName}</option>
                })}
              </select>
            </div>

            <div className="filter-group">
              <label>De:</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters(f => ({ ...f, dateFrom: e.target.value }))}
                className="filter-date"
              />
            </div>

            <div className="filter-group">
              <label>Até:</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters(f => ({ ...f, dateTo: e.target.value }))}
                className="filter-date"
              />
            </div>
          </div>


          <div className="filter-row">
            <span className="filter-label">Tipo de Unidade:</span>
            <div className="filter-chips">
              <button
                className={`chip ${filters.tipoUnidade === 'Todos' ? 'active' : ''}`}
                onClick={() => setFilters(f => ({ ...f, tipoUnidade: 'Todos' }))}
              >
                Todos
              </button>
              <button
                className={`chip ${filters.tipoUnidade === 'Escola' ? 'active' : ''}`}
                onClick={() => setFilters(f => ({ ...f, tipoUnidade: 'Escola' }))}
              >
                Escolas
              </button>
              <button
                className={`chip ${filters.tipoUnidade === 'Superior' ? 'active' : ''}`}
                onClick={() => setFilters(f => ({ ...f, tipoUnidade: 'Superior' }))}
              >
                Ensino Superior
              </button>
            </div>
          </div>

          <div className="filter-row">
            <span className="filter-label">Categoria:</span>
            <div className="filter-chips">
              <button
                className={`chip ${!filters.categoria ? 'active' : ''}`}
                onClick={() => setFilters(f => ({ ...f, categoria: '' }))}
              >
                Todos
              </button>
              {Object.entries(CATEGORIAS).map(([key, cat]) => (
                <button
                  key={key}
                  className={`chip ${filters.categoria === key ? 'active' : ''}`}
                  onClick={() => setFilters(f => ({ ...f, categoria: key }))}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setFilters({ unidade: '', tipoUnidade: 'Todos', categoria: '', dateFrom: '2026-04-01', dateTo: '2026-05-31' })}
              className="chip chip-reset"
              title="Resetar todos os filtros"
            >
              ↺ Resetar
            </button>
            <button
              className={`refresh-filter-btn ${isRefreshing ? 'loading' : ''}`}
              onClick={handleRefresh}
              disabled={isRefreshing}
              title="Atualizar dados"
            >
              ↻
            </button>
          </div>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="kpi-section">
        <div className="container">
          <h2><IconBoxesStacked /> Totais Arrecadados</h2>
          <div className="kpi-grid">
            {Object.entries(CATEGORIAS).map(([key, cat]) => {
              const Icon = cat.Icon
              return (
                <div key={key} className="kpi-card">
                  <div className="kpi-icon"><Icon /></div>
                  <div className="kpi-value">{totais[key]?.toLocaleString('pt-BR') || 0}</div>
                  <div className="kpi-label">{cat.label}</div>
                  <div className="kpi-unit">{cat.unidade}</div>
                </div>
              )
            })}
          </div>
          {/* Meta/Progress Card */}
          <div className="meta-card">
            <div className="meta-content">
              <div className="meta-info">
                <h3>Meta de Doações</h3>
                <div className="meta-stats">
                  <div>
                    <span className="meta-label">Total Arrecadado:</span>
                    <strong className="meta-value">{totalGeral.toLocaleString('pt-BR')}</strong>
                  </div>
                  <div>
                    <span className="meta-label">Meta:</span>
                    <strong className="meta-value">{Number(settings.meta_doacoes).toLocaleString('pt-BR')}</strong>
                  </div>
                </div>
              </div>
              <div className="meta-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${Math.min((totalGeral / settings.meta_doacoes) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="progress-text">
                  {Math.round((totalGeral / settings.meta_doacoes) * 100)}% da meta
                </div>
              </div>
            </div>
          </div>
          {/* Alert & CTA */}
          <div className="alert-cta-section">
            <div className="alert-cta-card">
              <div className="alert-line">
                <span className="alert-icon">⚠️</span>
                <span className="alert-text">Apenas {Math.round((totalGeral / settings.meta_doacoes) * 100)}% da meta</span>
                <span className="alert-sep">•</span>
                <span className="alert-text">Faltam ~{Math.max(settings.meta_doacoes - totalGeral, 0).toLocaleString('pt-BR')}</span>
                <span className="alert-sep">•</span>
                <span className="alert-text">
                  {(() => {
                    // Get current date in São Paulo timezone as YYYY-MM-DD
                    const hoje = new Date()
                    const hojeStr = new Date(hoje.getTime() - (hoje.getTimezoneOffset() * 60000))
                      .toISOString()
                      .split('T')[0]

                    // Parse as numbers for comparison
                    const [hojeYear, hojeMonth, hojeDay] = hojeStr.split('-').map(Number)
                    const fimDate = new Date(2026, 4, 31) // May 31, 2026 (month is 0-indexed)

                    // Calculate remaining days from today to May 31
                    const hoje_ms = new Date(hojeYear, hojeMonth - 1, hojeDay).getTime()
                    const fim_ms = fimDate.getTime()
                    const diasRestantes = Math.ceil((fim_ms - hoje_ms) / (1000 * 60 * 60 * 24))

                    return `${Math.max(diasRestantes, 0)} dias restantes`
                  })()}
                </span>
              </div>
              <button
                onClick={() => {
                  const url = window.location.href
                  navigator.clipboard.writeText(url)
                  alert('Link do dashboard copiado!')
                }}
                className="alert-cta-btn"
              >
                🔗 Compartilhar Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabela Ranking - Desempenho Detalhado */}
      <section className="ranking-section">
        <div className="container">
          <h2><IconRankingStar /> Desempenho das Unidades</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th className="pos">Posição</th>
                  <th className="nome">Unidade</th>
                  <th className="total">Doações</th>
                  <th className="categoria">Categoria Principal</th>
                </tr>
              </thead>
              <tbody>
                {ranking
                  .slice((rankingPage - 1) * 5, rankingPage * 5)
                  .map((unit, idx) => {
                    const absoluteIdx = (rankingPage - 1) * 5 + idx
                    const isExpanded = expandedUnit === unit.nome
                    const unidadeDoacoes = filteredDoacoes.filter(d => d.unidade === unit.nome)
                    const breakdown = {
                      alimentos: unidadeDoacoes.filter(d => d.categoria === 'alimentos').reduce((s, d) => s + d.quantidade, 0),
                      higiene: unidadeDoacoes.filter(d => d.categoria === 'higiene').reduce((s, d) => s + d.quantidade, 0),
                      vestuario: unidadeDoacoes.filter(d => d.categoria === 'vestuario').reduce((s, d) => s + d.quantidade, 0),
                      pet: unidadeDoacoes.filter(d => d.categoria === 'pet').reduce((s, d) => s + d.quantidade, 0),
                      escolar: unidadeDoacoes.filter(d => d.categoria === 'escolar').reduce((s, d) => s + d.quantidade, 0),
                      outros: unidadeDoacoes.filter(d => d.categoria === 'outros').reduce((s, d) => s + d.quantidade, 0),
                    }

                    return (
                      <Fragment key={unit.nome}>
                        <tr onClick={() => setExpandedUnit(isExpanded ? null : unit.nome)} style={{ cursor: 'pointer' }}>
                          <td className="pos">
                            <span className="posicao-badge">{absoluteIdx + 1}º</span>
                          </td>
                          <td className="nome">{unit.nome}</td>
                          <td className="total">
                            <strong>{unit.registros}</strong> doação{unit.registros !== 1 ? 's' : ''}
                          </td>
                          <td className="categoria">
                            <span className="categoria-badge">
                              {(() => {
                                const Icon = CATEGORIAS[unit.categoria]?.Icon
                                return Icon ? <Icon /> : null
                              })()}
                              {CATEGORIAS[unit.categoria]?.label}
                            </span>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="expanded-row">
                            <td colSpan="4">
                              <div className="breakdown-container">
                                <div className="breakdown-title">{unit.nome} - Detalhamento</div>
                                <div className="breakdown-items">
                                  {[
                                    { nome: 'Alimentos', valor: breakdown.alimentos, cor: '#cca269' },
                                    { nome: 'Vestuário', valor: breakdown.vestuario, cor: '#a89e8b' },
                                    { nome: 'Higiene & Limpeza', valor: breakdown.higiene, cor: '#91baa3' },
                                    { nome: 'Pet/Ração', valor: breakdown.pet, cor: '#66563d' },
                                    { nome: 'Material Escolar', valor: breakdown.escolar, cor: '#6b9080' },
                                    { nome: 'Outros', valor: breakdown.outros, cor: '#7a7a7a' },
                                  ]
                                    .filter(item => item.valor > 0)
                                    .sort((a, b) => b.valor - a.valor)
                                    .map(item => {
                                      const pct = unit.total > 0 ? Math.round((item.valor / unit.total) * 100) : 0
                                      return (
                                        <div key={item.nome} className="breakdown-item">
                                          <span className="breakdown-dot" style={{ color: item.cor }}>●</span>
                                          <span className="breakdown-name">{item.nome}:</span>
                                          <span className="breakdown-value">{item.valor}</span>
                                          <span className="breakdown-pct">({pct}%)</span>
                                        </div>
                                      )
                                    })}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    )
                  })}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          <div className="pagination">
            <button
              onClick={() => setRankingPage(Math.max(1, rankingPage - 1))}
              disabled={rankingPage === 1}
              className="pagination-btn"
            >
              ← Anterior
            </button>
            <span className="pagination-info">
              Página {rankingPage} de {Math.ceil(ranking.length / 5)}
            </span>
            <button
              onClick={() => setRankingPage(rankingPage + 1)}
              disabled={rankingPage >= Math.ceil(ranking.length / 5)}
              className="pagination-btn"
            >
              Próxima →
            </button>
          </div>
        </div>
      </section>

      {/* Gráficos de Análise */}
      <section className="charts-section">
        <div className="container">
          {/* Gráfico 2 (full width) - Evolução - PRIORIDADE 2: MOMENTUM da campanha */}
          <div className="chart-card chart-card-full">
            <div className="chart-header">
              <h3><IconChartColumn /> Evolução da Arrecadação</h3>

            </div>
            <div ref={chartEvolucaoRef} className="echarts-container" style={{ minHeight: '400px', width: '100%' }}></div>
          </div>

          {/* Gráfico - Composição por Unidade (Top 8) */}
          <div className="chart-card chart-card-full">
            <div className="chart-header">
              <h3><IconChartColumn /> Composição por Unidade (Top {window.innerWidth < 768 ? 5 : 10})</h3>
              <div className="chart-toggle">
                <button
                  className={`toggle-btn ${filters.tipoUnidade === 'Todos' ? 'active' : ''}`}
                  onClick={() => setFilters(f => ({ ...f, tipoUnidade: 'Todos' }))}
                >
                  Todos
                </button>
                <button
                  className={`toggle-btn ${filters.tipoUnidade === 'Escola' ? 'active' : ''}`}
                  onClick={() => setFilters(f => ({ ...f, tipoUnidade: 'Escola' }))}
                >
                  Escolas
                </button>
                <button
                  className={`toggle-btn ${filters.tipoUnidade === 'Superior' ? 'active' : ''}`}
                  onClick={() => setFilters(f => ({ ...f, tipoUnidade: 'Superior' }))}
                >
                  Ensino Superior
                </button>
              </div>
            </div>
            <div ref={chartComposicaoRef} className="echarts-container" style={{ minHeight: '400px', width: '100%' }}></div>
          </div>
        </div>
      </section>

      {/* Feed */}
      <section className="feed-section">
        <div className="container">
          <h2><IconClipboardList /> Últimas Doações Registradas</h2>
          <div className="feed-list">
            {ultimasDoacoes.map(doacao => {
              const Icon = CATEGORIAS[doacao.categoria]?.Icon
              return (
                <div key={doacao.id} className="feed-item">
                  <div className="feed-icon">{Icon && <Icon />}</div>
                  <div className="feed-content">
                  <div className="feed-main">
                    <strong>{doacao.unidade}</strong>
                    {' → '}
                    <span className="feed-qty">{doacao.quantidade} {CATEGORIAS[doacao.categoria]?.unidade}</span>
                    {' '}
                    <span className="feed-category">{CATEGORIAS[doacao.categoria]?.label}</span>
                  </div>
                    <div className="feed-meta">
                      {doacao.descricao && <span className="feed-desc">({doacao.descricao})</span>}
                      <span className="feed-data">
                        {(() => {
                          const day = new Date(doacao.data + 'T00:00:00').getDate()
                          if (day <= 10) return 'Semana 1'
                          if (day <= 17) return 'Semana 2'
                          if (day <= 24) return 'Semana 3'
                          return 'Semana 4'
                        })()}
                      </span>
                    </div>
                </div>
              </div>
            )
            })}
          </div>
        </div>
      </section>

      {/* Tabela de Auditoria */}
      <section className="audit-section">
        <div className="container">
          <h2><IconClipboardList /> Registro Completo de Doações</h2>
          <div className="table-wrapper audit-table-wrapper">
            <table className="audit-table">
              <thead>
                <tr>
                  <th>Semana</th>
                  <th>Unidade</th>
                  <th>Categoria</th>
                  <th>Quantidade</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoacoes
                  .sort((a, b) => new Date(`${b.data}T${b.timestamp}`) - new Date(`${a.data}T${a.timestamp}`))
                  .slice((auditPage - 1) * 10, auditPage * 10)
                  .map(doacao => (
                    <tr key={doacao.id}>
                      <td className="data">
                        {(() => {
                          const day = new Date(doacao.data + 'T00:00:00').getDate()
                          if (day <= 10) return 'Semana 1'
                          if (day <= 17) return 'Semana 2'
                          if (day <= 24) return 'Semana 3'
                          return 'Semana 4'
                        })()}
                      </td>
                      <td className="unidade">{doacao.unidade}</td>
                      <td className="categoria">
                        <span className="cat-badge" style={{ borderColor: CATEGORIAS[doacao.categoria]?.color }}>
                          {CATEGORIAS[doacao.categoria]?.label}
                        </span>
                      </td>
                      <td className="quantidade">
                        <strong>{doacao.quantidade}</strong> {CATEGORIAS[doacao.categoria]?.unidade}
                      </td>
                      <td className="descricao">{doacao.descricao}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="audit-summary">
            <span className="summary-label">Total de registros:</span>
            <strong className="summary-value">{filteredDoacoes.length}</strong>
          </div>

          {/* Paginação */}
          <div className="pagination">
            <button
              onClick={() => setAuditPage(Math.max(1, auditPage - 1))}
              disabled={auditPage === 1}
              className="pagination-btn"
            >
              ← Anterior
            </button>
            <span className="pagination-info">
              Página {auditPage} de {Math.ceil(filteredDoacoes.length / 10)}
            </span>
            <button
              onClick={() => setAuditPage(auditPage + 1)}
              disabled={auditPage >= Math.ceil(filteredDoacoes.length / 10)}
              className="pagination-btn"
            >
              Próxima →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>Cada doação registrada neste painel chegará na mesa de uma família.</p>
      </footer>
    </div>
  )
}
