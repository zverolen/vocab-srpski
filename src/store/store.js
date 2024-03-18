import { configureStore } from '@reduxjs/toolkit'

import phrasesReducer from '../features/phrases/phrasesSlice'
import profileReducer from '../features/profile/profileSlice'

export const store = configureStore({
  reducer: {
    phrases: phrasesReducer,
    profile: profileReducer
  }
})