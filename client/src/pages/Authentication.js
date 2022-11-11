import { Box, LinearProgress } from "@mui/material";

import AuthForm from "../components/AuthForm";
import React from "react";
import authImage from "../asset/auth-image.jpg";
import { useAppContext } from "../context/appContext";

const Authentication = () => {
    const { isLoading } = useAppContext();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <Box
                component='img'
                src={authImage}
                sx={{
                    height: "100vh",
                    display: "inline-block",
                    width: "60%",
                }}
                alt='image of authentication page'
            />

            <Box
                sx={{
                    width: "40%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    pt: 8,
                    pb: 4,
                    position: "relative",
                }}
            >
                {isLoading && (
                    <LinearProgress
                        sx={{ width: "100%", position: "absolute", top: 0 }}
                    />
                )}
                <AuthForm />
            </Box>
        </Box>
    );
};

export default Authentication;
