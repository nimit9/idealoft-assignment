import {
    Box,
    Stack,
    Step,
    StepButton,
    StepLabel,
    Stepper,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import AddressFormDetails from "./AddressFormDetails";
import CustomAlert from "./CustomAlert";
import PersonalFormDetails from "./PersonalFormDetails";
import UserFormDetails from "./UserFormDetails";
import { getFormData } from "../utils/getFormData";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const steps = ["Personal Details", "Address", "Login Details"];

const initialState = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    state: "",
    city: "",
    area: "",
    pincode: "",
    aadharNumber: "",
    addressLine1: "",
    addressLine2: "",
    image: null,
};

const Register = () => {
    const navigate = useNavigate();
    const { registerUser, user, showAlert, alertText, alertType } =
        useAppContext();

    const [activeStep, setActiveStep] = useState(0);

    const [values, setValues] = useState(initialState);

    const allowedFileTypes = ["jpg", "jpeg"];

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleFileChange = async (e) => {
        var file = e.target.files ? e.target.files[0] : null;
        if (file) {
            if (file.size / 1024 / 1024 > 2) {
                alert("File size more than 2mb");
                return;
            }
            if (!allowedFileTypes.includes(file.name.split(".").slice(-1)[0])) {
                alert(`Only ${allowedFileTypes.toString()} files are allowed`);
                return;
            }
            setValues({ ...values, image: file });
        }
    };

    const next = () => {
        setActiveStep(activeStep + 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleSubmit = (userType) => {
        const {
            email,
            password,
            firstName,
            lastName,
            dob,
            gender,
            state,
            city,
            area,
            pincode,
            aadharNumber,
            addressLine1,
            addressLine2,
            image,
        } = values;
        const address = JSON.stringify({
            state,
            city,
            area,
            pincode,
            aadharNumber,
            addressLine1,
            addressLine2,
        });

        const user = {
            email,
            password,
            firstName,
            lastName,
            dob,
            gender,
            userType,
            address,
            image,
        };

        const userFormData = getFormData(user);

        registerUser(userFormData);
    };

    useEffect(() => {
        if (user) {
            user.userType === "User" ? navigate("/") : navigate("/admin");
        }
    }, [user, navigate]);

    return (
        <>
            <Stack sx={{ height: "100%" }}>
                <Stepper activeStep={activeStep} sx={{ px: 2 }}>
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepButton
                                    onClick={handleStep(index)}
                                    disableRipple
                                >
                                    <StepLabel>{label}</StepLabel>
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>

                <Box sx={{ px: 5, height: "100%", flexGrow: 1, mt: 5 }}>
                    {showAlert && (
                        <CustomAlert
                            alertType={alertType}
                            alertText={alertText}
                        />
                    )}
                    {activeStep === 0 && (
                        <PersonalFormDetails
                            values={values}
                            handleChange={handleChange}
                            next={next}
                            register
                            handleFileChange={handleFileChange}
                        />
                    )}
                    {activeStep === 1 && (
                        <AddressFormDetails
                            values={values}
                            handleChange={handleChange}
                            next={next}
                            register
                        />
                    )}
                    {activeStep === 2 && (
                        <UserFormDetails
                            values={values}
                            handleChange={handleChange}
                            next={next}
                            register
                            handleSubmit={handleSubmit}
                        />
                    )}
                </Box>
            </Stack>
        </>
    );
};

export default Register;
