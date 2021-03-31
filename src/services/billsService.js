const queries = require('../database/admin/queries.js');
const postgresClient = require('../clients/postgresClient.js');
const utils = require("../utils/utils.js")


const insertBill = async (req) => {
    const delayedDays = utils.daysBetween(req.body.bill.dueDate, req.body.bill.paymentDate )

    const tax = getBillTax(delayedDays)

    let bill = {
        name: req.body.bill.name,
        originalValue: req.body.bill.originalValue,
        adjustedValue: (req.body.bill.originalValue + (delayedDays * tax.nm_dailyFee * req.body.bill.originalValue)+ (req.body.bill.originalValue * tax.nm_fee)),
        lateDays: delayedDays,
        dueDate: req.body.bill.dueDate,
        paymentDate: req.body.bill.paymentDate
    }
    const dataResponse = await postgresClient.insertBill(bill);

    return dataResponse.status;
}


const getBills = async () => {
    const bills = await queries.getBills();
    return bills;
}


const getBillTax = async (delayedDays) => {
    const taxes = await queries.getBillsTaxesRules();
    for (let index = 0; index < taxes.length; index++) {
        if(delayedDays < taxes[index].nm_delayedDays )
        {
            delayedDaysFormated = taxes[index].nm_delayedDays;
            break;
        }
        if(index == taxes.length -1  )
        {
            delayedDaysFormated = taxes[index].nm_delayedDays;
            break;
        };
    }
    const tax = await queries.getBillTax(delayedDaysFormated);

    return tax;
}

module.exports = {
    insertBill,
    getBills
}