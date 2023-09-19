import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Header from './components/header/Header'
import CardsContainer from './components/cardsContainer/CardsContainer'
import { phrases } from './data/data'

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
      <Header autoSortOn={isAutoSortOn} onAutoSortToggle={handleAutoSortToggle} />
      <main>
        <h1>Сербский вслух</h1>
        <CardsContainer 
          autoSortOn={isAutoSortOn} 
          onCheckStatusChange={handleCheckStatusChange}
          phrases={allPhrases}
          />
      </main>
    </>
  )
}

export default App
