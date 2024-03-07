import { createSelector, createSlice } from "@reduxjs/toolkit"
import { phrases } from "../../data/data"
import { isDisabled } from "@testing-library/user-event/dist/types/utils"


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
    setNextPhraseId: (state) => {
      //in research: less expensive approach

      const newPhrases = state.phrases.filter(phrase => phrase.phraseSessionStatus === 'new')
      const currentPhraseIndex = newPhrases.findIndex(phrase => phrase.id === state.currentPhraseId)
      let nextPhraseIndex = currentPhraseIndex + 1
      // const hasNewPhrases = state.phrases.some(phrase => phrase.phraseSessionStatus === 'new')
      const hasNewPhrases = newPhrases.length

      if (hasNewPhrases) {
        if (nextPhraseIndex < state.phrases.length) {
          //During first go all phrases == new phrases
          //Works except for the last phrase
          
          state.currentPhraseId = newPhrases[nextPhraseIndex].id
        } else {
          // For the last phrase
          // const repeatedPhraseIndex = state.phrases.findIndex(phrase => phrase.phraseSessionStatus === 'new')
          nextPhraseIndex = 0
          state.currentPhraseId = state.phrases[nextPhraseIndex].id
        }
      } else {
        state.currentPhraseId = null
      }

      // console.log(currentPhraseIndex)
      // console.log(nextPhraseIndex)
      
    },
    setPhraseSessionStatus: (state, action) => {
      const { id, phraseSessionStatus} = action.payload
      const updatedPhrase = state.phrases.find(phrase => phrase.id === id)
      // if (phraseSessionStatus !== updatedPhrase.phraseSessionStatus) {
        updatedPhrase.phraseSessionStatus = phraseSessionStatus
      // }
    },
    setLastStatus: (state, action) => {
      state.lastStatus = action.payload
    }
  }
})

export const { setNextPhraseId, setPhraseSessionStatus, setLastStatus, setCurrentPhraseId } = phrasesSlice.actions

export const selectAllPhrases = (state) => state.phrases.phrases
// const selectLastStatus = (state) => state.phrases.lastStatus
const selectCurrentId = (state) => state.phrases.currentPhraseId
const selectPracticeIds = state => state.phrases.phrasesInPractice

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

/** */

export const selectCurrentPhrase = createSelector([selectAllPhrases, selectPracticeIds], phrases, ids => {
  return phrases.find(phrase => phrase.id === ids[0])
})


// export const selectCurrentPhrase = (state) => {
//   if (state.phrases.currentPhraseId) {
//     return state.phrases.phrases.find(phrase => phrase.id === state.phrases.currentPhraseId)
//   } else {
//     return null
//   }
// }

// const selectInitialLastStatus = state => state.phrases.lastStatus

// const selectLastStatus = createSelector([selectAllPhrases, selectCurrentId], (phrases, id) => {
//   const phrase = phrases.find(phrase => phrase.id === id)
//   return phrase.phraseSessionStatus
// })

// export const selectCurrentPhrase = createSelector([
//   selectNewPhrases, 
//   selectInitialLastStatus, 
//   selectCurrentId
// ], (phrases, lastStatus, currentId) => {
//   if (!phrases.length) {
//     return null
//   }
//   console.log(`Last status ${lastStatus}`)
  
//   let currentPhrase
  // if (lastStatus !== 'new') {
  //   currentPhrase = phrases[0]
  // } else {
  //   const currentIndex = phrases.findIndex(phrase => phrase.id === currentId)
  //   currentPhrase = phrases[currentIndex + 1]
  // }
  // if (lastStatus === null) {
  //   currentPhrase = phrases[0]
  //   } else {
  //     if (lastStatus !== 'new') {
  //     currentPhrase = phrases[0]
  //     console.log(`Correct, wrong or skipped`)
  //   } else {
  //     const currentIndex = phrases.findIndex(phrase => phrase.id === currentId)
      // currentPhrase = phrases[currentIndex]
      // currentPhrase = phrases[0]
//       currentPhrase = phrases[currentIndex + 1]
//       console.log(`Repeated, currentIndex ${currentIndex}, currentId ${currentId}`)
//       console.log(phrases)
//     }
//   }

//   return currentPhrase
// })

export default phrasesSlice.reducer