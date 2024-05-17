import test, { describe } from 'node:test'
import process from 'node:process'
import assert from 'node:assert'
import type Bench from 'tinybench'
import type { Column } from '../src/index.js'
import { tinybenchPrinter } from '../src/index.js'
import { createFailedTask, createInvalidTask, createTask } from '../fixtures/createTask.js'
import { bench } from '../fixtures/bench.js'

describe('rendering', () => {
    test('invalid tasks', () => {
        const actual = tinybenchPrinter
            .prepareTableConfig({
                tasks: [
                    createInvalidTask(),
                    createFailedTask(),
                    createTask({ name: 'Valid' }),
                ],
            } as Bench)
            .rows.map(row => row.name)

        assert.deepStrictEqual(actual, ['Valid'])
    })

    test('locales', () => {
        const actual = tinybenchPrinter
            .locales('de-DE')
            .prepareTableConfig({
                tasks: [createTask({ time: 1_000_000 })],
            } as Bench)

        const ops = actual.rows.at(0)?.ops
        const time = actual.rows.at(0)?.time

        assert.strictEqual(ops, '0,001 ')
        assert.strictEqual(time, '1.000s ')
    })

    test('custom columns', () => {
        const column: Column = {
            header: 'Test',
            headerStyle: ['bold'],
            headerAlignment: 'left',
            rowStyle: ['blue'],
            rowAlignment: 'right',
            content(ctx) {
                return ctx.task.name
            },
        }

        const actual = tinybenchPrinter
            .column('test', column)
            .order(['test'])
            .prepareTableConfig({
                tasks: [
                    createTask({ name: 'A' }),
                    createTask({ name: 'B' }),
                    createTask({ name: 'C' }),
                ],
            } as Bench)

        const rows = actual.rows.map(row => row.name)

        assert.deepStrictEqual(rows, ['A', 'B', 'C'])
        assert.strictEqual(actual.headerTitles?.test, column.header)
        assert.strictEqual(actual.headerStyles?.test, column.headerStyle)
        assert.strictEqual(actual.headerAlignments?.test, column.headerAlignment)
        assert.strictEqual(actual.columnStyles?.test, column.rowStyle)
        assert.strictEqual(actual.columnAlignments?.test, column.rowAlignment)
    })

    test('options', () => {
        const borders = {
            topLeft: '',
            topRight: '',
            bottomLeft: '',
            bottomRight: '',
            top: '',
            bottom: '',
            left: '',
            right: '',
            divider: '',
            topDivider: '',
            bottomDivider: '',
            separator: '',
            separatorLeft: '',
            separatorRight: '',
            separatorDivider: '',
        }

        const actual = tinybenchPrinter
            .order(['name', 'ops'])
            .maxWidth(100)
            .stdout(process.stdout)
            .padding(0)
            .borders(borders)
            .borderStyle(['blue'])
            .useHeader(false)
            .useTopBorder(false)
            .useBottomBorder(false)
            .useLeftBorder(false)
            .useRightBorder(false)
            .useDividerBorder(false)
            .useHeaderSeparator(false)
            .useRowSeparator(true)
            .prepareTableConfig(bench)

        assert.deepStrictEqual(actual.columns, ['name', 'ops'])
        assert.strictEqual(actual.maxWidth, 100)
        assert.strictEqual(actual.stdout, process.stdout)
        assert.strictEqual(actual.padding, 0)
        assert.strictEqual(actual.borders, borders)
        assert.deepStrictEqual(actual.borderStyle, ['blue'])
        assert.strictEqual(actual.useHeader, false)
        assert.strictEqual(actual.useTopBorder, false)
        assert.strictEqual(actual.useBottomBorder, false)
        assert.strictEqual(actual.useLeftBorder, false)
        assert.strictEqual(actual.useRightBorder, false)
        assert.strictEqual(actual.useDividerBorder, false)
        assert.strictEqual(actual.useHeaderSeparator, false)
        assert.strictEqual(actual.useRowSeparator, true)
    })
})
