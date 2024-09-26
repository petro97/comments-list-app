import { act, fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import CommentForm from './CommentForm'
import { addComment } from '../../features/comments/commentsSlice'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

// Mock the redux store and state
const mockStore = configureStore([])
const initialState = { comments: { comments: [] } }

vi.mock('../../features/comments/commentsSlice', () => ({
  addComment: vi.fn().mockResolvedValueOnce({}) // mock successful async operation
}))

describe('CommentForm', () => {
  let store

  beforeEach(() => {
    store = mockStore(initialState)
  })

  test('renders form inputs correctly', () => {
    render(
      <Provider store={store}>
        <CommentForm />
      </Provider>
    )

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/comment/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /add comment/i })
    ).toBeInTheDocument()
  })

  test('shows validation errors when fields are empty on submit', async () => {
    render(
      <Provider store={store}>
        <CommentForm />
      </Provider>
    )

    const submitButton = screen.getByRole('button', { name: /add comment/i })
    userEvent.click(submitButton)

    expect(
      await screen.findByText(/full name is required/i)
    ).toBeInTheDocument()
    expect(await screen.findByText(/username is required/i)).toBeInTheDocument()
    expect(
      await screen.findByText(/comment body is required/i)
    ).toBeInTheDocument()
  })

  it('dispatches addComment when form is filled out and submitted', async () => {
    render(
      <Provider store={store}>
        <CommentForm />
      </Provider>
    )

    const fullNameInput = screen.getByLabelText(/full name/i)
    const usernameInput = screen.getByLabelText(/username/i)
    const bodyInput = screen.getByLabelText(/comment/i)
    const submitButton = screen.getByText(/add comment/i)

    // Simulate user input wrapped in `act`
    await act(async () => {
      fireEvent.change(fullNameInput, { target: { value: 'John Doe' } })
      fireEvent.change(usernameInput, { target: { value: 'johndoe' } })
      fireEvent.change(bodyInput, { target: { value: 'This is a comment' } })
      fireEvent.click(submitButton)
    })

    expect(addComment).toHaveBeenCalledWith(
      expect.objectContaining({
        body: 'This is a comment',
        postId: expect.any(Number),
        id: expect.any(Number),
        user: expect.objectContaining({
          username: 'johndoe',
          fullName: 'John Doe',
          id: expect.any(Number)
        })
      })
    )
  })

  test('resets form after successful submission', async () => {
    render(
      <Provider store={store}>
        <CommentForm />
      </Provider>
    )

    // Fill the form fields
    userEvent.type(screen.getByLabelText(/full name/i), 'John Doe')
    userEvent.type(screen.getByLabelText(/username/i), 'johndoe')
    userEvent.type(screen.getByLabelText(/comment/i), 'This is a comment')

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /add comment/i })
    userEvent.click(submitButton)

    // Expect form fields to be reset
    expect(screen.getByLabelText(/full name/i)).toHaveValue('')
    expect(screen.getByLabelText(/username/i)).toHaveValue('')
    expect(screen.getByLabelText(/comment/i)).toHaveValue('')
  })
})
