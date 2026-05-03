# Design: Dashboard Maio Solidário — Enhancements 2026

**Data:** 2026-05-03  
**Escopo:** Loading/Empty states, Projeção de Meta inteligente, Heatmap unidade×categoria, Trending de categorias, otimização de layout para UX/BI coerente  
**Status:** Aprovado

---

## 1. Visão Geral

Adicionar camadas de contexto (loading, empty states) e insights acionáveis (projeção, trending, heatmap) ao dashboard existente, mantendo uma estrutura **scannable** que priorize decisões rápidas.

O dashboard será reorganizado em **3 seções horizontais**:
1. **PULSE** — Resumo executivo (above fold)
2. **ANALYSIS** — Gráficos acionáveis
3. **DEEP DIVE** — Auditoria e detalhes

---

## 2. Componentes Novos

### 2.1 Loading States

**Aplicado a:**
- KPI Cards (skeleton cards 200x100px, pulsando)
- Meta Card (skeleton bar + text)
- Todos os gráficos (spinner centralizado + background)
- Trending badges (3 skeleton pills)
- Ranking table (skeleton rows)

**Comportamento:**
- Mostra enquanto `loading === true`
- Transição suave fade-out quando dados chegam
- Não bloqueia interação com filtros

**Implementação:**
```jsx
<Skeleton width={200} height={100} variant="rounded" animation="pulse" />
```

---

### 2.2 Empty States

**Cenários:**
1. **Sem doações no filtro:** "📭 Nenhuma doação para este filtro"
2. **Meta não configurada:** "⚙️ Meta não configurada. [Acessar configurações]"
3. **Sem dados da semana:** "📊 Sem dados para calcular trending"

**Padrão:**
```
┌─────────────────────────┐
│   [Ícone grande]        │
│   Título do cenário     │
│   Descrição curta       │
│   [CTA primário]        │
└─────────────────────────┘
```

---

### 2.3 Projeção de Meta Dinâmica

**Card expandido "Meta de Doações":**

```
┌─ Meta de Doações ────────────────────┐
│ Registradas: 127 / Meta: 500         │
│ ████████░░░░░ 25% | +3 doações/dia  │
│                                      │
│ 📊 Projeção:                         │
│ ✅ Atingirá 500 em 28/05             │
│    (5 dias antes do fim)             │
│                                      │
│ Ou se ritmo cair 20%:                │
│ ⚠️  Atingirá apenas ~400 (80%)        │
└──────────────────────────────────────┘
```

**Lógica:**
```js
const diasRestantes = new Date('2026-05-31') - new Date();
const doacoesRestantes = META - doacoesRegistradas;
const ritmo = doacoesRegistradas / diasDecorridos;
const dataETA = new Date() + (doacoesRestantes / ritmo);

// Mensagem:
- Se dataETA <= 2026-05-31: "✅ Atingirá X em DD/MM"
- Se dataETA > 2026-05-31: "⚠️  Atingirá apenas X (%)
```

**Configuração:**
- Meta é **configurável** via painel admin em `/cadastro`
- Campo input numérico + botão "Salvar"
- Persiste em Supabase (nova tabela `campaign_settings`)

---

### 2.4 Heatmap Unidade × Categoria

**Localização:** Card "Composição por Unidade" com toggle

