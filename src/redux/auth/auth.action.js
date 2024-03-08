import axios from 'axios'
import { API_BASE_URL } from '../../config/api'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, GET_PROFILE_REUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, SEARCH_USER_SUCCESS, SEARCH_USER_FAILURE } from './auth.actionType';
import { api } from '../../config/api';

export const loginUser = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data);
        const user = response.data;
        console.log("login user -: ", user);
        if (user.token) {
            localStorage.setItem("jwt", user.token);
        }
        dispatch({ type: LOGIN_SUCCESS, payload: user.token });
    } catch (error) {
        console.log("error ", error)
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
};

export const registerUser = (userData) => async (dispatch) => {
    console.log(userData);
    dispatch({ type: REGISTER_REQUEST });
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData.data);
        const user = response.data;
        console.log("created user - : ", user);
        if (user.token) {
            localStorage.setItem("jwt", user.token);
        }
        dispatch({ type: REGISTER_SUCCESS, payload: user.token });
    } catch (error) {
        dispatch(
            { type: REGISTER_FAILURE, payload: error.message }
        );
    }
};

export const getUserProfile = (jwt) => async (dispatch) => {
    dispatch({ type: GET_PROFILE_REUEST });
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                "Authorization": `Bearer ${jwt}`,
            }
        });
        const user = response.data;
        // console.log("login user -: ", user);

        dispatch({ type: GET_PROFILE_SUCCESS, payload: user });
    } catch (error) {
        dispatch(
            { type: GET_PROFILE_FAILURE, payload: error.message }
        );
    }
};

export const updateUserProfile = (reqData) => async (dispatch) => {
    console.log("update profile reqData", reqData)
    dispatch({ type: UPDATE_USER_REQUEST })
    try {
        const response = await api.put(`/api/users/update`, reqData);
        const user = response.data;
        console.log("updated user -: ", user);

        dispatch({ type: UPDATE_USER_SUCCESS, payload: user });
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
    }
};

export const searchUser = (query) => async (dispatch) => {
    dispatch({ type: GET_PROFILE_REUEST });
    try {
        const response = await api.get(`${API_BASE_URL}/api/users/search?query=${query}`);
        const users = response.data;

        dispatch({ type: SEARCH_USER_SUCCESS, payload: users });
    } catch (error) {
        dispatch(
            { type: SEARCH_USER_FAILURE, payload: error.message }
        );
    }
};