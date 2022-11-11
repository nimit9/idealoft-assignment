import { Box, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Container } from "@mui/system";
import DataTable from "../components/DataTable";
import EmptyData from "../components/EmptyData";
import EmptySvg from "../asset/empty.svg";
import axios from "axios";
import { useAppContext } from "../context/appContext";

const UserTreeData = () => {
    const [loading, setLoading] = useState(false);
    const [treeData, setTreeData] = useState([]);

    const { token, logoutUser } = useAppContext();

    const getUserTreeData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/v1/user/tree-data`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTimeout(() => {
                setTreeData(data.treeData);
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
            ) : !treeData.length ? (
                <EmptyData image={EmptySvg} text='No Data Uploaded' />
            ) : (
                <Box sx={{ height: 600, width: "85%", m: "0 auto", pt: 5 }}>
                    <DataTable
                        rows={treeData}
                        loading={loading}
                        invisibleColumns={{ userName: false }}
                    />
                </Box>
            )}
        </Container>
    );
};

export default UserTreeData;
