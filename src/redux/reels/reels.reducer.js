import { CREATE_REELS_FAILURE, CREATE_REELS_REQUEST, CREATE_REELS_SUCCESS, GET_ALL_REELS_FAILURE, GET_ALL_REELS_REQUEST, GET_ALL_REELS_SUCCESS, GET_USERS_REEL_SUCCESS } from "./reels.actionType";

const initialState = {
    reel: null,
    loading: false,
    error: null,
    reels: [],
    like: null,
    profileReels: []
};

export const reelsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_REELS_REQUEST:
            // case GET_ALL_REELS_REQUEST:
            // case LIKE_REELS_REQUEST:
            return { ...state, error: null, loading: true };

        case CREATE_REELS_SUCCESS:
            return {
                ...state,
                reel: action.payload,
                reels: [action.payload, ...state.reels],
                loading: true,
                error: null,
            };
        case GET_ALL_REELS_SUCCESS:
            return { ...state, reels: action.payload, loading: true, error: null };
        case GET_USERS_REEL_SUCCESS:
            return { ...state, profileReels: action.payload }
        // case LIKE_REELS_SUCCESS:
        // return {
        //     ...state,
        //     like: action.payload,
        //     reels: state.reels.map((item) =>
        //         item.id === action.payload.id ? action.payload : item
        //     ),
        //     loading: true,
        //     error: null,
        // };

        case CREATE_REELS_FAILURE:
        case GET_ALL_REELS_FAILURE:
            return { ...state, error: action.payload, loading: false };

        default:
            return state;
    }
};
