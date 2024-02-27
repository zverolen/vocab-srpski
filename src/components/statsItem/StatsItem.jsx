export default function StatsItem({ name, statNum, statPercent, id }) {
  return (
    <a id={id} href="#">
      <span>{name}</span>
      <span>{statNum}</span>
      <span> | </span>
      <span>{statPercent}%</span>
    </a>  
  )
}