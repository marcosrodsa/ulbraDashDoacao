# Dashboard Maio Solidário — Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add loading states, empty states, intelligent meta projection, heatmap toggle, category trending, configurable meta, reorganized layout (PULSE/ANALYSIS/DEEP DIVE), and improved mobile responsiveness without breaking existing functionality.

**Architecture:** 
- Create reusable skeleton/loading components
- Add 5 new feature components (Heatmap, Trending, MetaProjection, LoadingState, EmptyState)
- Create `campaign_settings` table in Supabase
- Reorganize Dashboard layout into 3 scannable sections
- Add meta configuration panel to `/cadastro`
- Maintain all existing charts/tables with new wrappers

**Tech Stack:** React 18, ECharts, Supabase, TailwindCSS/CSS custom properties

---

## Task 1: Create Supabase `campaign_settings` Table
- [ ] Create migration in Supabase console
- **Status: PENDING**

## Task 2: Create Custom Hook `useCampaignSettings`
- [ ] Create hook file
- **Status: PENDING**

## Task 3: Create Loading & Skeleton Components
- [ ] Create SkeletonLoader, ChartSkeleton, TableSkeleton
- **Status: PENDING**

## Task 4: Create Empty State Components
- [ ] Create EmptyStateCard and related components
- **Status: PENDING**

## Task 5: Create MetaProjection Component
- [ ] Create metaCalculations helper and MetaProjection component
- **Status: PENDING**

## Task 6: Create Heatmap & Toggle Component
- [ ] Create Heatmap and ComposicaoToggle components
- **Status: PENDING**

## Task 7: Create Trending Component
- [ ] Create TrendingBadges component
- **Status: PENDING**

## Task 8: Create Meta Config Panel for Cadastro
- [ ] Modify Cadastro.jsx and cadastro.css
- **Status: PENDING**

## Task 9: Reorganize Dashboard Layout — PULSE Section
- [ ] Reorganize Dashboard.jsx PULSE section
- **Status: PENDING**

## Task 10: Reorganize Dashboard Layout — ANALYSIS Section
- [ ] Reorganize Dashboard.jsx ANALYSIS section with charts
- **Status: PENDING**

## Task 11: Reorganize Dashboard Layout — DEEP DIVE Section
- [ ] Reorganize Dashboard.jsx DEEP DIVE section with auditoria
- **Status: PENDING**

## Task 12: Update Dashboard Responsividade CSS
- [ ] Add responsive CSS for all breakpoints
- **Status: PENDING**

## Task 13: Final Integration & Testing
- [ ] Test all features on desktop and mobile
- **Status: PENDING**

