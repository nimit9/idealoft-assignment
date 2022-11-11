import { Box, Button, Link, Typography } from "@mui/material";

import NotFoundImage from "../asset/404.svg";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const CustomLink = (props) => (
    <Link underline='none' component={RouterLink} {...props} />
);

const NotFound = ({ image, text }) => {
    return (
        <Box
            sx={{
                width: "100%",
                maxHeight: "100vh",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                mt: 10,
            }}
        >
            <Box component='img' src={NotFoundImage} sx={{ height: 300 }} />
            <Typography
                variant='h3'
                color='#116530'
                component='div'
                fontWeight={700}
            >
                Page Not Found
            </Typography>
            <Typography
                variant='h6'
                color='#555'
                component='div'
                sx={{ mt: 2 }}
            >
                We're sorry, the page you requested could not be found
            </Typography>
            <Typography variant='h6' color='#555' component='div'>
                Please go back to the home page
            </Typography>
            <Button
                component={CustomLink}
                to='/'
                variant='contained'
                sx={{
                    width: "12%",
                    height: 60,
                    mt: 10,
                    fontSize: 25,
                    borderRadius: 2,
                }}
            >
                Go Home
            </Button>
        </Box>
    );
};

export default NotFound;
