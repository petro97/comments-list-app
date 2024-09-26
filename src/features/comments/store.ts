import { configureStore } from '@reduxjs/toolkit'
import commentsReducer from './commentsSlice'

// Configure the Redux store
const store = configureStore({
  reducer: {
    comments: commentsReducer
  }
})

// Export types for RootState and AppDispatch for use in the application
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
