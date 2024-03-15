import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from 'redux-thunk'
import { authReducer } from "./auth/auth.reducer";
import { postReducer } from "./post/post.reducer";
import { messageReducer } from "./message/message.reducer";
import { reelsReducer } from "./reels/reels.reducer";

const rootReducers = combineReducers({
    auth: authReducer,
    post: postReducer,
    message: messageReducer,
    reel: reelsReducer
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
