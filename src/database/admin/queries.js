const connection = require('./connection');


/**
  * Insert a bill on db 
  * @param {Object} bill Information about the user.
  * @param {string} bill.name The bill name.
  * @param {number} bill.originalValue The bill original value.
  * @param {number} bill.adjustedValue The bill ajusted value.
  * @param {date} bill.lateDays The number of late days
  * @param {date} bill.dueDate 
  * @param {date} bill.paymentDate The bill payment date.
  */
const insertBill = async (bill) => {
  let query = `INSERT INTO admin.bills (tx_name, nm_original, nm_adjusted, nm_lateDays, dt_dueDate, dt_payment) VALUES ($1, $2, $3, $4, $5, $6)`;
  const params = [bill.name, bill.originalValue, bill.adjustedValue, bill.lateDays, bill.dueDate, bill.paymentDate];
  return await connection.executeQuery(query, params);
}

/**
 * Retrieve all bills
 */
 const getBills = async () => {
  let query = `SELECT tx_name, nm_original, nm_adjusted, nm_lateDays, dt_payment FROM admin.bills `;
  const results = await connection.executeQuery(query);
  return results;
}

/**
 * Retrieve rules for taxes ordered by delayed days ascending
 */
 const getBillsTaxesRules = async () => {
  let query = `SELECT nm_delayedDays FROM admin.taxes ORDER BY nm_delayedDays ASC `;
  const results = await connection.executeQuery(query);
  return results;
}


/**
 * Retrieve rules for taxes
 * @param {number} delayedDays delayed Days
 */
 const getBillTax = async (delayedDays) => {
  let query = `SELECT  nm_fee, nm_dailyFee FROM admin.taxes WHERE $1 `;
  const params = [delayedDays]
  const results = await connection.executeQuery(query, params);
  return results;
}


module.exports = {
  insertBill,
  getBills,
  getBillsTaxesRules,
  getBillTax
}