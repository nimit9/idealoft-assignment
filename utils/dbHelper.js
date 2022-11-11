const getKeysandValues = (objectArray) => {
    let keys = Object.keys(objectArray[0]);
    let values = objectArray.map((obj) => keys.map((key) => obj[key]));

    return [keys, values];
};

const getBulkInsertQuery = (tableName, keysArray) => {
    return (
        "INSERT INTO " + tableName + " (" + keysArray.join(",") + ") VALUES ?"
    );
};

export { getKeysandValues, getBulkInsertQuery };
