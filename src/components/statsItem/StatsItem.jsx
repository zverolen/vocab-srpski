import { Link, NavLink } from 'react-router-dom'

export default function StatsItem({ name, statNum, statPercent, id, route }) {
  return (
    <NavLink id={id} to={route}>
      <span>{name}</span>
      <span>{statNum}</span>
      <span> | </span>
      <span>{statPercent}%</span>
    </NavLink>  
  )
}