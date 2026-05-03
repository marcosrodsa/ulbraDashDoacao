# Maio Solidário - Dashboard de Arrecadação

Dashboard em tempo real para monitorar doações da campanha Maio Solidário da Rede ULBRA.

## 🚀 Estrutura

```
src/
├── pages/
│   ├── Cadastro.jsx       # Formulário de registro de doações (/cadastro)
│   └── Dashboard.jsx      # Painel público (/dashboard)
├── styles/
│   ├── cadastro.css       # Estilos do formulário
│   └── dashboard.css      # Estilos do dashboard
├── App.jsx                # Router principal
├── main.jsx               # Entry point
└── index.css              # Estilos globais + variáveis ULBRA
```

## 🎨 Design System

Cores ULBRA integradas:
- **Primary Deep:** `#0d3634` (fundo)
- **Gold:** `#cc9e69` (botões, destaque)
- **Gold Light:** `#f5ce99` (títulos)
- **Primary Soft:** `#91baa3` (secundário)

## 📍 Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Redireciona para `/dashboard` |
| `/cadastro` | Formulário de registro de doações (oculto) |
| `/dashboard` | Painel público com métricas |

## 🎯 Funcionalidades

### Cadastro (/cadastro)
- ✅ Seleção de unidade (dropdown)
- ✅ Seleção de categoria (4 opções com emojis)
- ✅ Campo de quantidade com validação
- ✅ Descrição opcional
- ✅ Validação frontend
- ✅ Mensagem de sucesso
- ⏳ Integração Supabase (próximo passo)

### Dashboard (/dashboard)
- ✅ Header com título e contexto da campanha
- ✅ Cards KPI com totais por categoria
- ✅ Gráfico de barras (Recharts) 
- ✅ Ranking de unidades (tabela)
- ✅ Feed das últimas doações
- ✅ Dados fake para demonstração
- ⏳ Integração com Supabase (próximo passo)

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool (dev server em http://localhost:5173)
- **React Router** - Routing
- **Recharts** - Gráficos
- **CSS vanilla** - Estilos (Design System ULBRA)

## 🚀 Como rodar

```bash
cd maio-solidario
npm install
npm run dev
```

Acesse: **http://localhost:5173**

## 🔄 Próximos Passos

1. **Integração Supabase**
   - Configurar tabela `doacoes` em PostgreSQL
   - Substituir dados fake por queries reais
   - Conectar formulário ao banco

2. **Melhorias de UX**
   - Refresh automático do dashboard
   - Loading states
   - Tratamento de erros

3. **Deploy**
   - Build estático: `npm run build`
   - Deploy em Vercel/Netlify

## 📝 Notas

- Modo YOLO: Dados são fake por enquanto
- Design baseado no Brand Book ULBRA
- Formulário de cadastro é oculto (sem links públicos)
- Dashboard é 100% público
- Responsivo para mobile

---

**Pronto para adicionar Supabase!** 🎉
