import { useSelector } from "react-redux"

import StatsItem from "../statsItem/StatsItem"

import style from "./Stats.module.css"


import { 
  selectTotalNumberOfPhrases,
  selectNumberOfNewPhrases,
  selectNumberOfCorrectPhrases,
  selectNumberOfWrongPhrases,
} from '../../features/phrases/phrasesSlice'

export default function Stats() {
  // in research
  const allPhrasesNum = useSelector(selectTotalNumberOfPhrases)

  const newPhrasesNum = useSelector(selectNumberOfNewPhrases)
  const newPhrasesPercent = newPhrasesNum * 100 / allPhrasesNum
  
  const correctPhrasesNum = useSelector(selectNumberOfCorrectPhrases)
  const correctPhrasesPercent = correctPhrasesNum * 100 / allPhrasesNum

  const wrongPhrasesNum = useSelector(selectNumberOfWrongPhrases)
  const wrongPhrasesPercent = wrongPhrasesNum * 100 / allPhrasesNum

  return(
    <div id="stats" className={style.stats}>
      <h2>Эта сессия:</h2>
      <div>
        <StatsItem id="remaining" name="Осталось" statNum={newPhrasesNum} statPercent={newPhrasesPercent} />
        <StatsItem id="correct" name="Знаю!" statNum={correctPhrasesNum} statPercent={correctPhrasesPercent} />
        <StatsItem id="wrong" name="Учу!" statNum={wrongPhrasesNum} statPercent={wrongPhrasesPercent} />
      </div>
      <a href="#">Вся статистика</a>
    </div>
  )
}