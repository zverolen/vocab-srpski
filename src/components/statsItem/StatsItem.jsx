import { NavLink } from 'react-router-dom'

export default function StatsItem({ name, statNum, statPercent, id, route }) {
  return (
    <NavLink id={id} to={route} data-testid={id}>
      <span>{name} </span>
      <span>{statNum} </span>
      <span>{`(${statPercent}%)`}</span>
    </NavLink>
  )
}