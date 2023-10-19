// Implementation details:
// Using a keyboard and a mouse in the tabs component moves the focus to corresponding tabs.
// The state changes depending on which element receives focus and not which element was activated
// This was done because there are two types of events that activate tabs, but it's intended
// that the state is changed in one place.
// Focus-dependent behavior also facilitates compatibility with keyboard navigation and 
// using screen readers. 
// Tabs are implemented manually and are not generated to make it possible to control the focus. This is intentional

import PropTypes from 'prop-types'

import { useRef, useState } from "react"
import Tab from '../tab/Tab'
import TabPanel from '../tabPanel/TabPanel'
import CardsItem from '../cardsItem/CardsItem'
import { copy } from '../../data/copy'

export default function TabsComponent({ tabs, scoreAll, scoreCorrect, scoreWrong, withoutAnswerPhrases, correctPhrases, wrongPhrases, onCheckStatusChange }) {
  const [ selectedTab, setSelectedTab ] = useState('0')
  const tab1 = useRef(null)
  const tab2 = useRef(null)
  const tab3 = useRef(null)

  function handleSelect(id) {
    setSelectedTab(id)
  }

  function handleTabSelection({id, key}) {
    const idNumber = Number(id)
    const tabLast = tabs.length - 1
    const refList = [ tab1, tab2, tab3]

    switch(key) {
      case 'Home': 
        // setSelectedTab('0')
        refList[0].current.focus()
        break
      case 'End':
        // setSelectedTab((tabs.length - 1).toString())
        refList[refList.length - 1].current.focus()
        break
      case 'ArrowRight':
        if (idNumber < tabLast) {
          // setSelectedTab((idNumber + 1).toString())
          refList[idNumber + 1].current.focus()
        }
        break
      case 'ArrowLeft':
        if (idNumber > 0) {
          // setSelectedTab((idNumber - 1).toString())
          refList[idNumber - 1].current.focus()
        }
        break
      default:
        break
    }
  }
  
  return (
    <>
      <h2 className="visually-hidden" id="tabs-heading">{copy.phrases.heading}</h2>
      <div role="tablist" data-testid="tablist" aria-labelledby="tabs-heading">
        <Tab 
          id="0" 
          isSelected={ selectedTab === 0} 
          onNavigation={ handleTabSelection } 
          onSelect={ handleSelect }
          ref={ tab1 }
          score={scoreAll}
        >
          { tabs[0] }
        </Tab>
        <Tab 
          id="1"
          isSelected={ selectedTab === 1} 
          onNavigation={handleTabSelection} 
          onSelect={ handleSelect }
          ref={ tab2 }
          score={scoreCorrect}
        >
          { tabs[1] }
        </Tab>
        <Tab 
          id="2" 
          isSelected={ selectedTab === 2} 
          onNavigation={handleTabSelection} 
          onSelect={ handleSelect }
          ref={ tab3 }
          score={scoreWrong}
        >
          { tabs[2] }
        </Tab>
      </div>
      <TabPanel id={selectedTab}>
        <div className="cards-container">
          {selectedTab === '0' && withoutAnswerPhrases.map(phrase => <CardsItem key={phrase.id} data={phrase} onCheckStatusChange={onCheckStatusChange} />)}
          {selectedTab === '1' && correctPhrases.map(phrase => <CardsItem key={phrase.id} data={phrase} onCheckStatusChange={onCheckStatusChange} />)}
          {selectedTab === '2' && wrongPhrases.map(phrase => <CardsItem key={phrase.id} data={phrase} onCheckStatusChange={onCheckStatusChange} />)}
        </div>
      </TabPanel>
    </>
  )
}

TabsComponent.propTypes = {
  tabs: PropTypes.array.isRequired,
  scoreAll: PropTypes.string,
  scoreCorrect: PropTypes.string,
  scoreWrong: PropTypes.string,
  withoutAnswerPhrases: PropTypes.array,
  correctPhrases: PropTypes.array,
  wrongPhrases: PropTypes.array,
  onCheckStatusChange: PropTypes.func
}