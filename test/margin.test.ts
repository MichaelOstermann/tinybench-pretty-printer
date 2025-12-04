import { describe, expect, test } from "bun:test"
import { bench } from "../fixtures/bench.js"
import { tinybenchPrinter } from "../src/index.js"

describe("margin", () => {
    test("margin", () => {
        const expected = ["±1.00%", "±1.50%", "±2.00%", "±2.50%"]
        const actual = tinybenchPrinter
            .locales("en-US")
            .prepareTableConfig(bench)
            .rows
            .map(row => row.margin)

        expect(actual).toEqual(expected)
    })

    test("header", () => {
        const header = "title"
        const actual = tinybenchPrinter
            .margin({ header })
            .prepareTableConfig(bench)
            .headerTitles
            ?.margin

        expect(actual).toBe(header)
    })

    test("headerStyle", () => {
        const headerStyle = ["blue"] as ["blue"]
        const actual = tinybenchPrinter
            .margin({ headerStyle })
            .prepareTableConfig(bench)
            .headerStyles
            ?.margin

        expect(actual).toBe(headerStyle)
    })

    test("headerAlignment", () => {
        const headerAlignment = "right"
        const actual = tinybenchPrinter
            .margin({ headerAlignment })
            .prepareTableConfig(bench)
            .headerAlignments
            ?.margin

        expect(actual).toBe(headerAlignment)
    })

    test("rowStyle", () => {
        const rowStyle = ["blue"] as ["blue"]
        const actual = tinybenchPrinter
            .margin({ rowStyle })
            .prepareTableConfig(bench)
            .columnStyles
            ?.margin

        expect(actual).toBe(rowStyle)
    })

    test("rowAlignment", () => {
        const rowAlignment = "right"
        const actual = tinybenchPrinter
            .margin({ rowAlignment })
            .prepareTableConfig(bench)
            .columnAlignments
            ?.margin

        expect(actual).toBe(rowAlignment)
    })
})
