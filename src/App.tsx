import React from 'react'
import CommentsList from './components/commentsList/CommentsList'

const App: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="max-w-6xl w-4/5 mx-auto mt-8 mb-10">
        <CommentsList />
      </div>
    </div>
  )
}

export default App