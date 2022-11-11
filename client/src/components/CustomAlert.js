import { Alert } from "@mui/material";
import React from "react";

const CustomAlert = ({ alertType, alertText }) => {
    return (
        <Alert severity={alertType} sx={{ my: 2 }}>
            {alertText}
        </Alert>
    );
};

export default CustomAlert;
