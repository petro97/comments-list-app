import React from 'react'
import ReactDOM from 'react-dom/client' // Use react-dom/client for React 18+
import { Provider } from 'react-redux'
import { persistor, store } from './features/comments/store'
import App from './App'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'

const rootElement = document.getElementById('root')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
