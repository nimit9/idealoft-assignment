import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import Login from "./Login";
import Register from "./Register";

const AuthForm = () => {
    const [isMember, setIsMember] = useState(true);
    return (
        <>
            <Stack direction='row' alignItems='center' spacing={1}>
                <Typography variant='h3' color='#111'>
                    IDEALOFT
                </Typography>
                <Typography color='#116530' variant='h3' fontWeight={600}>
                    GREEN
                </Typography>
            </Stack>

            <Box sx={{ width: "100%", pl: 2, pr: 2, mt: 5, flexGrow: 1 }}>
                {isMember ? <Login /> : <Register />}
            </Box>

            <Typography
                variant='body2'
                component='div'
                fontWeight={500}
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
                {isMember ? "Not a member yet?" : "Already a member?"}
                <Button
                    onClick={() => {
                        setIsMember(!isMember);
                    }}
                    variant='text'
                >
                    {isMember ? "Register" : "Login"}
                </Button>
            </Typography>
        </>
    );
};

export default AuthForm;
