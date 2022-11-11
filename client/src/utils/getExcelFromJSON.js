import * as xlsx from "xlsx";

export const getExcelFromJSON = (data, fileName) => {
    data = data.map(({ image, firstName, lastName, ...otherFields }) => {
        return firstName && lastName
            ? { name: firstName + " " + lastName, ...otherFields }
            : otherFields;
    });
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    xlsx.writeFileXLSX(workbook, fileName);
};
