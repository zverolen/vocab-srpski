import { useSelector } from "react-redux"

import { selectAllPhrases } from "../../features/phrases/phrasesSlice"
import PhrasesAllRow from "./PhrasesAllRow"

export default function PhrasesAll() {
  const allPhrases = useSelector(selectAllPhrases)
  // console.log(allPhrases)
  return(
    <>
    <h3>Статистика за всё время.</h3>
    <table role="table">
      <tbody role="rowgroup">
        <tr>
          <th scope="col">Фраза на русском</th>
          <th scope="col">Фраза на сербском</th>
          <th scope="col">Знаю!</th>
          <th scope="col">Учу!</th>
          <th scope="col">Всего</th>
        </tr>
        {allPhrases.map(phrase => <PhrasesAllRow key={phrase.id} data={phrase} />)}
      </tbody>
    </table>
    </>
  )
}