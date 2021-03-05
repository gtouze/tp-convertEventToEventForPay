/**
 * @class
 */
module.exports.Event = class {
    /**
     * @param {object} data 
     * @param {Date} data.startDate
     * @param {Date} data.endDate
     */
    constructor({ startDate, endDate }) {
        this.startDate = startDate
        this.endDate = endDate
    }
}