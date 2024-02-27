import { useSelector } from "react-redux"

import StatsItem from "../statsItem/StatsItem"

import style from "./Stats.module.css"


import { selectNumberOfNewPhrases, selectTotalNumberOfPhrases } from '../../features/phrases/phrasesSlice'

export default function Stats() {
  const allPhrasesNum = useSelector(selectTotalNumberOfPhrases)
  const newPhrasesNum = useSelector(selectNumberOfNewPhrases)
  const newPhrasesPercent = newPhrasesNum * 100 / allPhrasesNum
  return(
    <div id="stats" className={style.stats}>
      <h2>Эта сессия:</h2>
      <div>
        <StatsItem id="remaining" name="Осталось" statNum={newPhrasesNum} statPercent={newPhrasesPercent} />
        <StatsItem id="correct" name="Знаю!" statNum="0" statPercent="0" />
        <StatsItem id="wrong" name="Учу!" statNum="0" statPercent="0" />
      </div>
      <a href="#">Вся статистика</a>
    </div>
  )
}