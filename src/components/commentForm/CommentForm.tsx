import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../features/comments/store'
import { addComment } from '../../features/comments/commentsSlice'

interface CommentFormData {
  fullName: string
  username: string
  body: string
}

interface FormErrors {
  fullName?: string
  username?: string
  body?: string
}

const defaultFormData = {
  body: '',
  username: '',
  fullName: ''
}

const CommentForm = () => {
  const dispatch = useDispatch()
  const { comments } = useSelector((state: RootState) => state.comments)
  const [formData, setFormData] = useState<CommentFormData>(defaultFormData)
  const [errors, setErrors] = useState<FormErrors>(defaultFormData)

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

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
      const newErrors: FormErrors = {}

      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full Name is required'
      }
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required'
      }
      if (!formData.body.trim()) {
        newErrors.body = 'Comment body is required'
      }

      // If there are errors, set them in state and don't proceed with form submission
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }

      // Form submission logic
      const newComment = {
        id: new Date().getTime(),
        body: formData.body,
        postId: comments.length + 1,
        likes: 0,
        user: {
          id: 1,
          username: formData.username,
          fullName: formData.fullName
        }
      }
      // Add the comment to state
      dispatch(addComment(newComment))

      // Reset the form after submission
      setFormData(defaultFormData)
    } catch (error) {
      console.error('Error during form submission:', error)
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
          value={formData.fullName}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
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
          value={formData.username}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md`}
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
          value={formData.body}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border ${errors.body ? 'border-red-500' : 'border-gray-300'} rounded-md`}
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
