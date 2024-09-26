import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface User {
  id: number
  username: string
  fullName: string
}

export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: User
}

export interface CommentsState {
  comments: Comment[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CommentsState = {
  comments: [],
  status: 'idle',
  error: null
}

export const fetchComments = createAsyncThunk<Comment[]>(
  'comments/fetchComments',
  async () => {
    //@ts-ignore
    const apiUrl = import.meta.env.VITE_API_URL
    const response = await axios.get<{ comments: Comment[] }>(
      `${apiUrl}/comments`
    )
    return response.data.comments
  }
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state: CommentsState, action: PayloadAction<Comment>) => {
      state.comments.unshift(action.payload)
    },
    deleteComment: (state: CommentsState, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state: CommentsState) => {
        state.status = 'loading'
      })
      .addCase(
        fetchComments.fulfilled,
        (state: CommentsState, action: PayloadAction<Comment[]>) => {
          state.status = 'succeeded'
          state.comments = action.payload
        }
      )
      .addCase(fetchComments.rejected, (state, action) => {
        //@ts-ignore
        state.status = 'failed'
        //@ts-ignore
        state.error = action.error.message || 'Failed to fetch comments'
      })
  }
})

export const { addComment, deleteComment } = commentsSlice.actions

export default commentsSlice.reducer