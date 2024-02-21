import { createSlice } from "@reduxjs/toolkit"
import { phrases } from "../../data/data"

const initialState = {
  group: 'all',
  phrases: phrases,
  status: 'idle',
  currentPhraseId: null,
  view: 'subreddit'
}

export const phrasesSlice = createSlice({
  name: 'phrases',
  initialState,
  reducers: {
    setCurrentPhraseId: (state, action) => {
      state.currentPhraseId = action.payload
    }
  }
})

export const { setCurrentPhraseId } = phrasesSlice.actions

export const selectAllPhrases = (state) => state.phrases.phrases

export default phrasesSlice.reducer