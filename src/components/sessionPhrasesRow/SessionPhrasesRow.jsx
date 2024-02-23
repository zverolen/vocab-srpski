import style from './SessionPhrasesRow.module.css'

export default function SessionPhrasesRow({ data }) {
  console.log(data)
  return(
    <tr className={style.sessionPhrasesRow} key={data.id} role="row">
      <td role="cell">{data.russian}</td>
      <td role="cell">{data.serbian}</td>
      <td role="cell">
        <span>🤓</span>
        <span>{data.sessionStatus}</span>
      </td>
    </tr>
  )
}