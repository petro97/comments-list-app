interface User {
    id: number;
    username: string;
    fullName: string;
}
export interface Comment {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: User;
}
export interface CommentsState {
    comments: Comment[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
export declare const fetchComments: import("@reduxjs/toolkit").AsyncThunk<Comment[], void, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const addComment: import("@reduxjs/toolkit").ActionCreatorWithPayload<Comment, "comments/addComment">, deleteComment: import("@reduxjs/toolkit").ActionCreatorWithPayload<number, "comments/deleteComment">;
declare const _default: import("redux").Reducer<CommentsState>;
export default _default;
