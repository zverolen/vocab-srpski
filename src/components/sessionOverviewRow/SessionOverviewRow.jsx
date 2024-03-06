import style from './SessionOverviewRow.module.css'

export default function SessionOverviewRow({ data, status }) {

  let phraseSessionStatus
  let phraseIcon

  if (status === 'correct') {
    phraseSessionStatus = 'Знаю!'
    phraseIcon = '🧐'
  } else if (status === 'wrong')  {
    phraseSessionStatus = 'Учу!'
    phraseIcon = '🤔'
  } else if (status === 'skipped')  {
    phraseSessionStatus = 'Пропущено'
    phraseIcon = null
  }

  // console.log(data)
  return(
    <tr className={style.sessionOverviewRow} key={data.serbian} role="row">
      <td role="cell">{data.russian}</td>
      <td role="cell" translate='no' lang="sr-RS" >{data.serbian}</td>
      <td role="cell">
      {phraseIcon && <span>{phraseIcon}</span>}
        <span>{phraseSessionStatus}</span>
      </td>
    </tr>
  )
}