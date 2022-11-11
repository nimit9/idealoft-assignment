import {
    Box,
    Button,
    Container,
    List,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { LoadingButton } from "@mui/lab";
import VectorImage from "../asset/vector10.svg";
import axios from "axios";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const User = () => {
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const allowedFileTypes = ["xlsx", "xlsm", "xls"];
    const { token, logoutUser } = useAppContext();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("excelFile", file);

        setLoading(true);
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/user/upload-data`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccess(true);
        } catch (error) {
            setLoading(false);
            if (error.response.status === 401) {
                logoutUser();
            }
        }
    };

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setLoading(false);
                navigate("tree-data");
            }, [1000]);
        }
    }, [success, navigate]);

    const handleFileChange = (e) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            if (file.size / 1024 / 1024 > 2) {
                alert("File size more than 2mb");
                return;
            }
            if (!allowedFileTypes.includes(file.name.split(".").slice(-1)[0])) {
                alert(`Only ${allowedFileTypes.toString()} files are allowed`);
                return;
            }
            setFile(file);
        }
    };

    return (
        <Container maxWidth='lg'>
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-around'
                sx={{ mt: 4 }}
            >
                <Box
                    component='img'
                    src={VectorImage}
                    sx={{
                        height: 500,
                        display: "inline-block",
                        width: "35%",
                    }}
                    alt='vector image'
                />
                <Paper
                    sx={{
                        width: "40%",
                        p: 4,
                        borderRadius: 5,
                        border: "1px solid green",
                    }}
                    component={Stack}
                    alignItems='center'
                    elevation={10}
                >
                    <Typography variant='h4'>Upload Tree Data</Typography>
                    <List
                        sx={{
                            listStyleType: "disc",
                            my: 4,

                            "& .MuiListItem-root": {
                                display: "list-item",
                                p: 0,
                            },
                            width: "90%",
                        }}
                    >
                        <ListItem>
                            <ListItemText
                                primary='Allowed file types'
                                secondary={allowedFileTypes.toString()}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary='Please include all the fields'
                                secondary='Scientific name, Local name, Growth of the tree(1-10), Tree planted date, Tree health(1-5), Data entry date, Week of the year (number)'
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary='Max File Size'
                                secondary='2 mb'
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary='Data from 1st sheet gets uploaded' />
                        </ListItem>
                    </List>
                    {file && (
                        <Typography variant='body2' sx={{ mb: 1 }}>
                            "{file.name}"
                        </Typography>
                    )}
                    <Stack spacing={2}>
                        <Button
                            sx={{
                                borderRadius: 2,
                                height: 50,
                                width: 200,
                                fontSize: 16,
                            }}
                            variant={file ? "outlined" : "contained"}
                            component='label'
                            disabled={loading}
                        >
                            {file ? "Change File" : "Upload Excel File"}
                            <input
                                onChange={handleFileChange}
                                type='file'
                                hidden
                                accept='.xlsx, .xlsm, .xls'
                            />
                        </Button>

                        <LoadingButton
                            sx={{
                                borderRadius: 2,
                                height: 50,
                                width: 200,
                                fontSize: 16,
                                "&:disabled": {
                                    backgroundColor: loading
                                        ? "primary.main"
                                        : "",
                                },
                                "& .css-1yt7yx7-MuiLoadingButton-loadingIndicator":
                                    {
                                        color: "#fff",
                                    },
                            }}
                            variant='contained'
                            size='large'
                            disabled={!file}
                            onClick={handleSubmit}
                            loading={loading}
                        >
                            Submit
                        </LoadingButton>
                    </Stack>
                </Paper>
            </Stack>
        </Container>
    );
};

export default User;
