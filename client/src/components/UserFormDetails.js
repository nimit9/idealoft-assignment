import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

import { useAppContext } from "../context/appContext";
import validator from "validator";

const UserFormDetails = ({
    values,
    handleChange,
    register,
    login,
    handleSubmit,
}) => {
    const [formError, setFormError] = useState(false);
    const { isLoading } = useAppContext();

    const validateInput = (userType) => {
        if (!validator.isEmail(values.email) || values.password.length < 8) {
            setFormError(true);
            return;
        }
        handleSubmit(userType);
    };

    return (
        <>
            <Stack spacing={2} component='form'>
                <TextField
                    placeholder='Enter your email'
                    label='Email'
                    name='email'
                    variant='outlined'
                    required
                    value={values.email}
                    onChange={handleChange}
                    error={formError && !validator.isEmail(values.email)}
                    helperText={
                        formError && !validator.isEmail(values.email)
                            ? "Please enter valid email"
                            : ""
                    }
                    fullWidth
                />
                <TextField
                    placeholder='Enter your password'
                    label='Password'
                    name='password'
                    variant='outlined'
                    type='password'
                    required
                    error={formError && values.password.length < 8}
                    helperText={
                        formError && values.password.length < 8
                            ? "Password length should be minimum 8"
                            : ""
                    }
                    onChange={handleChange}
                    value={values.password}
                    fullWidth
                />
            </Stack>
            {register && (
                <Stack
                    sx={{
                        mt: 5,
                    }}
                    alignItems='center'
                    justifyContent='space-between'
                    spacing={2}
                >
                    <Button
                        variant='contained'
                        onClick={() => validateInput("User")}
                        sx={{ width: "50%" }}
                        size='large'
                        disabled={isLoading}
                    >
                        Register as user
                    </Button>
                    <Button
                        variant='outlined'
                        onClick={() => validateInput("Admin")}
                        sx={{ width: "50%" }}
                        size='large'
                        disabled={isLoading}
                    >
                        Register as Admin
                    </Button>
                </Stack>
            )}
            {login && (
                <Stack
                    sx={{
                        mt: 5,
                    }}
                    alignItems='center'
                    justifyContent='space-between'
                    spacing={2}
                >
                    <Button
                        variant='contained'
                        onClick={validateInput}
                        sx={{ width: "50%" }}
                        size='large'
                    >
                        Login
                    </Button>
                </Stack>
            )}
        </>
    );
};

export default UserFormDetails;
