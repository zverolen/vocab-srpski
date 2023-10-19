import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Header from './components/header/Header'
import CardsContainer from './components/cardsContainer/CardsContainer'
import { phrases } from './data/data'
import { copy } from './data/copy'
import TabsComponent from './components/TabsComponent/TabsComponent'
import Footer from './components/footer/Footer'

const tabsReference = [
  { id: '0', caption: copy.tabs.withoutAnswer },
  { id: '1', caption: copy.tabs.correct },
  { id: '2', caption: copy.tabs.wrong }
]

const tabpanelReference = [
  {id: '0', tempContent: 'CONTENT TABPANEL 1'},
  {id: '1', tempContent: 'CONTENT TABPANEL 2'},
  {id: '2', tempContent: 'CONTENT TABPANEL 3'}
]

function App() {
  const [isAutoSortOn, setIsAutoSortOn] = useState(false)
  const [allPhrases, setAllPhrases] = useState(phrases.map(phrase => {
    return {...phrase, selfCheckStatus: 'unset'} 
  }))

  function handleAutoSortToggle() {
    setIsAutoSortOn(!isAutoSortOn)
  }

  function handleCheckStatusChange(phraseData) {
    const result = allPhrases.map(phrase => {
      if (phrase.id !== phraseData.id) {
        return phrase
      } else {
        return {
          ...phrase,
          selfCheckStatus: phraseData.selfCheckStatus
        }
      }
    })
    setAllPhrases(result)
  }

  return (
    <>
      <main>
        <div>
          <h1>{copy.title.heading}</h1>
          <p>{copy.title.subheading}</p>
        </div>
        <TabsComponent tabs={ tabsReference } tabpanels={ tabpanelReference } />
        <CardsContainer 
          autoSortOn={isAutoSortOn} 
          onCheckStatusChange={handleCheckStatusChange}
          phrases={allPhrases}
          />
      </main>
      <Footer />
    </>
  )
}

export default App
