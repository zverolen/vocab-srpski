import { createSlice } from "@reduxjs/toolkit"
import { phrases } from "../../data/data"

const initialState = {
  group: 'all',
  phrases: phrases.map(phrase => {
    return {...phrase, sessionStatus: 'new'}
  }),
  status: 'idle',
  currentPhraseId: phrases[0].id,
  view: 'subreddit'
}

export const phrasesSlice = createSlice({
  name: 'phrases',
  initialState,
  reducers: {
    setNextPhraseId: (state) => {
      const currentPhraseIndex = state.phrases.findIndex(phrase => phrase.id === state.currentPhraseId)
      const nextPhraseIndex = currentPhraseIndex + 1
      if (nextPhraseIndex < state.phrases.length) {
        state.currentPhraseId = state.phrases[nextPhraseIndex].id
      } else {
        state.currentPhraseId = null
      }
    },
    setSessionStatus: (state, action) => {
      const { id, sessionStatus} = action.payload
      const updatedPhrase = state.phrases.find(phrase => phrase.id === id)
      updatedPhrase.sessionStatus = sessionStatus
    }
  }
})

export const { setNextPhraseId, setSessionStatus } = phrasesSlice.actions

export const selectAllPhrases = (state) => state.phrases.phrases
export const selectSessionPhrases = (state) => state.phrases.phrases.filter(phrase => phrase.sessionStatus !== 'new')
export const selectCorrectPhrases = (state) => state.phrases.phrases.filter(phrase => phrase.sessionStatus === 'correct')

export const selectCurrentPhrase = (state) => {
  if (state.phrases.currentPhraseId) {
    return state.phrases.phrases.find(phrase => phrase.id === state.phrases.currentPhraseId)
  } else {
    return null
  }
}

export default phrasesSlice.reducer