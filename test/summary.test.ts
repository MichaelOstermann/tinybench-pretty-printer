import { describe, expect, test } from "bun:test"
import { createBench } from "../fixtures/createBench.js"
import { tinybenchPrinter } from "../src/index.js"

const bench = createBench([
    { margin: 1, name: "A", samples: 100, time: 1000 },
    { margin: 1, name: "B", samples: 100, time: 2000 },
    { margin: 1, name: "C", samples: 100, time: 5000 },
    { margin: 1, name: "D", samples: 100, time: 10000 },
])

describe("summary", () => {
    test("%", () => {
        const expected = ["🥇", "-50%", "-80%", "-90%"]
        const actual = tinybenchPrinter
            .locales("en-US")
            .summary({ method: "%" })
            .prepareTableConfig(bench)
            .rows
            .map(row => row.summary)

        expect(actual).toEqual(expected)
    })

    test("x", () => {
        const expected = ["🥇", "2x slower", "5x slower", "10x slower"]
        const actual = tinybenchPrinter
            .locales("en-US")
            .summary({ method: "x" })
            .prepareTableConfig(bench)
            .rows
            .map(row => row.summary)

        expect(actual).toEqual(expected)
    })

    test("custom title", () => {
        const expected = ["Wowie!", "-50%", "-80%", "-90%"]
        const actual = tinybenchPrinter
            .locales("en-US")
            .summary({ fastestTitle: "Wowie!" })
            .prepareTableConfig(bench)
            .rows
            .map(row => row.summary)

        expect(actual).toEqual(expected)
    })

    test("header", () => {
        const header = "title"
        const actual = tinybenchPrinter
            .summary({ header })
            .prepareTableConfig(bench)
            .headerTitles
            ?.summary

        expect(actual).toBe(header)
    })

    test("headerStyle", () => {
        const headerStyle = ["blue"] as ["blue"]
        const actual = tinybenchPrinter
            .summary({ headerStyle })
            .prepareTableConfig(bench)
            .headerStyles
            ?.summary

        expect(actual).toBe(headerStyle)
    })

    test("headerAlignment", () => {
        const headerAlignment = "right"
        const actual = tinybenchPrinter
            .summary({ headerAlignment })
            .prepareTableConfig(bench)
            .headerAlignments
            ?.summary

        expect(actual).toBe(headerAlignment)
    })

    test("rowStyle", () => {
        const rowStyle = ["blue"] as ["blue"]
        const actual = tinybenchPrinter
            .summary({ rowStyle })
            .prepareTableConfig(bench)
            .columnStyles
            ?.summary

        expect(actual).toBe(rowStyle)
    })

    test("rowAlignment", () => {
        const rowAlignment = "right"
        const actual = tinybenchPrinter
            .summary({ rowAlignment })
            .prepareTableConfig(bench)
            .columnAlignments
            ?.summary

        expect(actual).toBe(rowAlignment)
    })
})
