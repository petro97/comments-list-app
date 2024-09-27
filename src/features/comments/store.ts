import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { thunk } from 'redux-thunk'
import commentsReducer from './commentsSlice'
import formReducer from './formSlice' // Import the new form slice

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['form', 'comments'] // Persist both form and comments slices
}

const rootReducer = combineReducers({
  comments: commentsReducer,
  form: formReducer // Add the form reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure the store
//@ts-ignore
export const store: FormState = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // Disable serializable check if needed
    }).concat(thunk) // Adding thunk middleware
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Export persistor
export const persistor = persistStore(store)
