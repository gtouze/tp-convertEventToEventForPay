// The rest is similar to the comments I've made for the other repo...
const { convertEventToEventForPay } = require("../services/convertEventToEventForPay")
const { Event } = require("../objects/event")

describe('Date test', () => {
    test('The event starts during the day ends during the day', async () => {
        const event = new Event({ startDate: new Date(2021, 0, 1, 10), endDate: new Date(2021, 0, 1, 17) })
        const eventForPay = convertEventToEventForPay(event)

        expect(eventForPay.length).toBe(1)
        expect(eventForPay[0].hourWorkDay).toBeGreaterThan(0)
        expect(eventForPay[0].hourWorkNight).toBe(0)
    })

    test('The event starts during the night ends during the night', async () => {
        const event = new Event({ startDate: new Date(2021, 0, 1, 23), endDate: new Date(2021, 0, 2, 5) })
        const eventForPay = convertEventToEventForPay(event)

        expect(eventForPay.length).toBe(1)
        expect(eventForPay[0].hourWorkDay).toBe(0)
        expect(eventForPay[0].hourWorkNight).toBeGreaterThan(0)
    })

    test('The event starts day ends during the night', async () => {
        const event = new Event({ startDate: new Date(2021, 0, 1, 15), endDate: new Date(2021, 0, 2, 2) })
        const eventForPay = convertEventToEventForPay(event)

        expect(eventForPay.length).toBe(2)
        expect(eventForPay[0].hourWorkDay).toBeGreaterThan(0)
        expect(eventForPay[0].hourWorkNight).toBe(0)
        expect(eventForPay[1].hourWorkDay).toBe(0)
        expect(eventForPay[1].hourWorkNight).toBeGreaterThan(0)
    })

    test('The event starts during the night ends during the day', async () => {
        const event = new Event({ startDate: new Date(2021, 0, 1, 2), endDate: new Date(2021, 0, 1, 10) })
        const eventForPay = convertEventToEventForPay(event)
        expect(eventForPay.length).toBe(2)
        expect(eventForPay[0].hourWorkDay).toBe(0)
        expect(eventForPay[0].hourWorkNight).toBeGreaterThan(0)
        expect(eventForPay[1].hourWorkDay).toBeGreaterThan(0)
        expect(eventForPay[1].hourWorkNight).toBe(0)
    })

    test('The event starts during the day, continues during the night and ends during the day', async () => {
        const event = new Event({ startDate: new Date(2021, 0, 1, 18), endDate: new Date(2021, 0, 2, 10) })
        const eventForPay = convertEventToEventForPay(event)

        expect(eventForPay.length).toBe(3)
        expect(eventForPay[0].hourWorkDay).toBeGreaterThan(0)
        expect(eventForPay[0].hourWorkNight).toBe(0)
        expect(eventForPay[1].hourWorkDay).toBe(0)
        expect(eventForPay[1].hourWorkNight).toBeGreaterThan(0)
        expect(eventForPay[2].hourWorkDay).toBeGreaterThan(0)
        expect(eventForPay[2].hourWorkNight).toBe(0)
    })
})