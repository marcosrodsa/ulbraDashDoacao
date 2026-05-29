# Design: Listar e Editar Doações na página de Cadastro

**Data:** 2026-05-29
**Status:** Aprovado para implementação

## Objetivo

Na página `/cadastro`, permitir que o usuário **veja todas as doações já registradas** e **edite ou exclua** cada uma (quantidade, unidade, categoria, semana, descrição).

## Contexto

- Página atual: `src/pages/Cadastro.jsx` — formulário de registro (`donations.insert`) + seção de Configurações da Campanha (meta).
- Tabela `donations`: `id`, `unit_id`, `category`, `quantity`, `description`, `donation_date`, `created_at`.
- Tabela `units`: `id`, `name`, `display_name`. Filtro de unidades válidas (exclui `pop`, `institucional`, `geral`, `caxias do sul`, `ultec`) já é usado em `Cadastro.jsx` e `Dashboard.jsx`.
- Categorias (6): `alimentos`, `higiene`, `vestuario`, `pet`, `escolar`, `outros` — definidas em `CATEGORIAS` no `Cadastro.jsx`.
- Semanas (4): `2026-05-01`, `2026-05-11`, `2026-05-18`, `2026-05-25` (valores de `donation_date`).
- RLS: `security_deploy_policy.sql` só concede SELECT/INSERT em `donations`, mas o RLS **ainda não está ativo** no banco (o `updateMeta` em `useCampaignSettings.js` faz UPDATE e funciona em produção). Logo, UPDATE/DELETE pela chave anônima funcionam hoje.

## Arquitetura

### Novo componente: `src/components/ListaDoacoes.jsx`

Responsável por buscar, filtrar, exibir, editar e excluir doações. Mantém `Cadastro.jsx` enxuto.

**Props:**
- `unidades` — lista de unidades válidas (reusa a já carregada em `Cadastro.jsx`, evitando fetch duplicado).
- `refreshKey` — valor que muda quando uma nova doação é registrada no formulário; dispara refetch via `useEffect`.

**Estado interno:**
- `doacoes` — registros buscados de `donations`, ordenados por `created_at` desc.
- `loading`
- `filtroUnidade`, `filtroSemana` — filtros client-side.
- `editingId` — id da linha em edição (ou `null`).
- `editData` — campos editáveis da linha em edição.
- `isExpanded` — controla o accordion (recolhido por padrão).
- toast (mensagem/tipo) — reusa o componente `Toast`.

**Constantes compartilhadas:** `CATEGORIAS` e a lista de semanas serão movidas para um módulo reutilizável (`src/lib/cadastroConstants.js`) e importadas tanto por `Cadastro.jsx` quanto por `ListaDoacoes.jsx`, evitando duplicação.

## Layout / UI

Seção em **accordion**, posicionada **abaixo do formulário de registro** e **acima** da seção "Configurações da Campanha". Recolhida por padrão.

Reusa o padrão de accordion já existente no Dashboard (botão toggle + classe `expanded` com transição CSS).

```
[ 📋 Doações Registradas (N)            ▼ ]   <- header clicável (toggle)
  ┌─────────────────────────────────────────┐
  │ Filtros:  [Unidade ▼]  [Semana ▼]         │
  │ ┌───────────────────────────────────────┐ │
  │ │ Unidade │ Categoria │ Qtd │ Semana │…│ │ │
  │ │ ...linhas...        [Editar] [Excluir]│ │
  │ └───────────────────────────────────────┘ │
  └─────────────────────────────────────────┘
```

### Tabela (modo visualização)

Colunas: **Unidade · Categoria · Quantidade · Semana · Descrição · Ações**.
- Unidade: `display_name` (ou `name`) resolvido via `unit_id`.
- Categoria: label amigável do `CATEGORIAS`.
- Semana: rótulo legível (ex: "Semana 2 (11/05 a 17/05)").
- Ações: botões **Editar** e **Excluir**.

### Edição inline (modo edição)

Ao clicar em "Editar", a linha (`editingId === d.id`) troca as células por inputs:
- Unidade → `select` de `unidades`.
- Categoria → `select` das 6 categorias.
- Quantidade → `input number` (min 0, step 0.01).
- Semana → `select` das 4 semanas.
- Descrição → `input` texto.
- Ações → **Salvar** / **Cancelar**.

**Salvar:** `supabase.from('donations').update({ unit_id, category, quantity, description, donation_date }).eq('id', editingId)`. Em sucesso: atualiza estado local, sai do modo edição, toast de sucesso. Em erro: toast de erro.

**Cancelar:** descarta `editData`, sai do modo edição.

### Excluir

`window.confirm` de confirmação → `supabase.from('donations').delete().eq('id', id)`. Em sucesso: remove do estado local, toast. Em erro: toast.

### Filtros

Dois `select` acima da tabela: **Unidade** e **Semana**. Filtragem client-side sobre `doacoes`. Opção "Todas" em cada.

### Responsividade

Em mobile, a tabela colapsa para cards empilhados (um card por doação, label:valor), coerente com os refinamentos mobile recentes do projeto. Estilos adicionados em `src/styles/cadastro.css`.

## Integração com `Cadastro.jsx`

- Após `handleSubmit` inserir com sucesso, incrementa um `refreshKey` (estado novo) passado ao `ListaDoacoes` para recarregar a lista.
- Renderiza `<ListaDoacoes unidades={unidades} refreshKey={refreshKey} />` entre o `form-section` e o `config-section`.

## Segurança (RLS)

Atualizar `supabase/security_deploy_policy.sql` para incluir, quando o RLS for aplicado no deploy oficial:
- `donations`: política `FOR UPDATE USING (true) WITH CHECK (true)`.
- `donations`: política `FOR DELETE USING (true)`.
- `campaign_settings`: política `FOR UPDATE USING (true) WITH CHECK (true)` (corrige o ajuste de meta, que hoje só funciona por falta de RLS ativo).

Sem isso, edição/exclusão de doações — e o ajuste de meta — quebrariam assim que o RLS fosse ativado.

> ⚠️ Nota: tornar doações publicamente editáveis/deletáveis é coerente com o modelo atual (inserção já é pública), mas é uma decisão de produto consciente. Não há autenticação na página de cadastro.

## Tratamento de erros

- Falha ao buscar: toast de erro + estado de lista vazia.
- Falha ao salvar/excluir: toast de erro, mantém o estado anterior.
- Lista vazia: mensagem "Nenhuma doação registrada ainda".

## Testes

- Teste de unidade do `ListaDoacoes` (Vitest + Testing Library, padrão já usado no projeto): renderização da lista, entrada/saída do modo edição, filtros, e chamadas de update/delete com `supabase` mockado.

## Fora de escopo (YAGNI)

- Paginação (a campanha tem volume baixo; ordenação desc basta). Reavaliar se a lista crescer muito.
- Autenticação/permissões de quem pode editar.
- Edição em massa.
