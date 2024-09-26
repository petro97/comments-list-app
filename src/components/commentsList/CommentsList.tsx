import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../../features/comments/store'
import { useDispatch, useSelector } from 'react-redux'
import {
  Comment,
  deleteComment,
  fetchComments
} from '../../features/comments/commentsSlice'
import CommentForm from '../commentForm/CommentForm'

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

  const handleDeleteComment = (id: number) => {
    dispatch(deleteComment(id))
  }

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h1 className="">Comments</h1>
        {/*<button type="button" className="border rounded-lg px-4 py-2 text-red-500 hover:bg-red-100" onClick={() => setIsShowForm(true)}>Add Comment</button>*/}
      </div>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      <CommentForm />
      <ul>
        {comments.map((comment: Comment) => (
          <li
            key={comment.id}
            className="relative bg-white border border-gray-200 rounded-lg p-4 mx-auto mb-3 shadow-lg"
          >
            <div className="flex items-center mb-4 truncate mr-24">
              <div className="w-8 h-8 rounded-full bg-cons-green mr-3"></div>
              <div>
                <p className="font-semibold text-gray-800">
                  {comment.user.fullName}
                </p>
                <p className="text-xs text-cons-gray">
                  <span className="text-cons-gray font-semibold">
                    {comment.user.username}
                  </span>
                </p>
              </div>
            </div>

            <p className="text-gray-800 mb-4 line-clamp overflow-hidden">
              {comment.body}
            </p>

            {/* TODO - Add a reply feature in the future */}
            <div className="flex items-center text-sm text-gray-500">
              <button className="flex items-center mr-4">Reply</button>
            </div>

            {/* Delete Button */}
            <button
              type="button"
              className="absolute top-2 right-2 border rounded-lg px-4 py-2 text-cons-red hover:bg-cons-red/10 transition duration-300"
              onClick={() => handleDeleteComment(comment.id)}
            >
              Delete
            </button>

            {/* Likes Button */}
            <div className="absolute bottom-2 right-4 flex items-center">
              <button className="flex items-center font-bold">
                <span className="mr-2">👍</span>
                {comment.likes}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommentsList