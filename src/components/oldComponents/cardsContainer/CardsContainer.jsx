import PropTypes from 'prop-types'
import { useMemo } from 'react'

import Instruction from '../instruction/Instruction'
import { copy } from '../../data/copy';
import TabsComponent from '../tabsComponent/TabsComponent'

const tabsReference = [copy.tabs.withoutAnswer, copy.tabs.correct, copy.tabs.wrong];

export default function CardsContainer({ 
    phrases, 
    onCheckStatusChange,
    onLanguageChange,
    updatedTab
  }) {
  const withoutAnswerPhrases = useMemo(
    () => phrases.filter(phrase => phrase.selfCheckStatus === 'withoutAnswer'),
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
    <main className="content">
      <Instruction />
      <h2 className='visually-hidden'>{copy.phrases.heading}</h2>
      <TabsComponent 
        tabs={ tabsReference } 
        scoreAll={withoutAnswerPhrases.length.toString()} 
        scoreCorrect={correctPhrases.length.toString()} 
        scoreWrong={wrongPhrases.length.toString()}
        withoutAnswerPhrases={withoutAnswerPhrases}
        correctPhrases={correctPhrases}
        wrongPhrases={wrongPhrases}
        onCheckStatusChange={onCheckStatusChange}
        onLanguageChange={onLanguageChange}
        updatedTab={updatedTab}
      /> 
    </main>
  )
}

CardsContainer.propTypes = {
  phrases: PropTypes.array.isRequired,
  onCheckStatusChange: PropTypes.func.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  updatedTab: PropTypes.string.isRequired
}