const { Event } = require("../objects/event")
const { EventForPay } = require("../objects/eventForPay")

const HOUR_START_DAY = 6
const HOUR_END_DAY = 22

/**
 * @function
 * @param {Event} event
 * @returns {EventForPay[]}
 */
module.exports.convertEventToEventForPay = function (event) {
    const { startDate, endDate } = event

    /** Hours difference between the two dates */
    const hoursDiff = Math.abs(startDate.getTime() - endDate.getTime()) / 36e5

    /** List of hours betweent the two dates */
    const hours = new Array(hoursDiff)
        .fill()
        .map((_, i) => ({
            sum: i + startDate.getHours(),
            clean: (i + startDate.getHours()) % 24
        }))

    /** @type {Date[][]} Array of array of date with bounded interval */
    const superDates = hours.reduce((acc, hour, index) => {
        /** Date to be pushed */
        const dt = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate(),
            hour.sum
        )

        //If there is a value AND hour it's not a terminal
        if (
            !!acc[acc.length - 1] &&
            ![HOUR_START_DAY, HOUR_END_DAY].includes(hour.clean)
        ) {
            //If just before terminal OR last of array
            if (
                [HOUR_START_DAY - 1, HOUR_END_DAY - 1].includes(hour.clean) ||
                hours.length - 1 === index
            ) {
                dt.setMinutes(59)
                dt.setSeconds(59)
            }

            //Push dt in current array
            acc[acc.length - 1].push(dt)
        } else {
            //Create new array with dt
            acc.push([dt])
        }

        return acc
    }, [])

    return superDates
        .map(dates => new EventForPay({
            startDate: dates[0],
            endDate: dates[dates.length - 1],
            hourWorkDay: dates.filter(x => x.getHours() >= HOUR_START_DAY && x.getHours() < HOUR_END_DAY).length,
            hourWorkNight: dates.filter(x => x.getHours() < HOUR_START_DAY || x.getHours() >= HOUR_END_DAY).length
        }))
}