**Modo Barras (padrão):**
- Gráfico de barras empilhadas (stacked)
- Eixo X: Top 8 unidades
- Eixo Y: Quantidade
- Cores: alimentos (#cca269), higiene (#91baa3), vestuário (#a89e8b), pet (#66563d)

**Modo Heatmap (toggle):**
- Matriz visual 8×4 (unidades × categorias)
- Cores: branco (0) → vermelho (máx)
- Cells clicáveis → drill-down (filtro dinâmico)
- Legend: escala de cores
- Sem valores dentro das cells (apenas cor)

**Implementação:**
```jsx
const [composicaoMode, setComposicaoMode] = useState('barras'); // 'barras' | 'heatmap'

// ECharts config muda conforme mode
// Heatmap usa: echarts.visualMap + heatmap series
```

---

### 2.5 Trending de Categorias

**Card "🔥 Trending Agora":**

```
┌─ 🔥 Trending Agora ────────────────┐
│ [🥫 Alimentos ↑32%]                │
│ [👕 Vestuário ↑18%]                │
│ [🧼 Higiene ↑12%]                  │
│ (vs semana anterior)               │
└────────────────────────────────────┘
```

**Lógica:**
```js
const weekAgo = new Date() - 7 days;
const thisWeek = filteredDoacoes.filter(d => d.data >= weekAgo);
const lastWeek = filteredDoacoes.filter(d => d.data < weekAgo && d.data >= weekAgo - 7);

const trending = CATEGORIAS.map(cat => ({
  label: cat.label,
  icon: cat.icon,
  thisWeekTotal: thisWeek.filter(d => d.categoria === cat.key).sum,
  lastWeekTotal: lastWeek.filter(d => d.categoria === cat.key).sum,
  crescimento: ((thisWeekTotal - lastWeekTotal) / lastWeekTotal * 100)
})).sort((a, b) => b.crescimento - a.crescimento);

// Exibir top 3
```

**Empty state:**
- Se não há dados de semana passada: "📊 Sem dados para comparação"

---

## 3. Reorganização do Layout

### Desktop (1200px+)

**PULSE:**
```
[Contexto — colapsável]
[Filtros — 1 linha]
┌─ KPIs 2×2 ─────────────┬─ Meta Card ──────┐
│ (4 cards)              │ (expandido)      │
└────────────────────────┴──────────────────┘
┌─ Trending (3 badges, inline) ──────────────┐
└───────────────────────────────────────────┘
```

**ANALYSIS:**
```
┌─ Composição (barras/heatmap toggle) ──────┐
│ [width: 100%, height: 420px]              │
└───────────────────────────────────────────┘

┌─ Evolução (linha) ─────────────────────────┐
│ [width: 100%, height: 420px]              │
└───────────────────────────────────────────┘

┌─ Ranking (tabela) ─────────────────────────┐
│ [width: 100%, max-height: 500px]          │
└───────────────────────────────────────────┘
```

**DEEP DIVE:**
```
┌─ Últimas Doações (feed) ──────────────────┐
│ [width: 100%, max-height: 400px]          │
└───────────────────────────────────────────┘

┌─ Auditoria (tabela) ──────────────────────┐
│ [width: 100%, paginada]                   │
└───────────────────────────────────────────┘
```

### Mobile (480px)

```
[Contexto — colapsável]
[Filtros — stack vertical]
[KPIs — 1 coluna, altura adaptativa]
[Meta — compacto]
[Trending — stack vertical]
[Composição — 100% width, scroll se necessário]
[Evolução — 100% width]
[Ranking — scroll horizontal, responsivo]
[Últimas Doações — stack]
[Auditoria — scroll horizontal]
```

---

## 4. Fonte de Dados

### Tabela Nova: `campaign_settings` (Supabase)

```sql
CREATE TABLE campaign_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_name VARCHAR(255),
  meta_doacoes INT DEFAULT 500,
  data_inicio DATE DEFAULT CURRENT_DATE,
  data_fim DATE DEFAULT CURRENT_DATE + INTERVAL '1 month',
  created_by UUID,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Queries Ajustadas

**Trending:**
```sql
SELECT 
  categoria,
  SUM(quantidade) as total,
  SUM(CASE WHEN data >= NOW() - INTERVAL '7 days' THEN quantidade ELSE 0 END) as this_week
FROM donations
WHERE data <= NOW()
GROUP BY categoria
ORDER BY crescimento DESC
LIMIT 3;
```

**Projeção:**
```sql
SELECT COUNT(*) as total_doacoes, MAX(created_at) as ultima_doacao
FROM donations
WHERE data >= CURRENT_DATE;
```

---

## 5. Fluxos de Interação

### Admin: Configurar Meta

1. Acessa `/cadastro`
2. Scroll até "Configurações da Campanha"
3. Vê campo "Meta de Doações: [500]"
4. Muda para "750"
5. Clica "Salvar"
6. Toast: "✅ Meta atualizada para 750"
7. Dashboard recarrega e recalcula tudo

### Usuário: Explorar Heatmap

1. Scroll até "Composição por Unidade"
2. Vê barras stacked
3. Clica em "[Heatmap]"
4. Barras viram matriz cores
5. Clica em um cell (ex: Porto Alegre × Alimentos)
6. Filtro atualiza: `unidade=porto-alegre&categoria=alimentos`
7. Todo dashboard refiltra em tempo real

### Usuário: Verificar Trending

1. Lê "🔥 Alimentos ↑32%"
2. Curiosidade: clica no badge
3. Filtro dinâmico: mostra apenas Alimentos desta semana
4. Compara visualmente com semana anterior
5. Volta atrás clicando "Limpar filtros"

---

## 6. Estados e Transições

```
[Carregando]
  → Skeleton + Loading spinner
  → [Dados chegam]
    → Fade-out skeleton
    → Fade-in dados
    → [Usuário filtra]
      → [Carregando] (novamente)
      → [Dados chegam]
        → [Sem dados no filtro?]
          → Mostra Empty State
        → [Com dados?]
          → Mostra gráficos/tabelas

[Erro na API]
  → Toast: "Erro ao carregar dados"
  → Skeleton permanece (retry automático ou manual)
```

---

## 7. Responsividade

| Breakpoint | Ajustes |
|------------|---------|
| 1200px+ | Layout 2/3 colunas, cards lado a lado |
| 768px-1199px | 1 coluna, cards full width, fontes reduzidas |
| < 768px | Stack vertical, gráficos 100% width, tabelas scroll horizontal |

---

## 8. Acessibilidade & UX

- **Cores:** Contraste WCAG AA em trending badges
- **Tooltips:** "Crescimento % vs semana anterior"
- **Kbd:** Usuários podem navegar filtros com Tab/Enter
- **Aria Labels:** `aria-label="Heatmap: unidade × categoria"`
- **Mobile:** Sem hover-only interactions, tudo clicável

---

## 9. Próximas Etapas

1. ✅ Design aprovado
2. → Escrever Implementation Plan (writing-plans)
3. → Codificar componentes (Loading, Empty, Heatmap, Trending, Meta)
4. → Integrar Supabase `campaign_settings`
5. → Testes mobile
6. → Deploy

---

**Fim do Design Doc**
