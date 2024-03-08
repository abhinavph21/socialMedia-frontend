import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_REUEST, SEARCH_USER_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST } from './auth.actionType'
const initialState = {
    loading: false,
    error: null,
    jwt: null,
    user: null,
    searchResult: [],
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case GET_PROFILE_REUEST:
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case SEARCH_USER_REQUEST:
            return { ...state, searchResult: [], loading: true, error: null };

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

        case SEARCH_USER_SUCCESS:
            let users = action.payload
            return {
                ...state,
                loading: false,
                searchResult: users.filter((user) => user.id != state.user.id),
                error: null,
            };
        case SEARCH_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default: return state
    }
}