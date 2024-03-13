import { api } from "../../config/api"
import { CREATE_POST_SUCCESS, CREATE_POST_REQUEST, CREATE_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_FAILURE, GET_ALL_POST_SUCCESS, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, GET_USERS_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE } from "./post.actionType"

export const createPost = (postData) => async (dispatch) => {
    dispatch({ type: CREATE_POST_REQUEST })
    try {
        const { data } = await api.post("/api/posts", postData)
        console.log(data);
        dispatch({ type: CREATE_POST_SUCCESS, payload: data })
    } catch (error) {
        console.log("catch error ", error)
        dispatch({ type: CREATE_POST_FAILURE, payload: error })
    }
}

export const getAllPost = () => async (dispatch) => {
    dispatch({ type: GET_ALL_POST_REQUEST })
    try {

        const { data } = await api.get("/api/posts")
        console.log(data, "posts");
        dispatch({ type: GET_ALL_POST_SUCCESS, payload: data })


    } catch (error) {
        console.log("catch error ", error)
        dispatch({ type: GET_ALL_POST_FAILURE, payload: error })
    }
}

export const getUsersPost = (userId) => async (dispatch) => {
    dispatch({ type: GET_USERS_POST_REQUEST })
    try {
        const { data } = await api.get(`/api/users/${userId}/posts`)
        console.log("user posts", data);
        dispatch({ type: GET_USERS_POST_SUCCESS, payload: data })
    } catch (error) {
        console.log("catch error ", error)
        dispatch({ type: GET_USERS_POST_FAILURE, payload: error })
    }
}

export const likePost = (postId) => async (dispatch) => {
    dispatch({ type: LIKE_POST_REQUEST })
    try {
        const { data } = await api.put(`/api/posts/${postId}/like`)
        console.log(data);
        dispatch({ type: LIKE_POST_SUCCESS, payload: data })
    } catch (error) {

        console.log("catch error ", error)
        dispatch({ type: LIKE_POST_FAILURE, payload: error })
    }
}

export const createComment = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_COMMENT_REQUEST });
    try {
        console.log(reqData);
        const response = await api.post(`/api/posts/${reqData.postId}/comments`, reqData.data);
        console.log("created comment ---- ", response.data)
        dispatch({
            type: CREATE_COMMENT_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_COMMENT_FAILURE,
            payload: error,
        });
    }
};