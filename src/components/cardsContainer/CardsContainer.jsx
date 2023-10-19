import PropTypes from 'prop-types'
import { useMemo } from 'react'

import CardsItem from '../cardsItem/CardsItem'
import Instruction from '../instruction/Instruction'
import { copy } from '../../data/copy';
import TabsComponent from '../TabsComponent/TabsComponent';

const tabpanelReference = [
  {id: '0', tempContent: 'CONTENT TABPANEL 1'},
  {id: '1', tempContent: 'CONTENT TABPANEL 2'},
  {id: '2', tempContent: 'CONTENT TABPANEL 3'}
]

const tabsReference = [copy.tabs.withoutAnswer, copy.tabs.correct, copy.tabs.wrong];

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
        <h2 className='visually-hidden'>{copy.phrases.heading}</h2>
        <TabsComponent 
          tabs={ tabsReference } 
          tabpanels={ tabpanelReference } 
          scoreAll={unsetPhrases2.length.toString()} 
          scoreCorrect={correctPhrases2.length.toString()} 
          scoreWrong={wrongPhrases2.length.toString()}
          allPhrases={unsetPhrases2}
          correctPhrases={correctPhrases2}
          wrongPhrases={wrongPhrases2}
        /> 
      </div>
      
      {/* <div>
        
        <div className="cards-container">
          {content}
        </div>
      </div> */}
    </div>
  )
}

CardsContainer.propTypes = {
  phrases: PropTypes.array.isRequired,
  autoSortOn: PropTypes.bool.isRequired,
  onCheckStatusChange: PropTypes.func.isRequired
}