import PropTypes from 'prop-types'
import { useMemo } from 'react'

import CardsItem from '../cardsItem/CardsItem'
import Instruction from '../instruction/Instruction'
import { copy } from '../../data/copy';

export default function CardsContainer({phrases, autoSortOn, onCheckStatusChange}) {
  const unsetPhrases2 = useMemo(
    () => phrases.filter(phrase => phrase.selfCheckStatus === 'unset'),
    [phrases]
  )
  const correctPhrases2 = useMemo(
    () => phrases.filter(phrase => phrase.selfCheckStatus === 'correct'),
    [phrases]
  )
  const wrongPhrases2 = useMemo(
    () => phrases.filter(phrase => phrase.selfCheckStatus === 'wrong'),
    [phrases]
  )
  
  let content 

  if (autoSortOn) {
    // const uncheckedPhrases = phrases.filter(phrase => phrase.selfCheckStatus === 'unset')
    // const correctPhrases = phrases.filter(phrase => phrase.selfCheckStatus === 'correct')
    // const wrongPhrases = phrases.filter(phrase => phrase.selfCheckStatus === 'wrong')
    content = (
      <>
        {unsetPhrases2.map(phrase => <CardsItem key={phrase.id} data={phrase} onCheckStatusChange={onCheckStatusChange}/>)}
        {correctPhrases2.map(phrase => <CardsItem key={phrase.id} data={phrase} onCheckStatusChange={onCheckStatusChange}/>)}
        {wrongPhrases2.map(phrase => <CardsItem key={phrase.id} data={phrase} onCheckStatusChange={onCheckStatusChange}/>)}
      </>
    )
  } else {
    content = phrases.map(phrase => <CardsItem key={phrase.id} data={phrase} onCheckStatusChange={onCheckStatusChange}/>)
  }

  return (
    <div className="siteFrame">
      <Instruction />
      <div>
        <div>{copy.correct}: <span>{correctPhrases2.length}</span></div>
        <div>Неверно: <span>{wrongPhrases2.length}</span></div>
        <div>Осталось: <span>{unsetPhrases2.length}</span></div>
      </div>
      <div>
        <h2 className='visually-hidden'>{copy.phrases.heading}</h2>
        {/* <div className={styles.cardsContainer}> */}
        <div className="cards-container">
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