# Empty State Components

Reusable empty state cards for displaying when no data is available in the dashboard.

## Components

### EmptyStateCard
Main card component for rendering empty states with customizable content and styling.

**Props:**
- `icon` (string) - Emoji or icon to display (e.g., "📭", "📊")
- `title` (string) - Main heading text
- `description` (string) - Descriptive text below title
- `action` (object, optional) - Button action with `label` and `onClick`
- `variant` (string, default: "default") - Style variant: "default", "warning", or "info"

**Example:**
```jsx
import { EmptyStateCard } from './EmptyStates'

<EmptyStateCard
  icon="📊"
  title="No Data"
  description="Start adding data to see results"
  variant="default"
/>
```

### NoDataMessage
Component for displaying when no data is available (optionally due to active filters).

**Props:**
- `filterActive` (boolean) - Shows different states based on filter status
- `onClearFilters` (function) - Callback when "Clear filters" button is clicked

**Example:**
```jsx
import { NoDataMessage } from './EmptyStates'

<NoDataMessage
  filterActive={isFiltering}
  onClearFilters={handleClearFilters}
/>
```

### MetaNotConfigured
Component for when campaign meta is not configured.

**Props:**
- `onConfigure` (function) - Callback when "Access settings" button is clicked

**Example:**
```jsx
import { MetaNotConfigured } from './EmptyStates'

<MetaNotConfigured onConfigure={handleNavigateToSettings} />
```

## Styling

All components use CSS custom properties from the ULBRA Design System:
- Colors: `--ulbra-primary`, `--ulbra-gold`, `--ulbra-primary-soft`
- Spacing: `--sp-2` through `--sp-8`
- Typography: `--fs-h3`, `--fs-body`
- Borders: `--radius-lg`, `--radius-md`
- Effects: `--shadow-2`, `--dur-base`, `--ease-standard`

Inline styles are used for all styling to keep components self-contained.

## Variants

- **default**: Soft teal background (primary color)
- **warning**: Gold background for warnings/alerts
- **info**: Sage/green background for information

## Usage in Dashboard

Import the components and use them in your component where you need to show empty states:

```jsx
import { EmptyStateCard, NoDataMessage, MetaNotConfigured } from './components/EmptyStates'

// In your component:
{!hasData && <NoDataMessage filterActive={isFiltering} onClearFilters={clearFilters} />}

{!metaConfigured && <MetaNotConfigured onConfigure={navigateToSettings} />}

{customEmptyState && (
  <EmptyStateCard
    icon="⚠️"
    title="Custom State"
    description="Custom description"
    action={{ label: 'Action', onClick: handler }}
    variant="warning"
  />
)}
```
