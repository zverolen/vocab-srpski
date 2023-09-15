import PropTypes from 'prop-types';

import CardsItem from '../cardsItem/CardsItem'
import styles from './cardsContainer.module.css'

export default function CardsContainer({phrases, autoSortOn, onCheckStatusChange}) {
  let content 

  if (autoSortOn) {
    const uncheckedPhrases = phrases.filter(phrase => phrase.selfCheckStatus === 'unset')
    const correctPhrases = phrases.filter(phrase => phrase.selfCheckStatus === 'correct')
    const wrongPhrases = phrases.filter(phrase => phrase.selfCheckStatus === 'wrong')
    content = (
      <>
        {uncheckedPhrases.map(phrase => <CardsItem key={phrase.id} data={phrase} onCheckStatusChange={onCheckStatusChange}/>)}
        {correctPhrases.map(phrase => <CardsItem key={phrase.id} data={phrase} onCheckStatusChange={onCheckStatusChange}/>)}
        {wrongPhrases.map(phrase => <CardsItem key={phrase.id} data={phrase} onCheckStatusChange={onCheckStatusChange}/>)}
      </>
    )
  } else {
    content = phrases.map(phrase => <CardsItem key={phrase.id} data={phrase} onCheckStatusChange={onCheckStatusChange}/>)
  }

  return (
    <div>
      <h2 className="visually-hidden">Инструкция</h2>
      <ol>
        <li>Выберите и переведите фразу с русского языка на сербский.</li>
        <li>Нажмите “Показать ответ”, чтобы проверить себя.</li>
        <li>Если вы ответили правильно, нажмите “Верно”, если неправильно, нажмите “Неверно”.</li>
        <li>Чтобы поработать с карточкой ещё раз, нажмите “Скрыть ответ” или “Сбросить”.</li>
      </ol>
      <div>
        <h2 className='visually-hidden'>Фразы</h2>
        <div className={styles.cardsContainer}>
          {content}
        </div>
      </div>
    </div>
  )
}

CardsContainer.propTypes = {
  phrases: PropTypes.array.isRequired,
  autoSortOn: PropTypes.bool.isRequired,
  onCheckStatusChange: PropTypes.func.isRequired
}