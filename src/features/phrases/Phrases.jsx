import { useDispatch, useSelector } from "react-redux"

import { selectAllPhrases } from "./phrasesSlice"

import CardsItem from "../../components/cardsItem/CardsItem"

export default function Phrases() {
  const dispatch = useDispatch()

  const allPhrases = useSelector(selectAllPhrases)

  return (
    <div style={{width: '100%'}}>
      { allPhrases.map(phrase => <CardsItem key={phrase.id} data={phrase} onCheckStatusChange={()=>{}} onLanguageChange={() => {}} />) }
    </div>
  )
}