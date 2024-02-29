import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchPhrases, selectPhrasesStatus, } from "./phrasesSlice"

import Practice from "../../components/practice/Practice"
import SessionPhrases from "../../components/sessionOverview/SessionOverview"

export default function Phrases() {
  const dispatch = useDispatch()
  const status = useSelector(selectPhrasesStatus)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPhrases())
    }
  }, [status, dispatch])

  let practiceContent
  let sessionContent

  if (status === 'loading') {
    console.log('loading')
  } else if (status === 'success') {

    practiceContent =  <Practice />
    sessionContent = <SessionPhrases /> 

  } else if (status === 'failed') {
    console.log('error')
  }

  return (
    <>
      <h2>Как сказать по-сербски?</h2>
      {practiceContent}
      {sessionContent}
    </>
  )
}