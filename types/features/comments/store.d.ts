declare const store: import('@reduxjs/toolkit').EnhancedStore<
  {
    comments: import('./commentsSlice').CommentsState
  },
  import('redux').UnknownAction,
  import('@reduxjs/toolkit').Tuple<
    [
      import('redux').StoreEnhancer<{
        dispatch: import('redux-thunk').ThunkDispatch<
          {
            comments: import('./commentsSlice').CommentsState
          },
          undefined,
          import('redux').UnknownAction
        >
      }>,
      import('redux').StoreEnhancer
    ]
  >
>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
