import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../features/comments/store'
import { useDispatch, useSelector } from 'react-redux'
import {
  addComment,
  deleteComment,
  fetchComments
} from '../features/comments/commentsSlice'

const CommentsList = () => {
  const dispatch: AppDispatch = useDispatch()
  const { comments, status, error } = useSelector(
    (state: RootState) => state.comments
  )

  useEffect(() => {
    if (status === 'idle') {
      // @ts-ignore
      dispatch(fetchComments())
    }
  }, [status, dispatch])

  const handleAddComment = (comment: {
    id: number
    body: string
    user: { fullName: string }
  }) => {
    // @ts-ignore
    dispatch(addComment(comment))
  }

  const handleDeleteComment = (id: number) => {
    dispatch(deleteComment(id))
  }
  return (
    <div>
      <h1>Comments1</h1>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.body}</p>
            <p>by {comment.user.fullName}</p>
            <button onClick={() => handleDeleteComment(comment.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          handleAddComment({
            id: 31,
            body: 'New comment',
            user: { fullName: 'John Doe' }
          })
        }
      >
        Add Comment
      </button>
    </div>
  )
}

export default CommentsList
