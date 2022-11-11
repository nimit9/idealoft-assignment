import { Box, LinearProgress, SvgIcon, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";

import BarGraph from "../components/BarGraph";
import { Container } from "@mui/system";
import DataTable from "../components/DataTable";
import EmptyData from "../components/EmptyData";
import EmptySvg from "../asset/empty.svg";
import { ReactComponent as Graph } from "../asset/chart.svg";
import TabPanel from "../components/TabPanel";
import { ReactComponent as Table } from "../asset/table.svg";
import axios from "axios";
import { useAppContext } from "../context/appContext";
import { useFirstRender } from "../hooks/useFirstRender";

const Admin = () => {
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [treeNames, setTreeNames] = useState([]);

    const firstRender = useFirstRender();

    const { token, logoutUser } = useAppContext();
    const [tab, setTab] = useState(0);

    const handleTabChange = (e, tab) => {
        setTab(tab);
    };

    const getUserTreeData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/v1/admin/tree-data`,
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
            }, [500]);
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
            ) : !tableData.length || !graphData.length ? (
                <EmptyData image={EmptySvg} text='No Data Present' />
            ) : (
                <>
                    <Tabs
                        value={tab}
                        onChange={handleTabChange}
                        aria-label='basic tabs example'
                        centered
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

                    <TabPanel value={tab} index={0}>
                        <BarGraph
                            loading={loading}
                            data={graphData}
                            seriesData={treeNames}
                            firstRender={firstRender}
                        />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <Box sx={{ height: 550, width: "100%" }}>
                            <DataTable
                                rows={tableData}
                                loading={loading}
                                invisibleColumns={{}}
                            />
                        </Box>
                    </TabPanel>
                </>
            )}
        </Container>
    );
};

export default Admin;
