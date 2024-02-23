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
      const nextPhraseId = currentPhraseIndex + 1
      state.currentPhraseId = state.phrases[nextPhraseId].id
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
export const selectCurrentPhrase = (state) => state.phrases.phrases.find(phrase => phrase.id === state.phrases.currentPhraseId)

export default phrasesSlice.reducer