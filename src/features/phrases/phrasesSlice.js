import { createSelector, createSlice } from "@reduxjs/toolkit"
import { phrases } from "../../data/data"


const initialState = {
  group: 'all',
  phrases: phrases.map(phrase => {
    return {...phrase, phraseSessionStatus: 'new'}
  }),
  status: 'idle',
  currentPhraseId: phrases[0].id,
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
    setPhraseSessionStatus: (state, action) => {
      const { id, phraseSessionStatus} = action.payload
      const updatedPhrase = state.phrases.find(phrase => phrase.id === id)
      updatedPhrase.phraseSessionStatus = phraseSessionStatus
    },
  }
})

export const { setNextPhraseId, setPhraseSessionStatus } = phrasesSlice.actions

export const selectAllPhrases = (state) => state.phrases.phrases

export const selectPracticedPhrases = createSelector([selectAllPhrases], phrases => phrases.filter(phrase => phrase.phraseSessionStatus !== 'new'))
export const selectNewPhrases = createSelector([selectAllPhrases], phrases => phrases.filter(phrase => phrase.phraseSessionStatus === 'new'))
export const selectCorrectPhrases = createSelector([selectAllPhrases], phrases => phrases.filter(phrase => phrase.phraseSessionStatus === 'correct'))
export const selectWrongPhrases = createSelector([selectAllPhrases], phrases => phrases.filter(phrase => phrase.phraseSessionStatus === 'wrong'))

// in research
export const selectTotalNumberOfPhrases = createSelector([selectAllPhrases], phrases => phrases.length)
export const selectNumberOfNewPhrases = createSelector([selectNewPhrases], phrases => phrases.length)
export const selectNumberOfCorrectPhrases = createSelector([selectCorrectPhrases], phrases => phrases.length)
export const selectNumberOfWrongPhrases = createSelector([selectWrongPhrases], phrases => phrases.length)


export const selectCurrentPhrase = (state) => {
  if (state.phrases.currentPhraseId) {
    return state.phrases.phrases.find(phrase => phrase.id === state.phrases.currentPhraseId)
  } else {
    return null
  }
}

export default phrasesSlice.reducer