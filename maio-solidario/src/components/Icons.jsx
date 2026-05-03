// Ícones no estilo ULBRA Design System (viewBox 0 0 24 24)

export function IconFood() {
  return (
    <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Prato com garfo e faca */}
      <circle cx="12" cy="12" r="8"/>
      <path d="M5 12h14"/>
      <path d="M12 5v14"/>
      {/* Garfo à esquerda */}
      <path d="M8 3v4"/>
      <circle cx="7" cy="8" r="0.8" fill="currentColor"/>
      <circle cx="8.5" cy="8" r="0.8" fill="currentColor"/>
      <circle cx="9" cy="8" r="0.8" fill="currentColor"/>
      {/* Faca à direita */}
      <path d="M16 3v5"/>
      <path d="M16 8l-1 2l1 2"/>
    </svg>
  )
}

export function IconCleanliness() {
  return (
    <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Mão lavando com água/sabão */}
      <path d="M5 10c0-2 1-4 3-5"/>
      <path d="M8 5h6v10H8z"/>
      <path d="M10 5v-2"/>
      <path d="M12 5v-2"/>
      <path d="M14 5v-2"/>
      <path d="M16 6v3"/>
      <circle cx="5" cy="8" r="1.5" fill="currentColor"/>
      <circle cx="4" cy="11" r="1" fill="currentColor"/>
      <path d="M8 15h8"/>
      <path d="M8 18h8"/>
    </svg>
  )
}

export function IconApparel() {
  return (
    <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Cabideiro com roupas */}
      <path d="M6 4h12"/>
      <path d="M8 4v2"/>
      <path d="M12 4v2"/>
      <path d="M16 4v2"/>
      {/* Camiseta pendurada */}
      <path d="M8 6h8v12H8z"/>
      <path d="M8 9h8"/>
      <path d="M10 6v3"/>
      <path d="M14 6v3"/>
      <path d="M11 10h2v8h-2z"/>
    </svg>
  )
}

export function IconPetCare() {
  return (
    <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Tigela de ração + patas */}
      <ellipse cx="12" cy="14" rx="6" ry="4"/>
      <path d="M6 14h12"/>
      {/* Patas ao redor */}
      <circle cx="5" cy="18" r="1.5" fill="currentColor"/>
      <circle cx="9" cy="19" r="1.5" fill="currentColor"/>
      <circle cx="15" cy="19" r="1.5" fill="currentColor"/>
      <circle cx="19" cy="18" r="1.5" fill="currentColor"/>
      {/* Ração dentro */}
      <circle cx="10" cy="13" r="1" fill="currentColor"/>
      <circle cx="12" cy="14" r="1" fill="currentColor"/>
      <circle cx="14" cy="13" r="1" fill="currentColor"/>
    </svg>
  )
}

export function IconBuscar() {
  return (
    <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  )
}

export function IconConcluido() {
  return (
    <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  )
}

export function IconAviso() {
  return (
    <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 8v4M12 16h.01"/>
    </svg>
  )
}

export function IconAtualizar() {
  return (
    <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
      <path d="M3 21v-5h5"/>
    </svg>
  )
}

// Estilos inline para todos os ícones
export const iconStyles = `
  .icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    vertical-align: -0.125em;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`
