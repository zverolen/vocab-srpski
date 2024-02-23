import { useDispatch } from "react-redux"

import { setNextPhraseId, setSessionStatus } from '../../features/phrases/phrasesSlice'

import style from "./WorkingArea.module.css"
import { useState } from "react"

export default function WorkingArea({ data }) {
  const [isRussian, setIsRussian] = useState(true)
  const dispatch = useDispatch()

  function handlePhraseChange(status) {
    dispatch(setNextPhraseId())
    dispatch(setSessionStatus('correct'))
  }

  function handlePhraseCheck() {
    setIsRussian(!isRussian)
  }

  return(
    <div className={style.workingArea}>
      <p>{isRussian ? data.russian : data.serbian}</p>
      <div>
        <button onClick={handlePhraseCheck}>Проверить</button>
        <button onClick={handlePhraseChange}>Пропустить</button>
      </div>
    </div>
  )
}