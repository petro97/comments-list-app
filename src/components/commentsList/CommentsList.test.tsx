import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { fireEvent, render, screen } from '@testing-library/react'
import commentsReducer from '../../features/comments/commentsSlice' // Import the reducer directly
import CommentsList from './CommentsList'
import { describe, expect, it, vi } from 'vitest'

// Use a real Redux store for testing
const store = configureStore({
  reducer: {
    comments: commentsReducer
  },
  preloadedState: {
    comments: {
      comments: [
        {
          id: 1,
          user: { fullName: 'Jane Doe', username: 'janedoe' },
          body: 'This is a comment',
          likes: 2
        }
      ],
      status: 'idle',
      error: null
    }
  }
})

describe('CommentsList Component', () => {
  it('renders without crashing and displays the comment', () => {
    render(
      <Provider store={store}>
        <CommentsList />
      </Provider>
    )

    expect(screen.getByText('Comments')).toBeInTheDocument()
    expect(screen.getByText('This is a comment')).toBeInTheDocument()
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
  })

  it('displays loading state when status is loading', () => {
    // Change the store state to simulate loading
    store.dispatch({
      type: 'comments/setStatus', // Assuming you have a setStatus action
      payload: 'loading'
    })

    render(
      <Provider store={store}>
        <CommentsList />
      </Provider>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('calls deleteComment when the delete button is clicked', () => {
    // Mock the dispatch function
    const dispatch = vi.fn()
    store.dispatch = dispatch // Override the store dispatch with our mock

    render(
      <Provider store={store}>
        <CommentsList />
      </Provider>
    )

    // Click the delete button
    fireEvent.click(screen.getByText('Delete'))

    // Assert that deleteComment action was called with the correct ID
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: expect.any(String), // Expect a Redux action type
        payload: 1 // Assuming the deleteComment action has the ID as payload
      })
    )
  })
})
