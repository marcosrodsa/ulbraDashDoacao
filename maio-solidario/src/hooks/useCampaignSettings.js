import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useCampaignSettings() {
  const [settings, setSettings] = useState({
    id: null,
    meta_doacoes: 500,
    data_inicio: new Date().toISOString().split('T')[0],
    data_fim: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const { data, error: err } = await supabase
        .from('campaign_settings')
        .select('id, meta_doacoes, data_inicio, data_fim')
        .order('created_at', { ascending: false })
        .limit(1)

      if (err) {
        console.error('Fetch error:', err)
        throw err
      }

      if (!data || data.length === 0) {
        throw new Error('No campaign settings found in database')
      }

      const settings = data[0]
      console.log('Fetched settings:', settings)
      setSettings({
        id: settings.id,
        meta_doacoes: settings.meta_doacoes,
        data_inicio: settings.data_inicio,
        data_fim: settings.data_fim,
      })
    } catch (err) {
      console.error('Error fetching campaign settings:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateMeta = async (newMeta) => {
    try {
      if (!settings.id) {
        throw new Error('Settings not loaded yet. Please wait...')
      }

      const { error: err } = await supabase
        .from('campaign_settings')
        .update({ meta_doacoes: newMeta, updated_at: new Date().toISOString() })
        .eq('id', settings.id)

      if (err) throw err

      setSettings(prev => ({ ...prev, meta_doacoes: newMeta }))
      return { success: true }
    } catch (err) {
      console.error('Error updating meta:', err)
      return { success: false, error: err.message }
    }
  }

  return { settings, loading, error, updateMeta, refetch: fetchSettings }
}
