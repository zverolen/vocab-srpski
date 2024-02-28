
import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg' 
// import CardsContainer from './components/cardsContainer/CardsContainer'
import { phrases } from './data/data'
// import Footer from './components/footer/Footer'
import Alert from './components/alert/Alert'
// import Header from './components/header/Header'
import HeaderTwo from './components/headerTwo/HeaderTwo'
import FooterTwo from './components/footerTwo/FooterTwo'
// import ContainerOne from './components/containerOne/ContainerOne'
import Phrases from './features/phrases/Phrases'
import Stats from './components/stats/Stats'
import StatsItem from './components/statsItem/StatsItem'

import { selectTotalNumberOfPhrases } from './features/phrases/phrasesSlice'
import { useSelector } from 'react-redux'

// const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  // console.log(prefersReducedMotion)

function App() {
  // useEffect(() => {
  // const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  // console.log(prefersReducedMotion)
  // }, [])

  // const [allPhrases, setAllPhrases] = useState(phrases.map(phrase => {
  //   return {...phrase, selfCheckStatus: 'withoutAnswer', isRussian: true} 
  // }))
  // const [updatedTab, setUpdatedTab] = useState('withoutAnswer')
  // const [isAlertVisible, setIsAlertVisible] = useState(false)

  // function handleCheckStatusChange(phraseData) {
  //   const result = allPhrases.map(phrase => {
  //     if (phrase.id !== phraseData.id) {
  //       return phrase
  //     } else {
  //       return {
  //         ...phrase,
  //         selfCheckStatus: phraseData.selfCheckStatus,
  //         isRussian: phraseData.selfCheckStatus === 'withoutAnswer' ? true : phraseData.isRussian
  //       }
  //     }
  //   })

  //   if (!prefersReducedMotion.matches) {
  //     setTimeout(() => {
  //       setAllPhrases(result)
  //       setUpdatedTab(phraseData.selfCheckStatus)
  //       setIsAlertVisible(true)
  //     }, 1000)

  //     setTimeout(() => {
  //       setIsAlertVisible(false)
  //     }, 4500)
  //   } else {
  //     setAllPhrases(result)
  //     setUpdatedTab(phraseData.selfCheckStatus)
  //     setIsAlertVisible(true)

  //     setTimeout(() => {
  //       setIsAlertVisible(false)
  //     }, 3500)
  //   }
    
  // }

  // function handleLanguageChange(phraseData) {
  //   const result = allPhrases.map(phrase => {
  //     if (phrase.id !== phraseData.id) {
  //       return phrase
  //     } else {
  //       return {
  //         ...phrase,
  //         isRussian: phraseData.isRussian
  //       }
  //     }
  //   })
  //   setAllPhrases(result)
  // }

  const allPhrasesNumber = useSelector(selectTotalNumberOfPhrases)
  // console.log(allPhrasesNumber)

  const [phraseStatus, setPhraseStatus] = useState(null)

  function findPhraseStatus(status) {
    setPhraseStatus(status)
  }

  return (
    <div className="layout site-frame">
      <HeaderTwo />
      {/* <CardsContainer 
        phrases={allPhrases} 
        onCheckStatusChange={handleCheckStatusChange} 
        updatedTab={updatedTab}
        onLanguageChange={handleLanguageChange}
      /> */}
      <aside>
        <Stats>
          <StatsItem id="remaining" name="Осталось" statNum="10" statPercent="100" />
          <StatsItem id="correct" name="Знаю!" statNum="0" statPercent="0" />
          <StatsItem id="wrong" name="Учу!" statNum="0" statPercent="0" />
        </Stats>
      </aside>
      <main>
        <Phrases onPhraseFinish={findPhraseStatus} />
      </main>
      <FooterTwo />
      {/* <Alert phraseTab={updatedTab} isVisible={isAlertVisible} /> */}
    </div>
  )
}

export default App
