import { useSelector } from "react-redux"
import { selectSessionPhrases } from "../../features/phrases/phrasesSlice"

import SessionOverviewRow from "../sessionOverviewRow/SessionOverviewRow"

import style from "./SessionOverview.module.css"

export default function SessionOverview() {
  const sessionOverview = useSelector(selectSessionPhrases)

  return(
    <div className={style.sessionOverview}>
      <h3 id="session-phrases-subheading">Фразы в этой сессии:</h3>
      {sessionOverview.length > 0 && 
        <table role="table" aria-labelledby="session-phrases-subheading">
        <tbody role="rowgroup">
          {sessionOverview.map(phrase => <SessionOverviewRow key={phrase.id} data={phrase} />)}
        </tbody>
        </table>
      }
      {!sessionOverview.lenght && <p>Здесь появятся фразы, с которыми вы поработали</p>}
    </div>
  )
}