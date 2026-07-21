import { useEffect, useState } from 'react'
import { supabase } from './integrations/supabase/client'

type SupabaseRecord = Record<string, unknown>

function App() {
  const [data, setData] = useState<SupabaseRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase.from('profiles').select('*').limit(5)

        if (error) {
          throw error
        }

        setData((data ?? []) as SupabaseRecord[])
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unable to load data from Supabase.'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    void fetchData()
  }, [])

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', lineHeight: 1.5 }}>
      <h1>Supabase integration</h1>
      <p>The app is connected to Supabase via the shared client and fetches data from the configured project.</p>

      {loading && <p>Loading data…</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && data.length === 0 && <p>No rows were returned from Supabase.</p>}

      {!loading && !error && data.length > 0 && (
        <ul>
          {data.map((item, index) => (
            <li key={String(item.id ?? index)}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
