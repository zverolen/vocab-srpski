import { useSelector } from "react-redux"

import { 
          selectCurrentPhrase,
        } from "./phrasesSlice"

import CardsItem from "../../components/cardsItem/CardsItem"

export default function Phrases() {
  const currentPhrase = useSelector(selectCurrentPhrase)

  return (
    <>
      <CardsItem key={currentPhrase.id} data={currentPhrase} onCheckStatusChange={()=>{}} onLanguageChange={() => {}} />
    </>
  )
}