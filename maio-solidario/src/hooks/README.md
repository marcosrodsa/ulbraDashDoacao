# Custom React Hooks

This directory contains custom React hooks for the Maio Solidário Dashboard.

## useCampaignSettings

A custom hook that manages campaign configuration (metadata) from Supabase.

### Usage

```javascript
import { useCampaignSettings } from '../hooks'

export function MyComponent() {
  const { settings, loading, error, updateMeta, refetch } = useCampaignSettings()

  if (loading) return <div>Loading settings...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <p>Meta Doacoes: {settings.meta_doacoes}</p>
      <p>Data Inicio: {settings.data_inicio}</p>
      <p>Data Fim: {settings.data_fim}</p>
      
      <button onClick={() => updateMeta(1000)}>
        Update Meta to 1000
      </button>
      
      <button onClick={() => refetch()}>
        Refresh Settings
      </button>
    </div>
  )
}
```

### API Reference

#### Return Value

```javascript
{
  settings: {
    meta_doacoes: number,      // Donation goal target
    data_inicio: string,       // Start date (YYYY-MM-DD format)
    data_fim: string,          // End date (YYYY-MM-DD format)
  },
  loading: boolean,            // True while fetching data
  error: string | null,        // Error message if fetch fails
  updateMeta: function,        // Async function to update meta_doacoes
  refetch: function,           // Async function to manually re-fetch settings
}
```

#### Methods

##### `updateMeta(newMeta: number)`

Updates the meta_doacoes value in the database.

```javascript
const { updateMeta } = useCampaignSettings()

try {
  const result = await updateMeta(2000)
  if (result.success) {
    console.log('Meta updated successfully')
  } else {
    console.error('Failed to update:', result.error)
  }
} catch (err) {
  console.error('Update error:', err)
}
```

Returns: `{ success: boolean, error?: string }`

##### `refetch()`

Manually re-fetches settings from the database.

```javascript
const { refetch } = useCampaignSettings()

await refetch()
// Settings will be updated automatically
```

### Default Values

When the Supabase database is unavailable or has no data, the hook uses these defaults:

```javascript
{
  meta_doacoes: 500,
  data_inicio: <today's date>,
  data_fim: <30 days from today>,
}
```

### Testing

To run the test suite (requires Vitest setup):

```bash
npm install -D vitest @testing-library/react @testing-library/react-hooks
npm test
```

### Database Schema

This hook expects the `campaign_settings` table in Supabase with the following columns:

- `id` (uuid, primary key)
- `campaign_name` (text)
- `meta_doacoes` (number)
- `data_inicio` (date)
- `data_fim` (date)
- `created_at` (timestamp)
- `updated_at` (timestamp)

See the migration guide in the project documentation for setup instructions.

### Error Handling

The hook gracefully handles errors:

1. **Network errors**: Logged to console, falls back to default values
2. **Database errors**: Error message stored in `error` state, logged to console
3. **Invalid data**: Returns default values

Always check the `error` state and display appropriate UI feedback to users.

### Performance Considerations

- The hook fetches settings once on mount (dependency array: `[]`)
- Use `refetch()` to update after changes made elsewhere
- The database query selects only necessary columns for efficiency
- Settings are retrieved from the latest record by `created_at` timestamp
