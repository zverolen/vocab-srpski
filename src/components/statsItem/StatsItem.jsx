import { Link, NavLink } from 'react-router-dom'

export default function StatsItem({ name, statNum, statPercent, id, route }) {
  return (
    <NavLink id={id} to={route} data-testid={id}>
      {/* {`${name} ${statNum} (${statPercent}%)`} */}
      <span>{name} </span>
      <span>{statNum} </span>
      <span>{`(${statPercent}%)`}</span>
    </NavLink>
  //   <NavLink id={id} to={route}>
  //   <span id={`${id}Stat`}>{name}</span>
  //   <span aria-labelledby={`${id}Stat`}>{statNum}</span>
  //   <span aria-hidden="true"> | </span>
  //   <span aria-label="В процентах">{`${statPercent}%`}</span>
  // </NavLink> 
  )
}