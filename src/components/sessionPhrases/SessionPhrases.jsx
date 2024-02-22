import SessionPhrasesRow from "../sessionPhrasesRow/SessionPhrasesRow"

import style from "./SessionPhrases.module.css"

const data = {
  id: '2',
  serbian: 'To nije njegov sat.',
  russian: 'Это не его часы.',
  section: 'R1'
}

export default function SessionPhrases() {
  return(
    <div className={style.sessionPhrases}>
      <table role="table">
        <caption>Фразы в этой сессии</caption>
        <tbody role="rowgroup">
          <SessionPhrasesRow key={data.id} data={data} />
          <SessionPhrasesRow key={data.id} data={data} />
          <SessionPhrasesRow key={data.id} data={data} />
          <SessionPhrasesRow key={data.id} data={data} />
          <SessionPhrasesRow key={data.id} data={data} />
          <SessionPhrasesRow key={data.id} data={data} />
          <SessionPhrasesRow key={data.id} data={data} />
        </tbody>
      </table>
    </div>
  )
}