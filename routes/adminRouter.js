import {
    getAllUsers,
    getTreeData,
    getTreeDataByUser,
} from "../controllers/adminController.js";

import express from "express";

const router = express.Router();

// router.route("/upload-data").post(uploadExcelFile);

router.route("/tree-data").get(getTreeData).post(getTreeDataByUser);
router.route("/get-all-users").get(getAllUsers);

export default router;
