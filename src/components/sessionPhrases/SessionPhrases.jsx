import { useSelector } from "react-redux"
import { selectSessionPhrases } from "../../features/phrases/phrasesSlice"

import SessionPhrasesRow from "../sessionPhrasesRow/SessionPhrasesRow"

import style from "./SessionPhrases.module.css"

export default function SessionPhrases() {
  const sessionPhrases = useSelector(selectSessionPhrases)

  return(
    <div className={style.sessionPhrases}>
      <h3 id="session-phrases-subheading">Фразы в этой сессии</h3>
      {sessionPhrases.length > 0 && 
        <table role="table" aria-labelledby="session-phrases-subheading">
        <tbody role="rowgroup">
          {sessionPhrases.map(phrase => <SessionPhrasesRow key={phrase.id} data={phrase} />)}
        </tbody>
        </table>
      }
      {!sessionPhrases.lenght && <p>Здесь появятся фразы, с которыми вы поработали</p>}
    </div>
  )
}