import {
    Avatar,
    Box,
    Container,
    IconButton,
    LinearProgress,
    SvgIcon,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import BarGraph from "../components/BarGraph";
import DataTable from "../components/DataTable";
import EmptyData from "../components/EmptyData";
import EmptySvg from "../asset/empty.svg";
import { ReactComponent as Graph } from "../asset/chart.svg";
import { ReactComponent as Left } from "../asset/left.svg";
import TabPanel from "../components/TabPanel";
import { ReactComponent as Table } from "../asset/table.svg";
import axios from "axios";
import { useAppContext } from "../context/appContext";
import { useFirstRender } from "../hooks/useFirstRender";

const IndividualUser = () => {
    const { userId } = useParams();
    const {
        state: { user },
    } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.userId !== userId) {
            navigate("/not-found");
        }
        // eslint-disable-next-line
    }, [userId, user, navigate]);

    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [treeNames, setTreeNames] = useState([]);

    const { token, logoutUser } = useAppContext();
    const [tab, setTab] = useState(0);

    const firstRender = useFirstRender();

    const handleTabChange = (e, tab) => {
        setTab(tab);
    };

    const getUserTreeData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/admin/tree-data`,
                { userId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const { tableData, graphData } = data;
            setTimeout(() => {
                setTableData(tableData);
                setGraphData(graphData.data);
                setTreeNames(graphData.distinctTreeNames);
                setLoading(false);
            }, 500);
        } catch (error) {
            setLoading(false);
            if (error.response.status === 401) {
                logoutUser();
            }
        }
    };
    useEffect(() => {
        getUserTreeData();
        // eslint-disable-next-line
    }, []);
    return (
        <Container maxWidth='lg'>
            {loading ? (
                <LinearProgress />
            ) : (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                        }}
                    >
                        <Box
                            sx={{
                                ml: 2,
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                "&:hover": {
                                    cursor: "pointer",
                                },
                            }}
                            onClick={() => navigate(-1)}
                        >
                            <IconButton
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                    },
                                }}
                            >
                                <SvgIcon
                                    component={Left}
                                    inheritViewBox
                                    color='primary'
                                />
                            </IconButton>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <Avatar src={user.image} />
                                <Typography
                                    variant='h6'
                                    sx={{ letterSpacing: -0.5 }}
                                >{`${user.firstName} ${user.lastName}`}</Typography>
                            </Box>
                        </Box>

                        {Boolean(tableData.length && graphData.length) && (
                            <Tabs
                                value={tab}
                                onChange={handleTabChange}
                                aria-label='basic tabs example'
                                centered
                                sx={{
                                    position: "absolute",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                }}
                            >
                                <Tab
                                    icon={
                                        <SvgIcon
                                            component={Graph}
                                            inheritViewBox
                                            color='primary'
                                        />
                                    }
                                />
                                <Tab
                                    icon={
                                        <SvgIcon
                                            component={Table}
                                            inheritViewBox
                                            color='primary'
                                        />
                                    }
                                />
                            </Tabs>
                        )}
                    </Box>
                    {!tableData.length || !graphData.length ? (
                        <EmptyData image={EmptySvg} text='No Data Present' />
                    ) : (
                        <>
                            <TabPanel value={tab} index={0}>
                                {loading ? (
                                    <LinearProgress />
                                ) : (
                                    <BarGraph
                                        loading={loading}
                                        data={graphData}
                                        seriesData={treeNames}
                                        firstRender={firstRender}
                                    />
                                )}
                            </TabPanel>
                            <TabPanel value={tab} index={1}>
                                <Box
                                    sx={{
                                        height: 550,
                                        width: "87%",
                                        margin: "0 auto",
                                    }}
                                >
                                    <DataTable
                                        rows={tableData}
                                        loading={loading}
                                        invisibleColumns={{ userName: false }}
                                        downloadFileName={`${user.firstName}_${user.lastName}_${user.userId}.xlsx`}
                                    />
                                </Box>
                            </TabPanel>
                        </>
                    )}
                </>
            )}
        </Container>
    );
};

export default IndividualUser;
