/**
 * @class
 */
module.exports.EventForPay = class {
    /**
     * @param {object} data 
     * @param {Date} data.startDate
     * @param {Date} data.endDate
     * @param {number} data.hourWorkDay
     * @param {number} data.hourWorkNight
     */
    constructor({ startDate, endDate , hourWorkDay = 0, hourWorkNight = 0 }) {
        this.startDate = startDate
        this.endDate = endDate
        this.hourWorkDay = hourWorkDay
        this.hourWorkNight = hourWorkNight
    }
}