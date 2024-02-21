import { createSlice } from "@reduxjs/toolkit"
import { phrases } from "../../data/data"

const initialState = {
  group: 'all',
  phrases: phrases,
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
    }
  }
})

export const { setNextPhraseId } = phrasesSlice.actions

export const selectAllPhrases = (state) => state.phrases.phrases
export const selectCurrentPhrase = (state) => state.phrases.phrases.find(phrase => phrase.id === state.phrases.currentPhraseId)

export default phrasesSlice.reducer