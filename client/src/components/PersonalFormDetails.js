import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EditIcon from "@mui/icons-material/Edit";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const genders = [
    "Male",
    "Female",
    "Transgender",
    "Non-Binary",
    "Prefer not to respond",
];

const addOneDay = (date) => {
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);

    return newDate.toISOString().substring(0, 10);
};

const PersonalFormDetails = ({
    values,
    handleChange,
    next,
    handleFileChange,
}) => {
    const [formError, setFormError] = useState(false);

    const handleNext = () => {
        const { firstName, lastName, dob, gender, aadharNumber } = values;
        if (
            !firstName ||
            !lastName ||
            !dob ||
            !gender ||
            aadharNumber.length !== 12
        ) {
            setFormError(true);
            return;
        }
        next();
    };

    return (
        <>
            <Stack justifyContent='space-between' spacing={4}>
                <Stack spacing={2} alignItems='center' component='form'>
                    <Stack direction='row' spacing={2} sx={{ width: "100%" }}>
                        <TextField
                            placeholder='John'
                            label='First Name'
                            name='firstName'
                            variant='outlined'
                            required
                            value={values.firstName}
                            onChange={handleChange}
                            error={formError && values.firstName.length === 0}
                            helperText={
                                formError && values.firstName.length === 0
                                    ? "Please enter frist name"
                                    : ""
                            }
                            size='small'
                            sx={{ width: "50%" }}
                        />
                        <TextField
                            placeholder='Doe'
                            label='Last Name'
                            name='lastName'
                            variant='outlined'
                            required
                            error={formError && values.lastName.length === 0}
                            helperText={
                                formError && values.lastName.length === 0
                                    ? "Please enter frist name"
                                    : ""
                            }
                            onChange={handleChange}
                            value={values.lastName}
                            size='small'
                            sx={{ width: "50%" }}
                        />
                    </Stack>
                    <Stack
                        direction='row'
                        spacing={2}
                        justifyContent='space-between'
                        sx={{ width: "100%" }}
                    >
                        <TextField
                            select
                            label='Gender'
                            name='gender'
                            value={values.gender || ""}
                            onChange={handleChange}
                            sx={{ width: "50%" }}
                            size='small'
                            required
                            error={formError && values.gender.length === 0}
                            helperText={
                                formError && values.gender.length === 0
                                    ? "Please choose a gender"
                                    : ""
                            }
                        >
                            {genders.map((gender) => (
                                <MenuItem key={gender} value={gender}>
                                    {gender}
                                </MenuItem>
                            ))}
                        </TextField>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label='Date of birth'
                                inputFormat='YYYY-MM-DD'
                                value={values.dob}
                                name='dob'
                                onChange={(date) => {
                                    if (
                                        date &&
                                        date.$d.toString() !== "Invalid Date"
                                    ) {
                                        handleChange({
                                            target: {
                                                name: "dob",
                                                value: addOneDay(date),
                                            },
                                        });
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        required
                                        sx={{ width: "50%" }}
                                        size='small'
                                        error={
                                            formError && values.dob.length === 0
                                        }
                                        helperText={
                                            formError && values.dob.length === 0
                                                ? "Please enter valid dob"
                                                : ""
                                        }
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Stack>
                    <TextField
                        placeholder='Aadhar Number'
                        label='Aadhar Number'
                        name='aadharNumber'
                        variant='outlined'
                        required
                        error={formError && values.aadharNumber.length !== 12}
                        helperText={
                            formError && values.aadharNumber.length !== 12
                                ? "Please enter valid aadhar number"
                                : ""
                        }
                        onChange={handleChange}
                        value={values.aadharNumber}
                        size='small'
                        fullWidth
                    />
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            pt: 2,
                        }}
                    >
                        {!values.image ? (
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    bgcolor: "#aaa",
                                    opacity: 0.5,
                                    borderRadius: "50%",
                                }}
                            />
                        ) : (
                            <Box
                                component='img'
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: "50%",
                                }}
                                src={URL.createObjectURL(values.image)}
                            />
                        )}
                        <Button
                            sx={{
                                borderRadius: 2,
                                fontSize: 16,
                                textTransform: "none",
                            }}
                            variant='outlined'
                            component='label'
                            startIcon={
                                values.image ? <EditIcon /> : <FileUploadIcon />
                            }
                        >
                            {values.image
                                ? values.image.name
                                : "Upload Profile Picture"}

                            <input
                                onChange={handleFileChange}
                                type='file'
                                hidden
                                accept='image/jpeg'
                            />
                        </Button>
                    </Box>
                </Stack>
                <Stack direction='row' justifyContent='end'>
                    <Box sx={{ mt: 2 }}>
                        <Button
                            variant='contained'
                            onClick={handleNext}
                            size='large'
                            endIcon={<NavigateNextIcon />}
                            sx={{ borderRadius: 2 }}
                        >
                            Next
                        </Button>
                    </Box>
                </Stack>
            </Stack>
        </>
    );
};

export default PersonalFormDetails;
