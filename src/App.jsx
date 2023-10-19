// Implementation details:
//1) Global state is kept high because the learning part might change with the 2d release dramatically
//2) Props drilling is left unattended for now
import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import CardsContainer from './components/cardsContainer/CardsContainer'
import { phrases } from './data/data'
import { copy } from './data/copy'
import Footer from './components/footer/Footer'

function App() {
  const [allPhrases, setAllPhrases] = useState(phrases.map(phrase => {
    return {...phrase, selfCheckStatus: 'unset'} 
  }))

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
        <CardsContainer phrases={allPhrases} onCheckStatusChange={handleCheckStatusChange} />
      </main>
      <Footer />
    </>
  )
}

export default App
