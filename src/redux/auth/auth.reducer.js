import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_REUEST } from './auth.actionType'
const initialState = {
    loading: false,
    error: null,
    jwt: null,
    user: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case GET_PROFILE_REUEST:
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            console.log(action.payload, "success");
            return { ...state, jwt: action.payload, loading: false, error: null };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                reqUser: action.payload,
                user: action.payload,
            };
        default: return state
    }
}