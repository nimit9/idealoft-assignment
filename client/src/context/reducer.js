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

import { initialState } from "./appContext";

const reducer = (state, action) => {
    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertType: "danger",
                alertText: "Please provide all values",
            };

        case CLEAR_ALERT:
            return {
                ...state,
                showAlert: false,
                alertType: "",
                alertText: "",
            };

        case REGISTER_USER_BEGIN:
            return { ...state, isLoading: true };

        case REGISTER_USER_SUCCESS:
            const { user, token, location } = action.payload;
            return {
                ...state,
                isLoading: false,
                user,
                token,
                userLocation: location,
                jobLocation: location,
            };

        case REGISTER_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "error",
                alertText: action.payload.msg,
            };

        case LOGIN_USER_BEGIN:
            return { ...state, isLoading: true };

        case LOGIN_USER_SUCCESS: {
            const { user, token, location } = action.payload;
            return {
                ...state,
                isLoading: false,
                user,
                token,
                userLocation: location,
                jobLocation: location,
            };
        }

        case LOGIN_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "error",
                alertText: action.payload.msg,
            };

        case LOGOUT_USER:
            return {
                ...initialState,
                user: null,
                token: null,
                userLocation: "",
                jobLocation: "",
            };
        case UPLOAD_EXCEL_FILE_BEGIN:
            return { ...state, isLoading: true };
        case UPLOAD_EXCEL_FILE_SUCCESS:
            return {
                ...state,
                treeData: action.payload.treeData,
                isLoading: false,
            };

        case UPLOAD_EXCEL_FILE_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "danger",
                alertText: action.payload.msg,
            };
        default:
            throw new Error(`no such action : ${action.type}`);
    }
};

export default reducer;
