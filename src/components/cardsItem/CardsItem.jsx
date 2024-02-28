import PropTypes from 'prop-types'
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"

import { setNextPhraseId } from '../../features/phrases/phrasesSlice'
import ButtonDefault from '../buttonDefault/ButtonDefault'
import { copy } from '../../data/copy';

import style from "./Card.module.css"

export default function CardsItem({ data, onCheckStatusChange, onLanguageChange  }) {
  // const [ isRussian, setIsRussian ] = useState(true)
  let cardRef = useRef(null)

  const dispatch = useDispatch()

  // let selfCheckHint
  // if (data.selfCheckStatus === 'withoutAnswer') {
  //   selfCheckHint = 'Без ответа'
  // } else if (data.selfCheckStatus === 'correct') {
  //   selfCheckHint = 'Отмечено как знаю'
  // } else {
  //   selfCheckHint = 'Отмечено как учу'
  // }

  function handlePhraseChange() {
    dispatch(setNextPhraseId())
    // console.log('click')
  }
  
  // function handleChangeView() {
  //   // setIsRussian(!isRussian)
  //   handleLanguageChange(!data.isRussian)
  // }

  // function handleCardStatusChange(result) {
  //   onCheckStatusChange({id: data.id, selfCheckStatus: result})
    // onLanguageChange({id: data.id, isRussian: true})

    // cardRef.current.classList.add(result, 'updated')
    // if (result === 'withoutAnswer') {
      // setIsRussian(true);
      // cardRef.current.classList.remove('correct', 'wrong')
      // onLanguageChange({id: data.id, isRussian: true})
  //   }
  // }

  // function handleLanguageChange() {
  //   onLanguageChange({id: data.id, isRussian: !data.isRussian})
  // }

  return (
    <div 
      className={`${data.selfCheckStatus != 'withoutAnswer' ? data.selfCheckStatus : ''} ${style.card} card`}
      key={data.id}
      data-testid="container-card"
      ref={cardRef}
    >
      
      <div>
        <div aria-live="polite" id={data.id} data-testid="text-phrase">
          <p hidden={!data.isRussian}>{data.russian}</p>
          <p translate='no' lang="sr-RS" hidden={data.isRussian}>{data.serbian}</p>
        </div>

        <div aria-live="off">
          <ButtonDefault test="button-answer" handleClick={handlePhraseChange}>
            {/* {isRussian ? copy.buttons.revealAnswer : copy.buttons.hideAnswer} */}
            {data.isRussian ? copy.buttons.revealAnswer : copy.buttons.hideAnswer}
          </ButtonDefault>
        </div>
      </div>

      
      <div aria-live="polite">
        {data.selfCheckStatus === 'withoutAnswer' && 
          <>
            <ButtonDefault
              test="button-correct" 
              handleClick={handlePhraseChange} 
              // disabled={isRussian || data.selfCheckStatus !== 'withoutAnswer'}
              disabled={data.isRussian || data.selfCheckStatus !== 'withoutAnswer'}
              checkStatus="correct"
            >
              {copy.buttons.correct}
            </ButtonDefault>
            <ButtonDefault 
              test="button-wrong" 
              handleClick={handlePhraseChange}  
              // disabled={isRussian || data.selfCheckStatus !== 'withoutAnswer'}
              disabled={data.isRussian || data.selfCheckStatus !== 'withoutAnswer'}
              checkStatus="wrong"
              >
                {copy.buttons.wrong}
            </ButtonDefault>
          </>
        }
        {/* <p 
          className="visually-hidden"
          >
          {selfCheckHint}
        </p> */}
        
        <ButtonDefault 
            test="button-reset" 
            handleClick={handlePhraseChange}
            hidden={data.selfCheckStatus === 'withoutAnswer'}
          >
            {copy.buttons.reset}
        </ButtonDefault>
      </div>
    </div>

  )
}

CardsItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    russian: PropTypes.string,
    serbian: PropTypes.string,
    section: PropTypes.string,
    selfCheckStatus: PropTypes.string,
    isRussian: PropTypes.bool
  }),
  onCheckStatusChange: PropTypes.func,
  onLanguageChange: PropTypes.func
}