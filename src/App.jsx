// Implementation details:
//1) Global state is kept high because the learning part might change with the 2d release dramatically
//2) Props drilling is left unattended for now
import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg' 
import CardsContainer from './components/cardsContainer/CardsContainer'
import { phrases } from './data/data'
import Footer from './components/footer/Footer'
import Alert from './components/alert/Alert'
import Header from './components/header/Header'

function App() {
  const [allPhrases, setAllPhrases] = useState(phrases.map(phrase => {
    return {...phrase, selfCheckStatus: 'unset'} 
  }))
  const [updatedTab, setUpdatedTab] = useState('unset')
  const [isAlertVisible, setIsAlertVisible] = useState(false)

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

    setTimeout(() => {
      setAllPhrases(result)
      setUpdatedTab(phraseData.selfCheckStatus)
      setIsAlertVisible(true)
    }, 1000)

    setTimeout(() => {
      setIsAlertVisible(false)
    }, 4500)
    
  }

  return (
    <>
      <Header></Header>
      <CardsContainer phrases={allPhrases} onCheckStatusChange={handleCheckStatusChange} updatedTab={updatedTab}/>
      <Footer />
      <Alert phraseTab={updatedTab} isVisible={isAlertVisible} />
    </>
  )
}

export default App
