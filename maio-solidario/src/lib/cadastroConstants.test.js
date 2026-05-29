import { describe, it, expect } from 'vitest'
import { CATEGORIAS, SEMANAS, getCategoriaLabel, getSemanaLabel, getSemanaNumero } from './cadastroConstants'

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

  // A semana é uma FAIXA de dias do mês (mesma regra do Dashboard groupByWeek):
  // 1-10 → S1, 11-17 → S2, 18-24 → S3, 25-31 → S4.
  it('getSemanaNumero mapeia o dia do mês para o número da semana (faixas)', () => {
    expect(getSemanaNumero('2026-05-01')).toBe(1)
    expect(getSemanaNumero('2026-05-05')).toBe(1)
    expect(getSemanaNumero('2026-05-10')).toBe(1)
    expect(getSemanaNumero('2026-05-11')).toBe(2)
    expect(getSemanaNumero('2026-05-17')).toBe(2)
    expect(getSemanaNumero('2026-05-18')).toBe(3)
    expect(getSemanaNumero('2026-05-24')).toBe(3)
    expect(getSemanaNumero('2026-05-25')).toBe(4)
    expect(getSemanaNumero('2026-05-31')).toBe(4)
  })

  it('getSemanaNumero devolve null quando a data é vazia/inválida', () => {
    expect(getSemanaNumero('')).toBeNull()
    expect(getSemanaNumero(null)).toBeNull()
  })

  it('getSemanaLabel devolve o label da semana pela faixa do dia', () => {
    expect(getSemanaLabel('2026-05-11')).toBe('Semana 2 (11/05 a 17/05)')
    // data no meio da semana 1 (não é a data inicial) ainda mapeia para Semana 1
    expect(getSemanaLabel('2026-05-05')).toBe('Semana 1 (01/05 a 10/05)')
    expect(getSemanaLabel('2026-05-31')).toBe('Semana 4 (25/05 a 31/05)')
  })

  it('getSemanaLabel devolve a própria data quando vazia/inválida', () => {
    expect(getSemanaLabel('')).toBe('')
  })
})
