import * as actionTypes from "./message.actionType.js";

const initialState = {
    chats: [],
    loading: false,
    error: null,
};

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_MESSAGE_SUCCESS:
            let updatedChats = state.chats
            // 
            console.log(updatedChats, action.payload);
            let indexOfChat = updatedChats?.findIndex((chat) => chat.id == action.payload.parentChatId)
            console.log("index", indexOfChat);
            updatedChats[indexOfChat].messages.push(action.payload)
            // console.log(updatedChats);
            console.log(updatedChats, "reducer");
            return { ...state, chats: updatedChats };

        case actionTypes.CREATE_CHAT_SUCCESS:
            return { ...state, chats: [action.payload, ...state.chats] };

        case actionTypes.GET_ALL_CHATS_SUCCESS:
            // console.log(state);
            return { ...state, chats: action.payload };

        default:
            return state;
    }
};
