import { BadRequestError } from "../errors/index.js";

const readFormData = async (req, res, next) => {
    var { address } = req.body;
    if (!address) {
        throw new BadRequestError("Please provide address");
    }
    address = JSON.parse(address);
    req.body.address = address;
    next();
};
export default readFormData;
