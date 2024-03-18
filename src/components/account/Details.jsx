import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function Details({ session }) {

  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    let ignore = false
    async function getProfile() {
      setLoading(true)
      const { user } = session

      const { data, error } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', user.id)
        .single()

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          setUsername(data.username)
        }
      }

      setLoading(false)
    }

    getProfile()

    return () => {
      ignore = true
    }
  }, [session])

  async function updateProfile(event) {
    event.preventDefault()

    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      username,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    }
    setLoading(false)
  }

  return (
    <>
      <p>{ username }</p>
      <form onSubmit={updateProfile}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={session.user.email} disabled />
        </div>
        <div>
          <label htmlFor="username">Имя пользователя</label>
          <input
            id="username"
            type="text"
            required
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Loading ...' : 'Update'}
          </button>
        </div>

        <div>
          <button type="button" onClick={() => supabase.auth.signOut()}>
            Sign Out
          </button>
        </div>
      </form>
    </>
  )
}