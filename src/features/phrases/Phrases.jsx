import { useSelector } from "react-redux"

import { 
          selectCurrentPhrase,
        } from "./phrasesSlice"

import CardsItem from "../../components/cardsItem/CardsItem"
import WorkingArea from "../../components/workingArea/WorkingArea"
import SessionPhrases from "../../components/sessionPhrases/SessionPhrases"

export default function Phrases() {
  const currentPhrase = useSelector(selectCurrentPhrase)

  return (
    <>
      <h2>Как сказать по-сербски?</h2>
      <WorkingArea data={currentPhrase} />
      {/* <CardsItem key={currentPhrase.id} data={currentPhrase} onCheckStatusChange={()=>{}} onLanguageChange={() => {}} /> */}
      <SessionPhrases />
    </>
  )
}