import PropTypes from 'prop-types'; 
import { useState, useRef } from "react"

import ButtonDefault from '../buttonDefault/ButtonDefault'
import { copy } from '../../data/copy';

export default function CardsItem({ data, onCheckStatusChange }) {
  const [ isRussian, setIsRussian ] = useState(true)
  let cardRef = useRef(null)

  let selfCheckHint
  if (data.selfCheckStatus === 'unset') {
    selfCheckHint = 'Без ответа'
  } else if (data.selfCheckStatus === 'correct') {
    selfCheckHint = 'Отмечено как знаю'
  } else {
    selfCheckHint = 'Отмечено как учу'
  }
  
  function handleChangeView() {
    setIsRussian(!isRussian)
  }

  function handleCardStatusChange(result) {
    onCheckStatusChange({id: data.id, selfCheckStatus: result})
    cardRef.current.classList.add(result, 'updated')
    if (result === 'unset') {
      setIsRussian(true);
      cardRef.current.classList.remove('correct', 'wrong')
    }
  }

  return (
    <div 
      className={`${data.selfCheckStatus != 'unset' ? data.selfCheckStatus : ''} card`}
      key={data.id}
      data-testid="container-card"
      ref={cardRef}
    >
      
      <div>
        <div aria-live="polite" id={data.id} data-testid="text-phrase">
          <p hidden={!isRussian}>{data.russian}</p>
          <p translate='no' lang="sr-RS" hidden={isRussian}>{data.serbian}</p>
        </div>

        <div aria-live="off">
          <ButtonDefault test="button-answer" handleClick={handleChangeView}>
            {isRussian ? copy.buttons.revealAnswer : copy.buttons.hideAnswer}
          </ButtonDefault>
        </div>
      </div>

      
      <div aria-live="polite">
        {data.selfCheckStatus === 'unset' && 
          <>
            <ButtonDefault
              test="button-correct" 
              handleClick={() => handleCardStatusChange('correct')} 
              disabled={isRussian || data.selfCheckStatus !== 'unset'}
              checkStatus="correct"
            >
              {copy.buttons.correct}
            </ButtonDefault>
            <ButtonDefault 
              test="button-wrong" 
              handleClick={() => handleCardStatusChange('wrong')}  
              disabled={isRussian || data.selfCheckStatus !== 'unset'}
              checkStatus="wrong"
              >
                {copy.buttons.wrong}
            </ButtonDefault>
          </>
        }
        <p 
          className="visually-hidden"
          >
          {selfCheckHint}
        </p>
        
        <ButtonDefault 
            test="button-reset" 
            handleClick={() => handleCardStatusChange('unset')}
            hidden={data.selfCheckStatus === 'unset'}
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
    selfCheckStatus: PropTypes.string
  }),
  onCheckStatusChange: PropTypes.func
}