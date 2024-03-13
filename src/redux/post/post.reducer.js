import { CREATE_POST_REQUEST, GET_ALL_POST_REQUEST, LIKE_POST_REQUEST, CREATE_POST_SUCCESS, GET_ALL_POST_SUCCESS, GET_USERS_POST_SUCCESS, LIKE_POST_SUCCESS, CREATE_POST_FAILURE, LIKE_POST_FAILURE, GET_ALL_POST_FAILURE } from "./post.actionType";
import { CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE } from "./post.actionType";

const initialState = {
    post: null,
    loading: false,
    error: null,
    posts: [],
    profileUserPosts: [],
    like: null,
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
        case GET_ALL_POST_REQUEST:
        case LIKE_POST_REQUEST:
        case CREATE_COMMENT_REQUEST:
            return { ...state, error: null, loading: true };

        case CREATE_POST_SUCCESS:
            return {
                ...state,
                post: action.payload,
                posts: [action.payload, ...state.posts],
                loading: false,
                error: null,
            };
        case GET_ALL_POST_SUCCESS:
        case GET_USERS_POST_SUCCESS:
            return { ...state, profileUserPosts: action.payload, loading: false, error: null };
        case LIKE_POST_SUCCESS:
            return {
                ...state,
                like: action.payload,
                posts: state.posts.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
                loading: false,
                error: null,
            };
        case CREATE_COMMENT_SUCCESS: return {
            ...state,
            posts: state.posts.map((post) => {
                if (post.id == action.payload?.parentPostId) {
                    post.comments.push(action.payload)
                    console.log("updated post", post);
                }
                return post
            }),
            loading: false,
            error: null,
        }

        case CREATE_POST_FAILURE:
        case GET_ALL_POST_FAILURE:
        case LIKE_POST_FAILURE:
            return { ...state, error: action.payload, loading: false };

        default:
            return state;
    }
}; 