import { describe, expect, test } from "bun:test"
import { bench } from "../fixtures/bench.js"
import { tinybenchPrinter } from "../src/index.js"

describe("name", () => {
    test("name", () => {
        const actual = tinybenchPrinter
            .prepareTableConfig(bench)
            .rows
            .map(row => row.name)

        expect(actual).toEqual(["A", "B", "C", "D"])
    })

    test("header", () => {
        const header = "title"
        const actual = tinybenchPrinter
            .name({ header })
            .prepareTableConfig(bench)
            .headerTitles
            ?.name

        expect(actual).toBe(header)
    })

    test("headerStyle", () => {
        const headerStyle = ["blue"] as ["blue"]
        const actual = tinybenchPrinter
            .name({ headerStyle })
            .prepareTableConfig(bench)
            .headerStyles
            ?.name

        expect(actual).toBe(headerStyle)
    })

    test("headerAlignment", () => {
        const headerAlignment = "right"
        const actual = tinybenchPrinter
            .name({ headerAlignment })
            .prepareTableConfig(bench)
            .headerAlignments
            ?.name

        expect(actual).toBe(headerAlignment)
    })

    test("rowStyle", () => {
        const rowStyle = ["blue"] as ["blue"]
        const actual = tinybenchPrinter
            .name({ rowStyle })
            .prepareTableConfig(bench)
            .columnStyles
            ?.name

        expect(actual).toBe(rowStyle)
    })

    test("rowAlignment", () => {
        const rowAlignment = "right"
        const actual = tinybenchPrinter
            .name({ rowAlignment })
            .prepareTableConfig(bench)
            .columnAlignments
            ?.name

        expect(actual).toBe(rowAlignment)
    })
})
