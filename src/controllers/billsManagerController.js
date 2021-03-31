const httpUtils = require('../utils/httpUtils');
const billService = require('../services/billsService.js');

const insertBill = async(req, res) =>{
    try {
        const response = await billService.insertEvent(req, res);
        return res.status(httpUtils.OK).json({response});
    } catch (error) {
        return httpUtils.formatErrorResponse(error, req, res);
    }
}

const getBills = async(req, res) => {
    try {
        const response = await billService.getBills();
        return res.status(httpUtils.OK).json({response});
    } catch (error) {
        return httpUtils.formatErrorResponse(error, req, res);
    }
}

module.exports = {  
    insertBill,
    getBills
}