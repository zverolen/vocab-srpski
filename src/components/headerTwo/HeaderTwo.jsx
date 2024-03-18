import { NavLink } from "react-router-dom"

export default function HeaderTwo() {
  return (
    <header>
      <h1>Знаю!</h1>
      <div>
        <button>Инструкция</button>
        <span>|</span>
        <NavLink to="/account">Аккаунт</NavLink>
      </div>
    </header>
  )
}