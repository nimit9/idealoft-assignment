import {
    Avatar,
    Box,
    Container,
    Divider,
    IconButton,
    Link,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

import Logout from "@mui/icons-material/Logout";
import React from "react";
import { useAppContext } from "../context/appContext";

const Navbar = ({ admin }) => {
    const { user, logoutUser } = useAppContext();

    const location = useLocation();

    const path = location.pathname;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Container
            maxWidth='lg'
            sx={{
                height: "20%",
                py: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Link
                component={RouterLink}
                to={admin ? "/admin" : "/"}
                size='large'
                underline='none'
            >
                <Stack direction='row' alignItems='center' spacing={1}>
                    <Typography variant='h4' color='#111'>
                        IDEALOFT
                    </Typography>
                    <Typography color='#116530' variant='h4' fontWeight={600}>
                        {admin ? "ADMIN" : "GREEN"}
                    </Typography>
                </Stack>
            </Link>

            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                {admin ? (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                        }}
                    >
                        <Link
                            sx={{
                                my: 2,
                                display: "block",
                                color: path === "/admin" ? "#116530" : "#777",
                                "&:hover": {
                                    color: "#116530",
                                },
                            }}
                            component={RouterLink}
                            to='/admin'
                            size='large'
                            underline='none'
                        >
                            <Typography
                                fontSize={20}
                                fontWeight={600}
                                sx={{ letterSpacing: -0.5 }}
                            >
                                ALL DATA
                            </Typography>
                        </Link>
                        <Link
                            sx={{
                                my: 2,
                                display: "block",
                                color:
                                    path === "/admin/users"
                                        ? "#116530"
                                        : "#777",
                                "&:hover": {
                                    color: "#116530",
                                },
                            }}
                            component={RouterLink}
                            to='users'
                            size='large'
                            underline='none'
                        >
                            <Typography
                                fontSize={20}
                                fontWeight={600}
                                sx={{ letterSpacing: -0.5 }}
                            >
                                USERS
                            </Typography>
                        </Link>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                        }}
                    >
                        <Link
                            sx={{
                                my: 2,
                                display: "block",
                                color:
                                    path === "/user/tree-data"
                                        ? "#116530"
                                        : "#777",
                                "&:hover": {
                                    color: "#116530",
                                },
                            }}
                            component={RouterLink}
                            to='tree-data'
                            size='large'
                            underline='none'
                        >
                            <Typography
                                fontSize={20}
                                fontWeight={600}
                                sx={{ letterSpacing: -0.5 }}
                            >
                                TREES PLANTED
                            </Typography>
                        </Link>
                        <Link
                            sx={{
                                my: 2,
                                display: "block",
                                color: path === "/user" ? "#116530" : "#777",
                                "&:hover": {
                                    color: "#116530",
                                },
                            }}
                            component={RouterLink}
                            to=''
                            size='large'
                            underline='none'
                        >
                            <Typography
                                fontSize={20}
                                fontWeight={600}
                                sx={{ letterSpacing: -0.5 }}
                            >
                                UPLOAD DATA
                            </Typography>
                        </Link>
                    </Box>
                )}
                <Box>
                    <Tooltip title='Click to open dropdown'>
                        <IconButton sx={{ p: 0 }} onClick={handleOpenMenu}>
                            <Avatar
                                alt='Cindy Baker'
                                src={user.image}
                                sx={{
                                    width: 48,
                                    height: 48,
                                    border: "2px solid #116530",
                                    boxShadow: 10,
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id='account-menu'
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                "&:before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                        }}
                        anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                        }}
                    >
                        <MenuItem disabled>
                            <Typography sx={{ fontWeight: 700 }}>
                                {`${user.firstName} ${user.lastName}`}
                            </Typography>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => logoutUser()}>
                            <ListItemIcon>
                                <Logout fontSize='small' />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
        </Container>
    );
};

export default Navbar;
