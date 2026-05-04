import { useState, useEffect } from 'react'

export function useCampaignSettings() {
  const [settings, setSettings] = useState({
    id: 'hardcoded',
    meta_doacoes: 500,
    data_inicio: new Date().toISOString().split('T')[0],
    data_fim: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Settings are hardcoded for now (401 auth issue with campaign_settings table)
    // TODO: Connect to Supabase when auth is fixed
    setLoading(false)
  }, [])

  const updateMeta = async (newMeta) => {
    try {
      // For now, just update local state
      // TODO: Persist to Supabase campaign_settings when auth is fixed
      console.log('Meta update requested:', newMeta)
      setSettings(prev => ({ ...prev, meta_doacoes: newMeta }))
      return { success: true }
    } catch (err) {
      console.error('Error updating meta:', err)
      return { success: false, error: err.message }
    }
  }

  return { settings, loading, error, updateMeta, refetch: () => {} }
}
