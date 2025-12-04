import type { Bench } from "tinybench"
import type { Column } from "../src/index.js"
import process from "node:process"
import { describe, expect, test } from "bun:test"
import { bench } from "../fixtures/bench.js"
import { createFailedTask, createTask } from "../fixtures/createTask.js"
import { tinybenchPrinter } from "../src/index.js"

describe("rendering", () => {
    test("invalid tasks", () => {
        const actual = tinybenchPrinter
            .prepareTableConfig({
                tasks: [
                    createFailedTask(),
                    createTask({ name: "Valid" }),
                ],
            } as Bench)
            .rows
            .map(row => row.name)

        expect(actual).toEqual(["Valid"])
    })

    test("locales", () => {
        const actual = tinybenchPrinter
            .locales("de-DE")
            .prepareTableConfig({
                tasks: [createTask({ time: 1_000_000 })],
            } as Bench)

        const ops = actual.rows.at(0)?.ops
        const time = actual.rows.at(0)?.time

        expect(ops).toBe("0,001 ")
        expect(time).toBe("1.000s ")
    })

    test("custom columns", () => {
        const column: Column = {
            header: "Test",
            headerAlignment: "left",
            headerStyle: ["bold"],
            rowAlignment: "right",
            rowStyle: ["blue"],
            content(ctx) {
                return ctx.task.name
            },
        }

        const actual = tinybenchPrinter
            .column("test", column)
            .order(["test"])
            .prepareTableConfig({
                tasks: [
                    createTask({ name: "A" }),
                    createTask({ name: "B" }),
                    createTask({ name: "C" }),
                ],
            } as Bench)

        const rows = actual.rows.map(row => row.name)

        expect(rows).toEqual(["A", "B", "C"])
        expect(actual.headerTitles?.test).toBe(column.header)
        expect(actual.headerStyles?.test).toBe(column.headerStyle)
        expect(actual.headerAlignments?.test).toBe(column.headerAlignment)
        expect(actual.columnStyles?.test).toBe(column.rowStyle)
        expect(actual.columnAlignments?.test).toBe(column.rowAlignment)
    })

    test("options", () => {
        const borders = {
            bottom: "",
            bottomDivider: "",
            bottomLeft: "",
            bottomRight: "",
            divider: "",
            left: "",
            right: "",
            separator: "",
            separatorDivider: "",
            separatorLeft: "",
            separatorRight: "",
            top: "",
            topDivider: "",
            topLeft: "",
            topRight: "",
        }

        const actual = tinybenchPrinter
            .order(["name", "ops"])
            .maxWidth(100)
            .stdout(process.stdout)
            .padding(0)
            .borders(borders)
            .borderStyle(["blue"])
            .useHeader(false)
            .useTopBorder(false)
            .useBottomBorder(false)
            .useLeftBorder(false)
            .useRightBorder(false)
            .useDividerBorder(false)
            .useHeaderSeparator(false)
            .useRowSeparator(true)
            .prepareTableConfig(bench)

        expect(actual.columns).toEqual(["name", "ops"])
        expect(actual.maxWidth).toBe(100)
        expect(actual.stdout).toBe(process.stdout)
        expect(actual.padding).toBe(0)
        expect(actual.borders).toBe(borders)
        expect(actual.borderStyle).toEqual(["blue"])
        expect(actual.useHeader).toBe(false)
        expect(actual.useTopBorder).toBe(false)
        expect(actual.useBottomBorder).toBe(false)
        expect(actual.useLeftBorder).toBe(false)
        expect(actual.useRightBorder).toBe(false)
        expect(actual.useDividerBorder).toBe(false)
        expect(actual.useHeaderSeparator).toBe(false)
        expect(actual.useRowSeparator).toBe(true)
    })
})
