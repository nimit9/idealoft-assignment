import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const treeDataColumns = [
    {
        field: "userName",
        headerName: "User",
        renderCell: (params) => {
            const { userId, firstName, lastName } = params.row;
            return (
                <Link
                    to={`users/${userId}`}
                    component={RouterLink}
                    state={{ user: { ...params.row } }}
                    underline='hover'
                >
                    {`${firstName || ""} ${lastName || ""}`}
                </Link>
            );
        },

        width: 150,
    },
    { field: "treeId", headerName: "Tree No.", width: 90 },
    {
        field: "scientificName",
        headerName: "Scientific Name",
        width: 200,
    },
    {
        field: "localName",
        headerName: "Local name",
        width: 100,
    },
    {
        field: "growth",
        headerName: "Growth",
        type: "number",
        width: 70,
    },
    {
        field: "datePlanted",
        headerName: "Date Planted",
        width: 100,
        type: "date",
    },
    {
        field: "health",
        headerName: "Health",
        type: "number",
        width: 70,
    },
    {
        field: "dateEntered",
        headerName: "Entry Date",
        width: 100,
        type: "date",
    },
    {
        field: "week",
        headerName: "Week Number",
        type: "number",
        width: 110,
    },
];

export default treeDataColumns;
