import { useDispatch, useSelector } from "react-redux"

import { setNextPhraseId, setPhraseSessionStatus, selectCurrentPhrase } from '../../features/phrases/phrasesSlice'

import style from "./Practice.module.css"
import { useState } from "react"

const note = <p>Фразы закончились! Начните сессию снова или поработайте с отдельными фразами.</p>

export default function Practice() {
  const [phraseProgress, setPhraseProgress] = useState('new')

  const dispatch = useDispatch()
  const currentPhrase = useSelector(selectCurrentPhrase)

  let phraseContent
  let buttons

  if (currentPhrase) {
    if (phraseProgress === 'new') {

      phraseContent = <div><p>{currentPhrase.russian}</p></div>
      buttons = <div>
                  <button onClick={() => handlePhraseCheck('revealed')}>Проверить</button>
                  <button onClick={() => handlePhraseChange('skipped')}>Пропустить</button>
                </div>
  
    } else if (phraseProgress === 'revealed') {
  
      phraseContent = <div><p>{currentPhrase.serbian}</p></div>
      buttons = <div>
                  <button onClick={() => handlePhraseCheck('correct')}>Знаю!</button>
                  <button onClick={() => handlePhraseCheck('wrong')}>Учу!</button>
                </div>
  
    } else if (phraseProgress === 'correct') {
  
      phraseContent = <div><p>Знаю: </p><p><span>{currentPhrase.russian}</span> <span> | </span><span>{currentPhrase.serbian}</span></p></div>
      buttons = <div>
                  <button onClick={() => handlePhraseChange('correct')}>Закончить</button>
                  <button onClick={() => handlePhraseChange('wrong')}>Повторить</button>
                </div>
  
    } else if (phraseProgress === 'wrong') {
  
      phraseContent = <div><p>Учу: </p><p><span>{currentPhrase.russian}</span> <span> | </span><span>{currentPhrase.serbian}</span></p></div>
      buttons = <div>
                  <button onClick={() => handlePhraseChange('correct')}>Закончить</button>
                  <button onClick={() => handlePhraseChange('wrong')}>Попробовать снова</button>
                </div>
  
    }
  } 

  function handlePhraseCheck(step) {
    setPhraseProgress(step)
  }

  function handlePhraseChange(status) {
    
    dispatch(setPhraseSessionStatus({id: currentPhrase.id, phraseSessionStatus: status}))
    dispatch(setNextPhraseId())

    setPhraseProgress('new')
  }

  return(
    <div className={style.workingArea}>
      <div className="phraseContent">
        {currentPhrase && phraseContent}
        <div>
          {currentPhrase && buttons}
          {!currentPhrase && note}
        </div>
      </div>
    </div>
  )
}