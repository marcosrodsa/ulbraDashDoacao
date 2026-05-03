# Design: Dashboard Maio Solidário 2026

**Data:** 2026-05-02  
**Objetivo:** Monitorar em tempo real o volume de doações nacionais, categorizar por tipo de suprimento e listar o desempenho das unidades para incentivar engajamento sem foco em premiação, mas sim em impacto social.

---

## 1. Visão Geral

O **Maio Solidário** é a campanha nacional de arrecadação da Rede ULBRA. Cada unidade é um ponto de coleta, cada doação registrada é somada e entregue a quem precisa.

Este projeto consiste em **três componentes**:

1. **Formulário de Cadastro** (`/cadastro`) — registro de doações (oculto, sem links públicos)
2. **Dashboard Público** (`/dashboard`) — visualização de métricas e ranking
3. **Integração Supabase** — persistência de dados

---

## 2. Contexto e Copy

### Campanha
**CAMPANHA MAIO SOLIDÁRIO ULBRA**  
*Toda a Rede Ulbra em uma só corrente*

### Bloco de Contexto (exibido no dashboard)
> Em maio de 2024, a enchente do Rio Grande do Sul tirou a casa, a comida e o chão de milhares de famílias gaúchas. Dois anos depois, a reconstrução continua.
>
> O Maio Solidário 2026 é a campanha nacional de arrecadação da Rede Ulbra. Cada unidade é um ponto de coleta. Cada doação recebida é registrada, somada e entregue a quem ainda precisa.
>
> Este painel existe para monitorar, em tempo real, tudo o que está sendo arrecadado em todas as unidades do país. Aqui você acompanha o volume por categoria, o desempenho de cada unidade e o total da rede.
>
> Cada quilo, cada peça, cada item registrado neste painel chega na mesa de uma família. É por isso que toda doação importa.

---

## 3. Estrutura de Dados

### Tabela: `doacoes` (Supabase)

```sql
CREATE TABLE doacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unidade_id UUID NOT NULL REFERENCES unidades(id),
  categoria VARCHAR(20) NOT NULL CHECK (categoria IN ('alimentos', 'higiene', 'vestuario', 'pet')),
  quantidade DECIMAL(10, 2) NOT NULL,
  descricao TEXT,
  data_cadastro DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Tabela: `unidades` (já existente)
Esperado: `id`, `nome`, `estado`, etc.

### Enum: Categorias
- `alimentos` — Alimentos não perecíveis (unidade: kg)
- `higiene` — Higiene pessoal e limpeza (unidade: itens/kits)
- `vestuario` — Roupas e calçados (unidade: peças/fardos)
- `pet` — Ração para cães e gatos (unidade: kg)

---

## 4. Páginas e Interfaces

### 4.1 Página: `/cadastro` (Formulário de Doações)

**Rota:** `/cadastro`  
**Visibilidade:** Oculta (sem links públicos, mas acessível via URL direta)  
**Componentes do Brand Book:** Container, FormGroup, Label, Input, Button, Alert

**Layout:**

```
┌─────────────────────────────────────┐
│  MAIO SOLIDÁRIO - CADASTRO          │
├─────────────────────────────────────┤
│                                     │
│  📝 Registre uma doação             │
│  Seu impacto é registrado em tempo  │
│  real no painel da campanha.        │
│                                     │
│  Unidade *                          │
│  [Select: dropdown com unidades]    │
│                                     │
│  Categoria *                        │
│  ○ 🥫 Alimentos                     │
│  ○ 🧼 Higiene & Limpeza            │
│  ○ 👕 Vestuário                    │
│  ○ 🐾 Pet/Ração                    │
│                                     │
│  Quantidade *                       │
│  [Input number]                     │
│  (kg/unidades/peças conforme tipo)  │
│                                     │
│  Descrição (opcional)               │
│  [Input text]                       │
│  Ex: "Arroz 5kg", "10 kits"         │
│                                     │
│  [Botão Primário] Registrar Doação  │
│                                     │
│  ✓ Sucesso!                         │
│    Doação registrada com sucesso.   │
│    Seu impacto já está no painel.   │
│                                     │
└─────────────────────────────────────┘
```

**Campos:**
- **Unidade** (obrigatório, select) — dropdown com todas as unidades
- **Categoria** (obrigatório, radio) — uma das 4 categorias
- **Quantidade** (obrigatório, number) — valor numérico
- **Descrição** (opcional, textarea) — detalhe livre (ex: "Arroz 5kg")
- **Data** (automática) — usa data do navegador no cadastro

**Comportamento:**
1. Validação frontend (campos obrigatórios)
2. POST para Supabase (INSERT em doações)
3. Exibe Alert de sucesso
4. Limpa formulário após 2 segundos OU oferece opção de cadastrar outra

**Integração Supabase:**
- Insere em `doacoes` com os dados do formulário
- usa `date_cadastro: new Date().toISOString().split('T')[0]`

---

### 4.2 Página: `/dashboard` (Painel Público)

**Rota:** `/dashboard`  
**Visibilidade:** Pública (acessível por qualquer um)  
**Componentes do Brand Book:** Container, Grid, Section, Table, Card, Icon, Alert

**Seções:**

#### **Seção 1: Header**
```
MAIO SOLIDÁRIO 2026
Toda a Rede Ulbra em uma só corrente

