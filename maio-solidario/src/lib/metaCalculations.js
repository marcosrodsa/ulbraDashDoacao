/**
 * Calcula a projeção de quando a meta de doações será atingida
 * @param {Object} params
 * @param {number} params.doacoesRegistradas - Quantidade total de doações registradas
 * @param {number} params.metaTotal - Meta total de doações (e.g., 500)
 * @param {string} params.dataInicio - Data de início no formato YYYY-MM-DD
 * @param {string} params.dataFim - Data final no formato YYYY-MM-DD
 * @returns {Object} Objeto com projeção de ETA, dias restantes, etc
 */
export function calculateMetaProjection({ doacoesRegistradas, metaTotal, dataInicio, dataFim }) {
  // Validações básicas
  if (!doacoesRegistradas || !metaTotal || !dataInicio || !dataFim) {
    return getSafeDefaults()
  }

  try {
    const inicio = new Date(dataInicio)
    const fim = new Date(dataFim)
    const hoje = new Date()

    // Resetar horas para comparação correta de datas
    inicio.setHours(0, 0, 0, 0)
    fim.setHours(0, 0, 0, 0)
    hoje.setHours(0, 0, 0, 0)

    // Calcular dias decorridos e totais
    const diasTotais = Math.floor((fim - inicio) / (1000 * 60 * 60 * 24)) + 1 // +1 para incluir o primeiro dia
    const diasDecorridos = Math.floor((hoje - inicio) / (1000 * 60 * 60 * 24)) + 1
    const diasRestantes = Math.max(0, diasTotais - diasDecorridos)

    // Calcular ritmo (doações por dia)
    const ritmo = diasDecorridos > 0 ? doacoesRegistradas / diasDecorridos : 0

    // Se ritmo for 0, retornar defaults
    if (ritmo === 0) {
      return getSafeDefaults()
    }

    // Calcular dias até atingir meta
    const diasAteAtingirMeta = Math.ceil(metaTotal / ritmo)

    // Calcular data ETA (data em que atingirá a meta)
    const dataETA = new Date(inicio)
    dataETA.setDate(dataETA.getDate() + diasAteAtingirMeta - 1) // -1 porque dia 1 é o dia inicial

    // Verificar se atingirá até o fim da campanha
    const atingiraAteOFim = dataETA <= fim

    // Calcular percentual projetado (quanto % da meta será atingido até o final)
    const percentualProjetado = Math.min(100, Math.round((ritmo * diasTotais / metaTotal) * 100))

    // Percentual final (baseado no que projetamos atingir)
    const percentualFinal = Math.round((Math.min(ritmo * diasTotais, metaTotal) / metaTotal) * 100)

    // Formatar data ETA para exibição
    const diacalculoETAFormatado = formatarDataBR(dataETA)

    return {
      diasDecorridos,
      diasTotais,
      diasRestantes,
      ritmo: Math.round(ritmo * 100) / 100, // Arredondar para 2 casas decimais
      dataETA,
      atingiraAteOFim,
      percentualProjetado,
      percentualFinal,
      diacalculoETAFormatado,
      doacoesAteOFim: Math.round(ritmo * diasTotais),
    }
  } catch (error) {
    console.error('Erro ao calcular meta projection:', error)
    return getSafeDefaults()
  }
}

/**
 * Retorna valores seguros padrão quando ocorre erro ou ritmo = 0
 * @returns {Object}
 */
function getSafeDefaults() {
  return {
    diasDecorridos: 0,
    diasTotais: 0,
    diasRestantes: 0,
    ritmo: 0,
    dataETA: null,
    atingiraAteOFim: false,
    percentualProjetado: 0,
    percentualFinal: 0,
    diacalculoETAFormatado: 'N/A',
    doacoesAteOFim: 0,
  }
}

/**
 * Formata uma data para o padrão brasileiro (DD/MM)
 * @param {Date} data
 * @returns {string} Data formatada como "DD/MM"
 */
export function formatarDataBR(data) {
  if (!data || !(data instanceof Date)) {
    return 'N/A'
  }
  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  return `${dia}/${mes}`
}

/**
 * Formata uma data completa para o padrão brasileiro (DD/MM/YYYY)
 * @param {Date} data
 * @returns {string} Data formatada como "DD/MM/YYYY"
 */
export function formatarDataBRCompleta(data) {
  if (!data || !(data instanceof Date)) {
    return 'N/A'
  }
  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const ano = data.getFullYear()
  return `${dia}/${mes}/${ano}`
}

/**
 * Calcula a diferença em dias entre duas datas
 * @param {Date|string} data1
 * @param {Date|string} data2
 * @returns {number} Diferença em dias
 */
export function calcularDiasEntre(data1, data2) {
  try {
    const d1 = data1 instanceof Date ? data1 : new Date(data1)
    const d2 = data2 instanceof Date ? data2 : new Date(data2)
    d1.setHours(0, 0, 0, 0)
    d2.setHours(0, 0, 0, 0)
    return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24))
  } catch (error) {
    console.error('Erro ao calcular dias entre:', error)
    return 0
  }
}

/**
 * Calcula quantos dias faltam para uma data específica
 * @param {Date|string} data
 * @returns {number} Dias restantes (negativo se a data já passou)
 */
export function diasAteData(data) {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  return calcularDiasEntre(hoje, data)
}
