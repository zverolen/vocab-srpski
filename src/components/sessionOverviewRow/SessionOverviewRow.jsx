import style from './SessionOverviewRow.module.css'

export default function SessionOverviewRow({ data }) {

  let phraseSessionStatus
  let phraseIcon

  if (data.phraseSessionStatus === 'correct') {
    phraseSessionStatus = 'Знаю!'
    phraseIcon = '🧐'
  } else if (data.phraseSessionStatus === 'wrong')  {
    phraseSessionStatus = 'Учу!'
    phraseIcon = '🤔'
  } else if (data.phraseSessionStatus === 'skipped')  {
    phraseSessionStatus = 'Пропущено'
    phraseIcon = null
  }

  return(
    <tr className={style.sessionOverviewRow} key={data.id} role="row">
      <td role="cell">{data.russian}</td>
      <td role="cell">{data.serbian}</td>
      <td role="cell">
      {phraseIcon && <span>{phraseIcon}</span>}
        <span>{phraseSessionStatus}</span>
      </td>
    </tr>
  )
}