[Bloco de contexto com copy da campanha]
```

#### **Seção 2: KPI Cards (Totais Arrecadados)**

Grid de 4 cards, um por categoria:

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│   🥫         │   🧼         │   👕         │   🐾         │
│ 1,245 kg     │ 856 unidades │ 2,130 peças  │ 450 kg       │
│ Alimentos    │ Higiene      │ Vestuário    │ Pet          │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

Cada card exibe:
- Ícone categoria
- Quantidade total
- Nome categoria
- Unidade de medida

**Dados:** SUM(quantidade) WHERE categoria = X

#### **Seção 3: Gráfico de Barras (Arrecadação por Categoria)**

Gráfico horizontal ou vertical mostrando total de cada categoria.  
**Tecnologia:** Recharts ou Chart.js  
**Cores:** Usar palette do Brand Book

```
Alimentos  ████████████████ 1.245
Higiene   ████████ 856
Vestuário ██████████████████ 2.130
Pet       ████ 450
```

#### **Seção 4: Ranking de Unidades (Tabela)**

```
Posição │ Unidade               │ Total      │ Principal
────────┼───────────────────────┼────────────┼─────────────
1º      │ ULBRA Porto Alegre    │ 3.245 kg   │ Alimentos
2º      │ ULBRA Gravataí        │ 2.890 kg   │ Alimentos
3º      │ ULBRA Canoas          │ 2.456 kg   │ Vestuário
4º      │ ULBRA Novo Hamburgo   │ 1.987 kg   │ Alimentos
...     │ ...                   │ ...        │ ...
```

**Coluna "Principal":** Categoria com maior arrecadação daquela unidade

**Dados:**
```sql
SELECT 
  RANK() OVER (ORDER BY SUM(quantidade) DESC) as posicao,
  u.nome as unidade,
  SUM(d.quantidade) as total,
  d.categoria as categoria_principal,
  COUNT(*) as registros
FROM doacoes d
JOIN unidades u ON d.unidade_id = u.id
GROUP BY u.id, u.nome, d.categoria
ORDER BY total DESC
LIMIT 20
```

#### **Seção 5: Feed de Últimas Doações**

```
• ULBRA Porto Alegre → 50 kg Alimentos (hoje, 14:32)
• ULBRA Gravataí → 15 kits Higiene (hoje, 10:15)
• ULBRA Canoas → 120 peças Vestuário (ontem, 16:45)
• ULBRA Novo Hamburgo → 30 kg Ração (ontem, 09:20)
```

**Dados:** SELECT últimos 10 registros com timestamp, exibir unidade, quantidade, categoria, data

#### **Seção 6: Footer**
Mensagem de impacto: "Cada doação registrada neste painel chegará na mesa de uma família."

---

## 5. Arquitetura Técnica

### Stack
- **Frontend:** React + Brand Book Design System
- **Backend:** Supabase (PostgreSQL)
- **Gráficos:** Recharts
- **Data Fetching:** TanStack Query (React Query)
- **Styling:** CSS do Brand Book (componentes reutilizáveis)

### Estrutura de Pastas

```
src/
├── pages/
│   ├── cadastro.tsx         # Formulário /cadastro
│   └── dashboard.tsx         # Painel /dashboard
├── components/
│   ├── FormCadastro.tsx     # Componente do formulário
│   ├── DashboardHeader.tsx  # Header do dashboard
│   ├── KPICards.tsx         # Cards de totais
│   ├── GraficosPilares.tsx  # Gráfico de barras
│   ├── RankingTabela.tsx    # Tabela de ranking
│   └── FeedDoacoes.tsx      # Feed de últimas doações
├── hooks/
│   └── useDoacoes.ts        # Hook para fetch de doações
├── services/
│   └── supabase.ts          # Cliente Supabase e queries
├── types/
│   └── doacao.ts            # Types para Doação, Unidade
└── utils/
    └── formatters.ts        # Funções de formatação
