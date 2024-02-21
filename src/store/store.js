import { configureStore } from '@reduxjs/toolkit'

import phrasesReducer from '../features/phrases/phrasesSlice'

export const store = configureStore({
  reducer: {
    phrases: phrasesReducer
  }
})