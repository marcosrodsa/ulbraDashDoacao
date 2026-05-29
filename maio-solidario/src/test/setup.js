import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

// Garante isolamento entre testes: desmonta o DOM renderizado após cada teste.
afterEach(() => {
  cleanup()
})
