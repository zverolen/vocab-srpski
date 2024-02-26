import style from './SessionOverviewRow.module.css'

export default function SessionOverviewRow({ data }) {
  // console.log(data)
  return(
    <tr className={style.sessionOverviewRow} key={data.id} role="row">
      <td role="cell">{data.russian}</td>
      <td role="cell">{data.serbian}</td>
      <td role="cell">
        <span>🤓</span>
        <span>{data.phraseSessionStatus}</span>
      </td>
    </tr>
  )
}