const { Event } = require("../objects/event")
const { EventForPay } = require("../objects/eventForPay")

const NIGHT_TIME_START = 22
const NIGHT_TIME_END = 7

/**
 * @function
 * @param {Event} event
 * @returns {EventForPay[]}
 */
module.exports.convertEventToEventForPay = function (event) {
    /**
     * @param {Date} date
     * @returns {boolean}
     */
    const nightTime = date => date >= nightTimeStartForDate(date) && date < nightTimeEndForDate(date)

    /**
     * @param {Date} date
     * @returns {boolean}
     */
    const dayTime = date => !nightTime(date)

    /**
     * @param {Date} date
     * @returns {Date}
     */
    const nightTimeStartForDate = date => new Date(date.getFullYear(), date.getMonth(), date.getDate(), NIGHT_TIME_START)

    /**
     * @param {Date} date
     * @returns {Date}
     */
    const nightTimeEndForDate = date => {
        const day = (() => {
            if (date.getHours() > NIGHT_TIME_END)
                return date.getDate() + 1
            else
                return date.getDate()
        })()
        return new Date(date.getFullYear(), date.getMonth(), day, NIGHT_TIME_END)
    }

    /**
     * @param {Date} date
     * @param {Date} duration
     * @returns {number[]}
     */
    const shouldSplitCalculation = (date, duration) => {
        // const totalDuration = (duration.getTime() - date.getTime()) / 1000
        const totalDuration = duration.getSeconds() + (duration.getMinutes() * 60) + (duration.getHours() * 3600)
        const untilSwitch = (() => {
            if (dayTime(date))
                return (nightTimeStartForDate(date).getTime() - date.getTime()) / 1000
            else
                return (nightTimeEndForDate(date).getTime() - date.getTime()) / 1000
        })()

        return [totalDuration, untilSwitch]
    }

    /**
     * @param {Date} date
     * @param {Date} duration
     * @param {number} metierId
     */
    const splitEventForPay = (date, duration, metierId) => {
        const [totalDuration, untilSwitch] = shouldSplitCalculation(date, duration)
        if (untilSwitch > totalDuration) {
            return [new EventForPay({
                startDate: date,
                endDate: duration
            })]
        } else {
            const firstDuree = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), untilSwitch)

            const nextDuree = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), totalDuration - untilSwitch)

            const nextDate = new Date(date.getTime())
            nextDate.setSeconds(nextDate.getSeconds() + untilSwitch)

            return [
                new EventForPay({
                    startDate: date,
                    endDate: firstDuree
                }),
                ...splitEventForPay(nextDate, nextDuree, metierId)
            ]
        }
    }

    return splitEventForPay(event.startDate, event.endDate, 1)
}
