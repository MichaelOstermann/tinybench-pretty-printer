import assert from 'node:assert'
import test, { describe } from 'node:test'
import { tinybenchPrinter } from '../src/index.js'
import { bench } from '../fixtures/bench.js'

describe('margin', () => {
    test('margin', () => {
        const expected = ['±1.00%', '±1.50%', '±2.00%', '±2.50%']
        const actual = tinybenchPrinter
            .locales('en-US')
            .prepareTableConfig(bench)
            .rows.map(row => row.margin)

        assert.deepStrictEqual(actual, expected)
    })

    test('header', () => {
        const header = 'title'
        const actual = tinybenchPrinter
            .margin({ header })
            .prepareTableConfig(bench)
            .headerTitles?.margin

        assert.strictEqual(actual, header)
    })

    test('headerStyle', () => {
        const headerStyle = ['blue'] as ['blue']
        const actual = tinybenchPrinter
            .margin({ headerStyle })
            .prepareTableConfig(bench)
            .headerStyles?.margin

        assert.strictEqual(actual, headerStyle)
    })

    test('headerAlignment', () => {
        const headerAlignment = 'right'
        const actual = tinybenchPrinter
            .margin({ headerAlignment })
            .prepareTableConfig(bench)
            .headerAlignments?.margin

        assert.strictEqual(actual, headerAlignment)
    })

    test('rowStyle', () => {
        const rowStyle = ['blue'] as ['blue']
        const actual = tinybenchPrinter
            .margin({ rowStyle })
            .prepareTableConfig(bench)
            .columnStyles?.margin

        assert.strictEqual(actual, rowStyle)
    })

    test('rowAlignment', () => {
        const rowAlignment = 'right'
        const actual = tinybenchPrinter
            .margin({ rowAlignment })
            .prepareTableConfig(bench)
            .columnAlignments?.margin

        assert.strictEqual(actual, rowAlignment)
    })
})
