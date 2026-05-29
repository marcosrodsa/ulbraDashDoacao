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
