import { Box, Typography } from "@mui/material";

import React from "react";

const EmptyData = ({ image, text }) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: 550,
                display: "flex",
                alignItem: "center",
                justifyContent: "center",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    height: "50%",
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                }}
            >
                <Box component='img' src={image} sx={{ height: "70%" }} />
                <Typography variant='h4' color='#116530'>
                    {text}
                </Typography>
            </Box>
        </Box>
    );
};

export default EmptyData;
