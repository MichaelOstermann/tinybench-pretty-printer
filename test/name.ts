import test, { describe } from 'node:test'
import assert from 'node:assert'
import { tinybenchPrinter } from '../src/index.js'
import { bench } from '../fixtures/bench.js'

describe('name', () => {
    test('name', () => {
        const actual = tinybenchPrinter
            .prepareTableConfig(bench)
            .rows.map(row => row.name)

        assert.deepStrictEqual(actual, ['A', 'B', 'C', 'D'])
    })

    test('header', () => {
        const header = 'title'
        const actual = tinybenchPrinter
            .name({ header })
            .prepareTableConfig(bench)
            .headerTitles?.name

        assert.strictEqual(actual, header)
    })

    test('headerStyle', () => {
        const headerStyle = ['blue'] as ['blue']
        const actual = tinybenchPrinter
            .name({ headerStyle })
            .prepareTableConfig(bench)
            .headerStyles?.name

        assert.strictEqual(actual, headerStyle)
    })

    test('headerAlignment', () => {
        const headerAlignment = 'right'
        const actual = tinybenchPrinter
            .name({ headerAlignment })
            .prepareTableConfig(bench)
            .headerAlignments?.name

        assert.strictEqual(actual, headerAlignment)
    })

    test('rowStyle', () => {
        const rowStyle = ['blue'] as ['blue']
        const actual = tinybenchPrinter
            .name({ rowStyle })
            .prepareTableConfig(bench)
            .columnStyles?.name

        assert.strictEqual(actual, rowStyle)
    })

    test('rowAlignment', () => {
        const rowAlignment = 'right'
        const actual = tinybenchPrinter
            .name({ rowAlignment })
            .prepareTableConfig(bench)
            .columnAlignments?.name

        assert.strictEqual(actual, rowAlignment)
    })
})
