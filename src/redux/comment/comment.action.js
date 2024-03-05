import { api } from "../../config/api";
import { CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE } from "./comment.actionType";

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