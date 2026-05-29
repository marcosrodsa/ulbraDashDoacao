import { describe, it, expect } from 'vitest'
import { CATEGORIAS, SEMANAS, getCategoriaLabel, getSemanaLabel } from './cadastroConstants'

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

  it('getSemanaLabel devolve o label da semana', () => {
    expect(getSemanaLabel('2026-05-11')).toBe('Semana 2 (11/05 a 17/05)')
  })

  it('getSemanaLabel devolve a própria data quando desconhecida', () => {
    expect(getSemanaLabel('2026-12-25')).toBe('2026-12-25')
  })
})
