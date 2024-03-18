import { useState } from "react"
import { supabase } from "../../supabaseClient"

export default function Account() {

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  return(
    <div>
      <h2>Страница аккаунта</h2>
      <p>Войдите при помощи ссылки, отправленной на email.</p>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Ваш email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button disabled={loading}>
              {loading ? <span>Загрузка</span> : <span>Отправить ссылку</span>}
            </button>
          </div>
        </form>
      <button onClick={() => supabase.auth.signOut()} >Выйти</button>
    </div>
  )
}