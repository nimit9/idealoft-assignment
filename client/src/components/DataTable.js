import { Button, LinearProgress } from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import React, { useState } from "react";

import DownloadIcon from "@mui/icons-material/Download";
import columns from "../utils/getTreeDataColumns";
import { getExcelFromJSON } from "../utils/getExcelFromJSON";
import { useAppContext } from "../context/appContext";

function CustomToolbar({ selectionModel, handleDownload }) {
    return (
        <GridToolbarContainer sx={{ justifyContent: "end    " }}>
            <Button startIcon={<DownloadIcon />} onClick={handleDownload}>
                {selectionModel.length
                    ? "Download selected rows"
                    : "Download all rows"}
            </Button>
        </GridToolbarContainer>
    );
}

const DataTable = ({ rows, loading, invisibleColumns, downloadFileName }) => {
    const [downloading, setDownloading] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]);
    const [pageSize, setPageSize] = useState(50);
    const { user } = useAppContext();

    const handleDownload = () => {
        setDownloading(true);
        setTimeout(() => {
            var data = rows;
            if (selectionModel.length) {
                data = data.filter((obj) =>
                    selectionModel.includes(obj.treeId)
                );
            }
            const fileName = downloadFileName || `${user.userId}.xlsx`;
            getExcelFromJSON(data, fileName);
            setDownloading(false);
        }, [1000]);
    };

    return (
        <DataGrid
            density='compact'
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(row) => row.treeId}
            onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
            components={{
                Toolbar: rows.length ? CustomToolbar : null,
                LoadingOverlay: LinearProgress,
            }}
            componentsProps={{
                toolbar: { selectionModel, handleDownload },
            }}
            loading={loading || downloading}
            sx={{
                border: "1px solid #116530",
                boxShadow: 15,
                borderRadius: 4,
                p: 2,
            }}
            columnVisibilityModel={invisibleColumns}
        />
    );
};

export default DataTable;
