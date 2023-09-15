import PropTypes from 'prop-types';

import { useState } from "react"

import ButtonDefault from '../buttonDefault/ButtonDefault'
import CardCheckStatus from '../cardCheckStatus/CardCheckStatus'
import styles from './cardsItem.module.css'


export default function CardsItem({ data, onCheckStatusChange }) {
  const [ isRussian, setIsRussian ] = useState(true)

  let selfCheckHint
  if (data.selfCheckStatus === 'unset') {
    selfCheckHint = 'Без ответа'
  } else if (data.selfCheckStatus === 'correct') {
    selfCheckHint = 'Отмечено как верно'
  } else {
    selfCheckHint = 'Отмечено как неверно'
  }
  
  function handleChangeView() {
    setIsRussian(!isRussian)
  }

  function handleReset() {
    setIsRussian(true);
    onCheckStatusChange({id: data.id, selfCheckStatus: 'unset'})
  }

  function handleCardStatus(result) {
    onCheckStatusChange({id: data.id, selfCheckStatus: result})
  }

  return (
    <div 
      className={`${data.selfCheckStatus != 'unset' && data.selfCheckStatus} ${styles.cardsItem}`} 
      key={data.id}
      data-testid="container-card"
    >
      
      <h3 aria-live="polite" id={data.id} data-testid="text-phrase">
        <span hidden={!isRussian}>{data.russian}</span>
        <span hidden={isRussian}>{data.serbian}</span>
      </h3>

      <div aria-live="off">
        <ButtonDefault test="button-answer" handleClick={handleChangeView}>
          {isRussian ? 'Показать ответ' : 'Скрыть ответ'}
        </ButtonDefault>
        {data.selfCheckStatus !== 'unset' && <CardCheckStatus status={data.selfCheckStatus}/>}
      </div>

      <hr aria-hidden="true"></hr>
      <h4 className="visually-hidden">Самопроверка</h4>
      <div aria-live="polite">
        {data.selfCheckStatus === 'unset' && 
          <>
            <ButtonDefault
              test="button-correct" 
              handleClick={() => handleCardStatus('correct')} 
              disabled={isRussian || data.selfCheckStatus !== 'unset'}
              checkStatus="correct"
            >
              Верно
            </ButtonDefault>
            <ButtonDefault 
              test="button-wrong" 
              handleClick={() => handleCardStatus('wrong')}  
              disabled={isRussian || data.selfCheckStatus !== 'unset'}
              checkStatus="wrong"
              >
                Неверно
            </ButtonDefault>
          </>
        }
        {/* <p 
          className="visually-hidden"
          hidden={data.selfCheckStatus === 'unset'}
          >
         Отмечено как {data.selfCheckStatus === 'correct' ? 'верно' : 'неверно'}
        </p> */}
        <p 
          className="visually-hidden"
          >
         
          {selfCheckHint}
        </p>
        
        <ButtonDefault 
            test="button-reset" 
            handleClick={handleReset}
            hidden={data.selfCheckStatus === 'unset'}
          >
            Сбросить
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