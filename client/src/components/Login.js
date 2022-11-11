import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";
import CustomAlert from "./CustomAlert";
import UserFormDetails from "./UserFormDetails";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
    email: "",
    password: "",
};

const Login = () => {
    const navigate = useNavigate();
    const { user, loginUser, showAlert, alertText, alertType } =
        useAppContext();
    const [values, setValues] = useState(initialState);

    const handleChange = (e) => {
        e.preventDefault();
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        loginUser(values);
    };

    useEffect(() => {
        if (user) {
            user.userType === "User" ? navigate("/") : navigate("/admin");
        }
    }, [user, navigate]);

    return (
        <Box sx={{ px: 5 }}>
            {showAlert && (
                <CustomAlert alertType={alertType} alertText={alertText} />
            )}
            <UserFormDetails
                values={values}
                handleChange={handleChange}
                login
                handleSubmit={handleSubmit}
            />
        </Box>
    );
};

export default Login;
