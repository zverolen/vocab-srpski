import { useState, useEffect } from "react"
import { supabase } from "../../supabaseClient"

import Details from "./Details"
import Login from "./Login"

export default function Account() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  console.log(session)

  return (
    <div style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Login /> : <Details key={session.user.id} session={session} />}
    </div>
  )
}