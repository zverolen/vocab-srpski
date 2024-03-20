import { useSelector } from "react-redux"

import { selectPracticedPhrases } from "../../features/phrases/phrasesSlice"

import SessionOverviewRow from "../sessionOverviewRow/SessionOverviewRow"
import style from "./SessionOverview.module.css"

export default function SessionOverview() {
  const practicedPhrases = useSelector(selectPracticedPhrases)

  return(
    <div className={style.sessionOverview} id="sessionOverview">
      <h3 id="sessionPhrasesSubheading">Фразы в этой сессии:</h3>
      {practicedPhrases.length > 0 && 
        <table role="table" aria-labelledby="sessionPhrasesSubheading">
        <tbody role="rowgroup">
          {practicedPhrases.map(phrase => <SessionOverviewRow key={phrase.id} data={phrase} status={phrase.phraseSessionStatus} />)}
        </tbody>
        </table>
      }
      {!practicedPhrases.length && <p>Здесь появятся фразы, с которыми вы поработали</p>}
    </div>
  )
}