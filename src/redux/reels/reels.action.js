import { api } from "../../config/api";

import { CREATE_REELS_FAILURE, CREATE_REELS_REQUEST, CREATE_REELS_SUCCESS, GET_ALL_REELS_FAILURE, GET_ALL_REELS_REQUEST, GET_ALL_REELS_SUCCESS, GET_USERS_REEL_FAILURE, GET_USERS_REEL_REQUEST, GET_USERS_REEL_SUCCESS } from "./reels.actionType"

export const createReels = (reelData) => async (dispatch) => {
    dispatch({ type: CREATE_REELS_REQUEST })
    try {
        const { data } = await api.post("/api/reels", reelData)
        dispatch({ type: CREATE_REELS_SUCCESS, payload: data })

        console.log("created reels", data)


    } catch (error) {
        console.log("catch error ", error)
        dispatch({ type: CREATE_REELS_FAILURE, payload: error })
    }
}

export const getAllReels = () => async (dispatch) => {
    dispatch({ type: GET_ALL_REELS_REQUEST })
    try {
        const { data } = await api.get("/api/reels")
        dispatch({ type: GET_ALL_REELS_SUCCESS, payload: data })

    } catch (error) {
        console.log("catch error ", error)
        dispatch({ type: GET_ALL_REELS_FAILURE, payload: error })
    }
}

export const getUsersReels = (userId) => async (dispatch) => {
    dispatch({ type: GET_USERS_REEL_REQUEST })
    try {

        const { data } = await api.get(`/api/users/${userId}/reels`)

        dispatch({ type: GET_USERS_REEL_SUCCESS, payload: data })

    } catch (error) {
        console.log("catch error ", error)
        dispatch({ type: GET_USERS_REEL_FAILURE, payload: error })
    }
}