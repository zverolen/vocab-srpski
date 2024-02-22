import { useDispatch } from "react-redux"

import { setNextPhraseId } from '../../features/phrases/phrasesSlice'

import style from "./WorkingArea.module.css"

export default function WorkingArea({ data }) {
  const dispatch = useDispatch()

  function handlePhraseChange() {
    dispatch(setNextPhraseId())
    console.log('click')
  }

  return(
    <div className={style.workingArea}>
      <p>{data.russian}</p>
      <div>
        <button onClick={handlePhraseChange}>Проверить</button>
        <button onClick={handlePhraseChange}>Пропустить</button>
      </div>
    </div>
  )
}