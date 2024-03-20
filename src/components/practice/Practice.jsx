import { useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import { 
  setPhraseSessionStatus,
  selectCurrentPhrase,
  setOrderForPhrasesInPractice,
  updatePhraseCount
} from '../../features/phrases/phrasesSlice'

import style from "./Practice.module.css"

export default function Practice() {
  const [phraseProgress, setPhraseProgress] = useState('new')

  const dispatch = useDispatch()
  const currentPhrase = useSelector(selectCurrentPhrase)

  const practiceRef = useRef(null)

  let phraseContent
  let buttons
  const note = <span>Фразы закончились! Начните сессию снова или поработайте с отдельными фразами.</span>

  if (currentPhrase) {
    if (phraseProgress === 'new') {
      // console.log(currentPhrase)
      phraseContent = <span>{currentPhrase.russian}</span>
      buttons = <div>
                  <button onClick={() => handlePhraseCheck('revealed')}>Проверить</button>
                  <button onClick={() => handlePhraseChange('skipped')}>Пропустить</button>
                </div>
  
    } else if (phraseProgress === 'revealed') {
  
      phraseContent = <span lang='sr-RS'>{currentPhrase.serbian}</span>
      buttons = <div>
                  <button onClick={() => handlePhraseCheck('correct')}>Знаю!</button>
                  <button onClick={() => handlePhraseCheck('wrong')}>Учу!</button>
                </div>
  
    } else if (phraseProgress === 'correct') {
  
      phraseContent = <><span>Знаю: </span><span lang='sr-RS'>{currentPhrase.serbian} </span><span>{`(${currentPhrase.russian})`}</span></>
      buttons = <div>
                  <button onClick={() => handlePhraseChange('correct')}>Закончить</button>
                  <button onClick={() => handlePhraseChange('new')}>Повторить</button>
                </div>
  
    } else if (phraseProgress === 'wrong') {
  
      phraseContent = <><span>Учу: </span><span lang='sr-RS'>{currentPhrase.serbian} </span><span>{`(${currentPhrase.russian})`}</span></>
      buttons = <div>
                  <button onClick={() => handlePhraseChange('wrong')}>Закончить</button>
                  <button onClick={() => handlePhraseChange('new')}>Попробовать снова</button>
                </div>
  
    }
  } 

  function handlePhraseCheck(step) {
    setPhraseProgress(step)
    practiceRef.current.focus()
  }

  function handlePhraseChange(status) {

    dispatch(setOrderForPhrasesInPractice({id: currentPhrase.id, phraseSessionStatus: status}))
    dispatch(setPhraseSessionStatus({id: currentPhrase.id, phraseSessionStatus: status}))

    if (status === 'correct' || status === 'wrong') {
      dispatch(updatePhraseCount({id: currentPhrase.id, status: status}))
    }
    
    setPhraseProgress('new')

    practiceRef.current.focus()
  }

  return(
    <div id="practice" className={style.practice} >
      <h2>{phraseProgress === 'correct' || phraseProgress === 'wrong' ? 'Результат' : 'Как сказать по-сербски?'}</h2>
      <div>
        <div>
          <p tabIndex="0" ref={practiceRef}  data-testid="practice-phrase">
            {currentPhrase ? phraseContent : note}
          </p>
        </div>
        <div>
          {currentPhrase && buttons}
        </div>
      </div>
    </div>
  ) 
}