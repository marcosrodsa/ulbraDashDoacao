import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useCampaignSettings() {
  const [settings, setSettings] = useState({
    id: null,
    meta_doacoes: 10000,
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
        .select('*')
        .limit(1)

      if (err) {
        setError(err.message)
        setLoading(false)
        return
      }

      if (data && data.length > 0) {
        const campaign = data[0]
        setSettings({
          id: campaign.id,
          meta_doacoes: campaign.meta_doacoes || 10000,
          data_inicio: campaign.data_inicio,
          data_fim: campaign.data_fim,
        })
      }
    } catch (err) {
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
      return { success: false, error: err.message }
    }
  }

  return { settings, loading, error, updateMeta, refetch: fetchSettings }
}
