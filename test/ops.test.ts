import { describe, expect, test } from "bun:test"
import { bench } from "../fixtures/bench.js"
import { tinybenchPrinter } from "../src/index.js"

describe("ops", () => {
    test("none", () => {
        const expected = ["1,000,000,000 ", "1,000,000 ", "1,000 ", "1 "]
        const actual = tinybenchPrinter
            .locales("en-US")
            .ops({ method: "none" })
            .prepareTableConfig(bench)
            .rows
            .map(row => row.ops)

        expect(actual).toEqual(expected)
    })

    test("shortest", () => {
        const expected = ["1B", "1M", "1K", "1 "]
        const actual = tinybenchPrinter
            .locales("en-US")
            .ops({ method: "shortest" })
            .prepareTableConfig(bench)
            .rows
            .map(row => row.ops)

        expect(actual).toEqual(expected)
    })

    test("highest", () => {
        const expected = ["1B", "0.001B", "0.000001B", "0.000000001B"]
        const actual = tinybenchPrinter
            .locales("en-US")
            .ops({ method: "highest" })
            .prepareTableConfig(bench)
            .rows
            .map(row => row.ops)

        expect(actual).toEqual(expected)
    })

    test("lowest", () => {
        const expected = ["1,000,000,000 ", "1,000,000 ", "1,000 ", "1 "]
        const actual = tinybenchPrinter
            .locales("en-US")
            .ops({ method: "lowest" })
            .prepareTableConfig(bench)
            .rows
            .map(row => row.ops)

        expect(actual).toEqual(expected)
    })

    test("mean", () => {
        const expected = ["1,000M", "1M", "0.001M", "0.000001M"]
        const actual = tinybenchPrinter
            .locales("en-US")
            .ops({ method: "mean" })
            .prepareTableConfig(bench)
            .rows
            .map(row => row.ops)

        expect(actual).toEqual(expected)
    })

    test("thousands", () => {
        const expected = ["1,000,000K", "1,000K", "1K", "0.001K"]
        const actual = tinybenchPrinter
            .locales("en-US")
            .ops({ method: "thousands" })
            .prepareTableConfig(bench)
            .rows
            .map(row => row.ops)

        expect(actual).toEqual(expected)
    })

    test("millions", () => {
        const expected = ["1,000M", "1M", "0.001M", "0.000001M"]
        const actual = tinybenchPrinter
            .locales("en-US")
            .ops({ method: "millions" })
            .prepareTableConfig(bench)
            .rows
            .map(row => row.ops)

        expect(actual).toEqual(expected)
    })

    test("billions", () => {
        const expected = ["1B", "0.001B", "0.000001B", "0.000000001B"]
        const actual = tinybenchPrinter
            .locales("en-US")
            .ops({ method: "billions" })
            .prepareTableConfig(bench)
            .rows
            .map(row => row.ops)

        expect(actual).toEqual(expected)
    })

    test("header", () => {
        const header = "title"
        const actual = tinybenchPrinter
            .ops({ header })
            .prepareTableConfig(bench)
            .headerTitles
            ?.ops

        expect(actual).toBe(header)
    })

    test("headerStyle", () => {
        const headerStyle = ["blue"] as ["blue"]
        const actual = tinybenchPrinter
            .ops({ headerStyle })
            .prepareTableConfig(bench)
            .headerStyles
            ?.ops

        expect(actual).toBe(headerStyle)
    })

    test("headerAlignment", () => {
        const headerAlignment = "right"
        const actual = tinybenchPrinter
            .ops({ headerAlignment })
            .prepareTableConfig(bench)
            .headerAlignments
            ?.ops

        expect(actual).toBe(headerAlignment)
    })

    test("rowStyle", () => {
        const rowStyle = ["blue"] as ["blue"]
        const actual = tinybenchPrinter
            .ops({ rowStyle })
            .prepareTableConfig(bench)
            .columnStyles
            ?.ops

        expect(actual).toBe(rowStyle)
    })

    test("rowAlignment", () => {
        const rowAlignment = "right"
        const actual = tinybenchPrinter
            .ops({ rowAlignment })
            .prepareTableConfig(bench)
            .columnAlignments
            ?.ops

        expect(actual).toBe(rowAlignment)
    })
})
