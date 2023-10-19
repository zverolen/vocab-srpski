import PropTypes from 'prop-types'
import { useMemo } from 'react'

import Instruction from '../instruction/Instruction'
import { copy } from '../../data/copy';
import TabsComponent from '../TabsComponent/TabsComponent';

const tabsReference = [copy.tabs.withoutAnswer, copy.tabs.correct, copy.tabs.wrong];

export default function CardsContainer({ phrases, onCheckStatusChange }) {
  const unsetPhrases = useMemo(
    () => phrases.filter(phrase => phrase.selfCheckStatus === 'unset'),
    [phrases]
  )
  const correctPhrases = useMemo(
    () => phrases.filter(phrase => phrase.selfCheckStatus === 'correct'),
    [phrases]
  )
  const wrongPhrases = useMemo(
    () => phrases.filter(phrase => phrase.selfCheckStatus === 'wrong'),
    [phrases]
  )
  

  return (
    <div className="siteFrame">
      <Instruction />
      <div>
        <h2 className='visually-hidden'>{copy.phrases.heading}</h2>
        <TabsComponent 
          tabs={ tabsReference } 
          scoreAll={unsetPhrases.length.toString()} 
          scoreCorrect={correctPhrases.length.toString()} 
          scoreWrong={wrongPhrases.length.toString()}
          withoutAnswerPhrases={unsetPhrases}
          correctPhrases={correctPhrases}
          wrongPhrases={wrongPhrases}
          onCheckStatusChange={onCheckStatusChange}
        /> 
      </div>
    </div>
  )
}

CardsContainer.propTypes = {
  phrases: PropTypes.array.isRequired,
  onCheckStatusChange: PropTypes.func.isRequired
}