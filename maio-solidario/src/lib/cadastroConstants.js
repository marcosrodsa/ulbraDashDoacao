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

// A semana da campanha é uma FAIXA de dias do mês (mesma regra do Dashboard
// groupByWeek): 1-10 → S1, 11-17 → S2, 18-24 → S3, 25-31 → S4.
// donation_date guarda a data real (qualquer dia de maio), não só a data inicial
// da semana — por isso comparamos pela faixa, não por igualdade exata.
export function getSemanaNumero(date) {
  if (!date) return null
  const day = parseInt(String(date).slice(8, 10), 10)
  if (Number.isNaN(day)) return null
  if (day <= 10) return 1
  if (day <= 17) return 2
  if (day <= 24) return 3
  return 4
}

export function getSemanaLabel(date) {
  const numero = getSemanaNumero(date)
  if (!numero) return date
  return SEMANAS[numero - 1].label
}
