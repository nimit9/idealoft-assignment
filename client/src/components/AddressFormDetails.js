import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const AddressFormDetails = ({ values, handleChange, next }) => {
    const [formError, setFormError] = useState(false);

    const handleNext = () => {
        const { addressLine1, area, city, state, pincode } = values;

        if (!addressLine1 || !area || !city || !state || !pincode) {
            setFormError(true);
            return;
        }
        next();
    };

    return (
        <>
            <Stack justifyContent='space-between' spacing={4}>
                <Stack spacing={2} alignItems='center' component='form'>
                    <TextField
                        placeholder='22B Baker Street'
                        label='Address Line 1'
                        name='addressLine1'
                        variant='outlined'
                        required
                        value={values.addressLine1}
                        onChange={handleChange}
                        error={formError && values.addressLine1.length === 0}
                        helperText={
                            formError && values.addressLine1.length === 0
                                ? "Please enter your address"
                                : ""
                        }
                        size='small'
                        fullWidth
                    />
                    <TextField
                        placeholder='Near Jhumri Talaiya'
                        label='Address Line 2'
                        name='addressLine2'
                        variant='outlined'
                        value={values.addressLine2}
                        onChange={handleChange}
                        size='small'
                        fullWidth
                    />

                    <Stack
                        direction='row'
                        spacing={2}
                        justifyContent='space-between'
                        sx={{ width: "100%" }}
                    >
                        <TextField
                            placeholder='Area'
                            label='Area'
                            name='area'
                            variant='outlined'
                            required
                            error={formError && values.area.length === 0}
                            helperText={
                                formError && values.area.length === 0
                                    ? "Please enter area"
                                    : ""
                            }
                            onChange={handleChange}
                            value={values.area}
                            size='small'
                            sx={{ width: "50%" }}
                        />
                        <TextField
                            placeholder='City'
                            label='City'
                            name='city'
                            variant='outlined'
                            required
                            error={formError && values.city.length === 0}
                            helperText={
                                formError && values.city.length === 0
                                    ? "Please enter city"
                                    : ""
                            }
                            onChange={handleChange}
                            value={values.city}
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
                            placeholder='State'
                            label='State'
                            name='state'
                            variant='outlined'
                            required
                            error={formError && values.state.length === 0}
                            helperText={
                                formError && values.state.length === 0
                                    ? "Please enter state"
                                    : ""
                            }
                            onChange={handleChange}
                            value={values.state}
                            size='small'
                            sx={{ width: "50%" }}
                        />
                        <TextField
                            placeholder='Pincode'
                            label='Pincode'
                            name='pincode'
                            variant='outlined'
                            required
                            error={formError && values.pincode.length === 0}
                            helperText={
                                formError && values.pincode.length === 0
                                    ? "Please enter pincode"
                                    : ""
                            }
                            onChange={handleChange}
                            value={values.pincode}
                            size='small'
                            sx={{ width: "50%" }}
                        />
                    </Stack>
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

export default AddressFormDetails;
