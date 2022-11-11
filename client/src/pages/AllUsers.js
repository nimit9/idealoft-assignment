import {
    Avatar,
    Badge,
    Box,
    Container,
    Grid,
    LinearProgress,
    Link,
    Paper,
    SvgIcon,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import EmptyData from "../components/EmptyData";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as Tree } from "../asset/tree.svg";
import Void from "../asset/void.svg";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { useAppContext } from "../context/appContext";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: "#FA3E3E",
        color: "#FA3E3E",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        width: 15,
        height: 15,
        borderRadius: "50%",
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",

            animation: "ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(0)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2)",
            opacity: 0,
        },
    },
}));

const CardLink = (props) => (
    <Link underline='none' component={RouterLink} {...props} />
);

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const { token, logoutUser } = useAppContext();

    const getAllUsers = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/v1/admin/get-all-users`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTimeout(() => {
                setAllUsers(data.users);
                setLoading(false);
            }, [500]);
        } catch (error) {
            setLoading(false);
            if (error.response.status === 401) {
                logoutUser();
            }
        }
    };
    useEffect(() => {
        getAllUsers();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return (
            <Container maxWidth='lg' sx={{ mt: 1 }}>
                <LinearProgress />
            </Container>
        );
    }
    return (
        <Container maxWidth='md' sx={{ my: 4 }}>
            {!allUsers.length ? (
                <EmptyData image={Void} text='No User Present' />
            ) : (
                <Grid
                    container
                    rowSpacing={8}
                    columnSpacing={5}
                    sx={{ px: 2 }}
                    maxWidth='md'
                >
                    {allUsers?.length &&
                        allUsers.map((user) => {
                            const name = user.firstName + " " + user.lastName;
                            return (
                                <Grid item xs={4} key={user.userId}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 2,
                                            borderRadius: 4,
                                            border: "0.5px solid #116530",
                                            justifyContent: "center",
                                            textAlign: "center",
                                        }}
                                        component={CardLink}
                                        to={`${user.userId}`}
                                        state={{ user }}
                                        elevation={4}
                                    >
                                        <StyledBadge
                                            overlap='circular'
                                            anchorOrigin={{
                                                vertical: "top",
                                                horizontal: "right",
                                            }}
                                            variant='dot'
                                            invisible={
                                                !user.uploadTime ||
                                                new Date(user.seenTime) >=
                                                    new Date(user.uploadTime)
                                            }
                                        >
                                            <Avatar
                                                src={user.image}
                                                sx={{ width: 100, height: 100 }}
                                            />
                                        </StyledBadge>

                                        <Typography
                                            variant='body1'
                                            sx={{
                                                fontWeight: "600",
                                                mb: 2,
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {name}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                            }}
                                        >
                                            <Typography
                                                variant='h5'
                                                color='primary'
                                                letterSpacing={-0.5}
                                            >
                                                {user.totalTrees}
                                            </Typography>
                                            <SvgIcon
                                                component={Tree}
                                                inheritViewBox
                                                color='primary'
                                            />
                                        </Box>
                                    </Paper>
                                </Grid>
                            );
                        })}
                </Grid>
            )}
        </Container>
    );
};

export default AllUsers;
