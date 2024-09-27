import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FormState {
  fullName: string
  username: string
  body: string
}

const initialState: FormState = {
  fullName: '',
  username: '',
  body: ''
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload }
    },
    resetForm: () => initialState
  }
})

export const { updateForm, resetForm } = formSlice.actions
export default formSlice.reducer
