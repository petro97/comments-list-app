import { configureStore } from '@reduxjs/toolkit'
import commentsReducer from './commentsSlice'

const store = configureStore({
  reducer: {
    comments: commentsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
