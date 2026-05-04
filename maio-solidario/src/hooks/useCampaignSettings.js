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
      console.log('🟡 [HOOK] Fetching campaign settings...')
      setLoading(true)
      const { data, error: err } = await supabase
        .from('campaign_settings')
        .select('*')
        .limit(1)

      console.log('🟡 [HOOK] Fetch response - data:', data, 'error:', err)

      if (err) {
        console.error('❌ [HOOK] Fetch error:', err)
        setError(err.message)
        setLoading(false)
        return
      }

      if (data && data.length > 0) {
        const campaign = data[0]
        console.log('✅ [HOOK] Settings loaded:', campaign)
        setSettings({
          id: campaign.id,
          meta_doacoes: campaign.meta_doacoes || 500,
          data_inicio: campaign.data_inicio,
          data_fim: campaign.data_fim,
        })
      } else {
        console.log('⚠️ [HOOK] No settings found, using defaults')
      }
    } catch (err) {
      console.error('❌ [HOOK] Error fetching:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateMeta = async (newMeta) => {
    try {
      console.log('🟡 [HOOK] updateMeta called with:', newMeta)
      console.log('🟡 [HOOK] settings.id:', settings.id)

      if (!settings.id) {
        console.log('❌ [HOOK] No ID found!')
        throw new Error('Settings not loaded yet. Please wait...')
      }

      console.log('🟡 [HOOK] Calling supabase.update...')
      const { error: err } = await supabase
        .from('campaign_settings')
        .update({ meta_doacoes: newMeta, updated_at: new Date().toISOString() })
        .eq('id', settings.id)

      console.log('🟡 [HOOK] Supabase response - error:', err)

      if (err) throw err

      console.log('✅ [HOOK] Update successful in Supabase!')
      setSettings(prev => ({ ...prev, meta_doacoes: newMeta }))
      return { success: true }
    } catch (err) {
      console.error('❌ [HOOK] Error updating meta:', err)
      return { success: false, error: err.message }
    }
  }

  return { settings, loading, error, updateMeta, refetch: fetchSettings }
}
