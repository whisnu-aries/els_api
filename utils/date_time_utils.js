const moment = require("moment");

/**
 * Adds one day to the given date.
 * @param {string|Date} date - The date to which one day will be added.
 * @param {string} [format="YYYY-MM-DD HH:mm:ss"] - The format in which the new date will be returned (default is "YYYY-MM-DD HH:mm:ss").
 * @returns {string} - The new date after adding one day, formatted according to the specified format.
 */
function addOneDay(date, format = "YYYY-MM-DD HH:mm:ss") {
  return moment(date).add(1, "days").format(format);
}

/**
 * Checks if the current date and time is after the expiration date.
 * @param {string|Date} expiredDate - The expiration date to check against.
 * @returns {boolean} - True if the current date and time is after the expiration date, false otherwise.
 * @throws {Error} - Throws an error if the expiredDate is not a valid date.
 */
function isNowAfterExpired(expiredDate) {
  const now = moment(); // Current date and time
  const expiry = moment(expiredDate); // Expiration date and time

  if (!expiry.isValid()) {
    throw new Error("Invalid expiration date provided.");
  }

  return now.isAfter(expiry); // Check if current date and time is after the expiration date
}

// Ekspor fungsi
module.exports = {
  addOneDay,
  isNowAfterExpired,
};
