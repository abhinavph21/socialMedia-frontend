import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_REUEST, SEARCH_USER_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, FIND_USER_BY_ID_SUCCESS, FIND_USER_BY_ID_REQUEST, FIND_USER_BY_ID_FAILURE, GET_PROFILE_FAILURE } from './auth.actionType'

const initialState = {
    loading: false,
    error: null,
    jwt: null,
    user: null,
    profileUser: {},
    searchResult: [],
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case GET_PROFILE_REUEST:
        case FIND_USER_BY_ID_REQUEST:
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case SEARCH_USER_REQUEST:
            return { ...state, searchResult: [], loading: true, error: null };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, jwt: action.payload, loading: false, error: null };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case FIND_USER_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                profileUser: action.payload,
                error: null,
            };
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
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
        case FIND_USER_BY_ID_FAILURE:
        case SEARCH_USER_FAILURE:
        case REGISTER_FAILURE:
        case GET_PROFILE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default: return state
    }
}