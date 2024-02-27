// import { useSelector } from "react-redux"

// import { selectCurrentPhrase } from "./phrasesSlice"

import Practice from "../../components/practice/Practice"
import SessionPhrases from "../../components/sessionOverview/SessionOverview"

export default function Phrases({ onPhraseFinish }) {
  // const currentPhrase = useSelector(selectCurrentPhrase)

  return (
    <>
      <h2>Как сказать по-сербски?</h2>
      {/* <Practice data={currentPhrase} /> */}
      <Practice />
      <SessionPhrases />
    </>
  )
}