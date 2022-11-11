import { BadRequestError } from "../errors/index.js";
import fs from "fs";
import xlsx from "xlsx";

export const getDataFromExcelFile = (path) => {
    const workBook = xlsx.readFile(path);
    const firstSheet = workBook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workBook.Sheets[firstSheet]);

    fs.unlink(path, (err) => {
        if (err) {
            console.log("err", err);
            throw new BadRequestError("Cannot delete file");
        }
    });
    return data;
};
