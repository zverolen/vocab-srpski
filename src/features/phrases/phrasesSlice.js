import { createSelector, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { phrases } from "../../data/data"

const initialState = {
  phrases: [],
  phrasesInPractice: [],
  currentPhraseId: phrases[0].id,
  status: 'idle',
  error: null
}

export const phrasesSlice = createSlice({
  name: 'phrases',
  initialState,
  reducers: {
    setCurrentPhraseId: (state, action) => {
      state.currentPhraseId = action.payload
    },
    setPhrasesInPractice: (state) => {
      state.phrases.map(phrase => phrase.id)
    },
    setOrderForPhrasesInPractice: (state, action) => {
      const { phraseSessionStatus} = action.payload
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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPhrases.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPhrases.fulfilled, (state, action) => {
        state.status = 'success'
        state.phrases = action.payload.data.map(phrase => {
          return {...phrase, phraseSessionStatus: 'new'}
        })
        state.phrasesInPractice = action.payload.data.map(phrase => phrase.id)
      })
      .addCase(fetchPhrases.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { setPhraseSessionStatus, setCurrentPhraseId, setOrderForPhrasesInPractice, setPhrasesInPractice } = phrasesSlice.actions

export const selectAllPhrases = (state) => state.phrases.phrases

const selectPracticeIds = (state) => {
  return state.phrases.phrasesInPractice
}

export const selectPhrasesStatus = state => state.phrases.status

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

export const fetchPhrases = createAsyncThunk('phrases/fetchPhrases', async () => {  
  
  const response = await fetch(`http://localhost:1337/api/phrases`)
  const phrases = await response.json()

  console.log(phrases)
  
  return phrases
})

export default phrasesSlice.reducer