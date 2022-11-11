import { getTreeData, uploadExcelFile } from "../controllers/userController.js";

import express from "express";
import upload from "../utils/multerUpload.js";

const router = express.Router();

router.route("/upload-data").post(upload.single("excelFile"), uploadExcelFile);
router.route("/tree-data").get(getTreeData);

export default router;
