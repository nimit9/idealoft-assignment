import { getBulkInsertQuery, getKeysandValues } from "../utils/dbHelper.js";

import { StatusCodes } from "http-status-codes";
import db from "../db/connection.js";
import { getDataFromExcelFile } from "../utils/getDataFromExcelFile.js";
import { getUserTrees } from "../utils/getUserTrees.js";
import mysql from "mysql2";

const uploadExcelFile = async (req, res) => {
    var data = getDataFromExcelFile(req.file.path);

    const { userId } = req.user;

    data = data.map((obj) => {
        return { ...obj, userId };
    });

    const dataWithId = data.filter((obj) => obj.treeId);
    const dataWithoutId = data.filter((obj) => !obj.treeId);

    if (dataWithId.length) {
        var queries = "";

        dataWithId.forEach((obj) => {
            queries += mysql.format("UPDATE trees SET ? where treeId = ?; ", [
                obj,
                obj.treeId,
            ]);
        });
        await db.query(queries);
    }

    if (dataWithoutId.length) {
        let [keys, values] = getKeysandValues(dataWithoutId);
        let query = getBulkInsertQuery("trees", keys);

        await db.query(query, [values]);
    }

    await db.query(
        `UPDATE time_mappings SET uploadTime=now() where userId='${userId}'`
    );

    res.status(StatusCodes.OK).send("Upload Successfull!");
};

const getTreeData = async (req, res) => {
    const { userId } = req.user;
    const treeData = await getUserTrees(userId);

    res.status(StatusCodes.OK).json({
        treeData,
    });
};

export { uploadExcelFile, getTreeData };
