import { createSelector, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { phrases } from "../../data/data"
import { supabase } from "../../supabaseClient"

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
    },
    setPhraseTimesPracticed: (state, action) => {
      const practicedPhrase = state.phrases.find(phrase => phrase.id === action.payload)
      practicedPhrase.attributes.timesPracticed += 1
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPhrases.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPhrases.fulfilled, (state, action) => {
        state.status = 'success'
        state.phrases = action.payload.map(phrase => {
          return {...phrase, phraseSessionStatus: 'new'}
        })
        state.phrasesInPractice = action.payload.map(phrase => phrase.id)
      })
      .addCase(fetchPhrases.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updatePhraseCount.fulfilled, (state, action) => {
        console.log('Reducer worked')
      })
  }
})

export const { 
  setPhraseSessionStatus, 
  setCurrentPhraseId, 
  setOrderForPhrasesInPractice, 
  setPhrasesInPractice,
  setPhraseTimesPracticed
} = phrasesSlice.actions

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
  
  const { data } = await supabase.from("phrases").select('*')
  return data
})

export const updatePhraseCount = createAsyncThunk(
  'phrases/updatePhraseCount', 
  async ({ id, status }) => 
  {
    // 1. Figure out the current practiced_count and correct_count
    const countData = await supabase.from("phrases").select('practiced_count, correct_count').eq('id', id)
    const practicedCount = countData.data[0].practiced_count + 1
    const correctCount = status === 'correct' ? countData.data[0].correct_count + 1 : countData.data[0].correct_count
    
    console.log(status)
    // 2. Update the practiced_count with + 1
    const updates = {
      practiced_count: practicedCount,
      correct_count: correctCount
    }

    const { data, error } = await supabase.from("phrases").update(updates).eq('id', id).select()

    if (error) { console.log(error) }

    //3. Update the apps state (the corresponding phrase in the state)
  
})

export default phrasesSlice.reducer