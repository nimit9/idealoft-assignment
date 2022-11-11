import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    LOGIN_USER_BEGIN,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    UPLOAD_EXCEL_FILE_BEGIN,
    UPLOAD_EXCEL_FILE_ERROR,
    UPLOAD_EXCEL_FILE_SUCCESS,
} from "./actions";
import React, { useContext, useReducer } from "react";

import axios from "axios";
import reducer from "./reducer";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user: user ? JSON.parse(user) : null,
    token: token,
    treeData: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
        clearAlert();
    };

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT });
        }, 3000);
    };

    const addUserToLocalStorage = (user, token) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    };

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN });
        try {
            const response = await axios.post(
                "/api/v1/auth/register",
                currentUser,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            const { user, token } = response.data;
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: { user, token },
            });
            addUserToLocalStorage(user, token);
        } catch (error) {
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
        clearAlert();
    };

    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN });
        try {
            const response = await axios.post(
                "/api/v1/auth/login",
                currentUser
            );
            const { user, token } = response.data;
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user, token },
            });
            addUserToLocalStorage(user, token);
        } catch (error) {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
        clearAlert();
    };

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER });
        removeUserFromLocalStorage();
    };

    const uploadExcelFile = async (formData) => {
        dispatch({ type: UPLOAD_EXCEL_FILE_BEGIN });
        try {
            const response = await axios.post(
                "/api/v1/user/upload-data",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${state.token}`,
                    },
                }
            );
            const treeData = response.data;
            dispatch({
                type: UPLOAD_EXCEL_FILE_SUCCESS,
                payload: { treeData },
            });
        } catch (error) {
            dispatch({
                type: UPLOAD_EXCEL_FILE_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                displayAlert,
                registerUser,
                loginUser,
                logoutUser,
                uploadExcelFile,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
