import { api } from '../../config/api'
import * as actionTypes from './message.actionType'

export const createMessage = (data) => {

    return async (dispatch) => {
        console.log("body ", data)
        dispatch({ type: actionTypes.CREATE_MESSAGE_REQUEST })
        try {
            const response = await api.post(`/api/chats/${data?.chatId}/messages`, data?.message);

            console.log("created message ---- ", response.data)

            data.sendToServer(response.data)

            dispatch({
                type: actionTypes.CREATE_MESSAGE_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            console.log("catch error ", error)
            dispatch({ type: actionTypes.CREATE_MESSAGE_FAILURE, error: error })
        }
    };
};

export const createChat = (chat) => {
    console.log("creating chat", chat);
    return async (dispatch) => {
        dispatch({ type: actionTypes.CREATE_CHAT_REQUEST })
        try {
            const response = await api.post(`/api/chats`, chat);
            dispatch({
                type: actionTypes.CREATE_CHAT_SUCCESS,
                payload: response.data,
            });
            console.log("chat created", response);
        } catch (error) {
            console.log("error ", error)
            dispatch({ type: actionTypes.CREATE_CHAT_FAILURE, error })
        }
    };
};

export const getAllChats = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.GET_ALL_CHATS_REQUEST })
        try {
            const response = await api.get(`/api/chats`);
            // console.log(response, "all chats");
            dispatch({
                type: actionTypes.GET_ALL_CHATS_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({ type: actionTypes.GET_ALL_CHATS_FAILURE, error })
        }
    };
};