```

### Fluxo de Dados

```
┌──────────────────────────────────────────────────┐
│ /cadastro (React Component)                      │
│ ├─ FormCadastro                                  │
│ └─ handleSubmit → POST para Supabase             │
└──────────────────────┬───────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │   Supabase                   │
        │   INSERT INTO doacoes        │
        └──────────────┬───────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────┐
│ /dashboard (React Component)                     │
│ ├─ useQuery → GET doacoes + unidades             │
│ ├─ KPICards (calcula totais)                     │
│ ├─ GraficosPilares (agrupa por categoria)        │
│ ├─ RankingTabela (agrupa por unidade)            │
│ └─ FeedDoacoes (últimos registros)               │
└──────────────────────────────────────────────────┘
```

### Integração Supabase

**Cliente:**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
```

**Queries:**

1. **Inserir doação:**
```typescript
supabase
  .from('doacoes')
  .insert([{ unidade_id, categoria, quantidade, descricao, data_cadastro }])
```

2. **Buscar todas as doações (para dashboard):**
```typescript
supabase
  .from('doacoes')
  .select('*, unidades(nome, estado)')
  .order('created_at', { ascending: false })
```

3. **Buscar unidades (para select no cadastro):**
```typescript
supabase
  .from('unidades')
  .select('id, nome, estado')
  .order('nome')
```

---

## 6. Atualizações e Refresh

**Frequência de atualização:** Semanal (quinta-feira)

**No /cadastro:**
- Dados são inseridos imediatamente

**No /dashboard:**
- Dados carregam ao abrir a página
- Refresh automático a cada 30 segundos (ou manual via botão "Atualizar")
- Sem limite de quantidade ou validação de data (conforme definido)

---

## 7. Sem Autenticação (Escopo Explícito)

- `/cadastro` não requer login, mas é oculto (URL secreta)
- `/dashboard` é completamente público
- Não há validação de usuário ou restrição de acesso

---

## 8. Responsabilidades por Arquivo

| Arquivo | Responsabilidade |
|---------|------------------|
| `pages/cadastro.tsx` | Renderizar formulário, coletar dados |
| `pages/dashboard.tsx` | Renderizar dashboard, orquestrar chamadas de dados |
| `components/FormCadastro.tsx` | Lógica de validação e submit do formulário |
| `components/KPICards.tsx` | Exibir 4 cards com totais |
| `components/GraficosPilares.tsx` | Renderizar gráfico de barras com Recharts |
| `components/RankingTabela.tsx` | Renderizar tabela com ranking |
| `components/FeedDoacoes.tsx` | Exibir últimas 10 doações |
| `hooks/useDoacoes.ts` | Hook useQuery para fetch centralizado |
| `services/supabase.ts` | Cliente Supabase e funções de query |
| `types/doacao.ts` | Tipos TypeScript |

---

## 9. Componentes do Brand Book Usados

- `Container` — wrapper principal
- `Grid` — layout de KPI cards
- `Section` — divisão de seções
- `Table` — tabela de ranking
- `Card` — KPI cards
- `FormGroup` — grupos de input
- `Label` — labels de formulário
- `Input` — campos de input
- `Button` — botão submit/atualizar
- `Alert` — mensagens de sucesso/erro
- `Icon` — ícones das categorias

---

## 10. Critérios de Sucesso

✅ Usuário consegue registrar uma doação em `/cadastro`  
✅ Dados aparecem no `/dashboard` em tempo real  
✅ Dashboard exibe corretamente os 4 pilares, ranking e feed  
✅ Design é consistente com Brand Book  
✅ Sem autenticação, formulário e painel são acessíveis  
✅ Responsivo em mobile  

---

## 11. Fora de Escopo (Futuro)

- Autenticação e permissões
- Validações rigorosas (limite de quantidade, deadline)
- Análises avançadas (gráficos de tendência temporal)
- Exportação de relatórios
- Admin panel para gerenciar dados
