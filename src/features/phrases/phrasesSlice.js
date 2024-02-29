import { createSelector, createSlice } from "@reduxjs/toolkit"
import { phrases } from "../../data/data"

const initialState = {
  phrases: phrases.map(phrase => {
    return {...phrase, phraseSessionStatus: 'new'}
  }),
  phrasesInPractice: phrases.map(phrase => phrase.id),
  status: 'idle',
  lastStatus: null,
  currentPhraseId: phrases[0].id
}

export const phrasesSlice = createSlice({
  name: 'phrases',
  initialState,
  reducers: {
    setCurrentPhraseId: (state, action) => {
      state.currentPhraseId = action.payload
    },
    setOrderForPhrasesInPractice: (state, action) => {
      const { id, phraseSessionStatus} = action.payload
      if (phraseSessionStatus === 'new') {
        const repeatedId = state.phrasesInPractice.shift()
        state.phrasesInPractice.push(repeatedId)
      } else {
        state.phrasesInPractice.shift()
      }
    },
    setPhraseSessionStatus: (state, action) => {
      const { id, phraseSessionStatus} = action.payload
      const updatedPhrase = state.phrases.find(phrase => phrase.id === id)
        updatedPhrase.phraseSessionStatus = phraseSessionStatus
    }
  }
})

export const { setPhraseSessionStatus, setCurrentPhraseId, setOrderForPhrasesInPractice } = phrasesSlice.actions

export const selectAllPhrases = (state) => state.phrases.phrases
const selectPracticeIds = (state) => {
  return state.phrases.phrasesInPractice
}

export const selectPracticedPhrases = createSelector([selectAllPhrases], phrases => phrases.filter(phrase => phrase.phraseSessionStatus !== 'new'))
export const selectNewPhrases = createSelector([selectAllPhrases], phrases => 
  phrases.filter(phrase => phrase.phraseSessionStatus === 'new'))
export const selectCorrectPhrases = createSelector([selectAllPhrases], phrases => phrases.filter(phrase => phrase.phraseSessionStatus === 'correct'))
export const selectWrongPhrases = createSelector([selectAllPhrases], phrases => phrases.filter(phrase => phrase.phraseSessionStatus === 'wrong'))

// in research
export const selectTotalNumberOfPhrases = createSelector([selectAllPhrases], phrases => phrases.length)
export const selectNumberOfNewPhrases = createSelector([selectNewPhrases], phrases => phrases.length)
export const selectNumberOfCorrectPhrases = createSelector([selectCorrectPhrases], phrases => phrases.length)
export const selectNumberOfWrongPhrases = createSelector([selectWrongPhrases], phrases => phrases.length)

export const selectCurrentPhrase = createSelector([selectAllPhrases, selectPracticeIds], (phrases, ids) => {
  return phrases.find(phrase => phrase.id === ids[0])
})

export default phrasesSlice.reducer