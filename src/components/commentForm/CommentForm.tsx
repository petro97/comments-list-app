import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../features/comments/store'
import { addComment } from '../../features/comments/commentsSlice'
import { resetForm, updateForm } from '../../features/comments/formSlice'

const defaultFormErrors = {
  body: '',
  username: '',
  fullName: ''
}

const CommentForm = () => {
  const dispatch = useDispatch()
  const { comments } = useSelector((state: RootState) => state.comments)
  const [errors, setErrors] = useState(defaultFormErrors)

  const form: any = useSelector(
    (state: RootState) =>
      state.form || {
        fullName: '',
        username: '',
        body: ''
      }
  )
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //@ts-ignore
    dispatch(updateForm({ [e.target.name]: e.target.value }))
    // Clear error message when user types
    setErrors({
      ...errors,
      [e.target.name]: ''
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // Validation logic
      const newErrors: any = {}

      if (!form.fullName.trim()) {
        newErrors.fullName = 'Full Name is required'
      }
      if (!form.username.trim()) {
        newErrors.username = 'Username is required'
      }
      if (!form.body.trim()) {
        newErrors.body = 'Comment body is required'
      }

      // If there are errors, set them in state and don't proceed with form submission
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }

      // Validation and submission logic
      const newComment = {
        id: new Date().getTime(),
        body: form.body,
        postId: comments.length + 1,
        likes: 0,
        user: {
          id: 1,
          username: form.username,
          fullName: form.fullName
        }
      }

      dispatch(addComment(newComment))

      // Clear form data after submission
      dispatch(resetForm())
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg mb-4"
    >
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-semibold mb-2">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          value={form.fullName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Full Name"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-semibold mb-2">
          Username
        </label>
        <input
          id="username"
          name="username"
          value={form.username}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="body" className="block text-sm font-semibold mb-2">
          Comment
        </label>
        <textarea
          id="body"
          name="body"
          value={form.body}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Write your comment"
        />
        {errors.body && (
          <p className="text-red-500 text-sm mt-1">{errors.body}</p>
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-cons-blue text-white hover:bg-cons-blue-step-down rounded-md"
      >
        Add Comment
      </button>
    </form>
  )
}

export default CommentForm
