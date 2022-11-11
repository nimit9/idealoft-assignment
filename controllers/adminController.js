import { StatusCodes } from "http-status-codes";
import db from "../db/connection.js";
import { getUserTrees } from "../utils/getUserTrees.js";

const getTreeData = async (req, res) => {
    var [distinctTreeNames, ,] = await db.query(
        `SELECT distinct(localName) from trees`
    );
    var graphData = [];
    var tableData = [];

    if (distinctTreeNames.length) {
        distinctTreeNames = distinctTreeNames.map((obj) => obj.localName);

        var subquery = "";
        distinctTreeNames.forEach((value) => {
            var localName = db.escape(value);
            subquery += `COUNT (case localName when ${localName} then 1 else null end) as ${localName},`;
        });

        subquery = subquery.slice(0, -1);

        var query = `SELECT week, ${subquery} from trees group by week`;
        var [graphTreeData, ,] = await db.query(query);
        graphData = { data: graphTreeData, distinctTreeNames };

        [tableData, ,] = await db.query(
            "SELECT trees.*, users.userId, users.firstName, users.lastName, users.image from trees join users on users.userId=trees.userId"
        );
    }

    res.status(StatusCodes.OK).json({ graphData, tableData });
};

const getTreeDataByUser = async (req, res) => {
    const { userId } = req.body;
    var [distinctTreeNames, ,] = await db.query(
        `SELECT distinct(localName) from trees`
    );
    distinctTreeNames = distinctTreeNames.map((obj) => obj.localName);

    var subquery = "";
    distinctTreeNames.forEach((value) => {
        const localName = db.escape(value);
        subquery += `COUNT (case localName when ${localName} then 1 else null end) as ${localName},`;
    });
    subquery = subquery.slice(0, -1);
    var query = `SELECT week, ${subquery} from trees where userId=${db.escape(
        userId
    )} group by week`;
    var [graphTreeData, ,] = await db.query(query);

    const graphData = { data: graphTreeData, distinctTreeNames };
    const tableData = await getUserTrees(userId);

    await db.query(
        `UPDATE time_mappings SET seenTime=now() where userId='${userId}'`
    );

    res.status(StatusCodes.OK).json({ graphData, tableData });
};

const getAllUsers = async (req, res) => {
    var [users, ,] = await db.query(
        "SELECT u.userId, u.firstName,u.lastName, u.image,tm.seenTime, tm.uploadTime, COUNT(t.treeId) as totalTrees from users u left join time_mappings tm on (tm.userId=u.userId) left join trees t on (u.userId=t.userId) where userType='User' group by u.userId, tm.mappingId order by totalTrees desc"
    );
    users = users.map((obj) => ({ ...obj, password: undefined }));
    res.status(StatusCodes.OK).json({ users });
};

export { getTreeData, getTreeDataByUser, getAllUsers };
