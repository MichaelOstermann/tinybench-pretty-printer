import test, { describe } from 'node:test'
import assert from 'node:assert'
import { tinybenchPrinter } from '../src/index.js'
import { bench } from '../fixtures/bench.js'

describe('samples', () => {
    test('none', () => {
        const expected = ['1,000,000,000 ', '1,000,000 ', '1,000 ', '100 ']
        const actual = tinybenchPrinter
            .locales('en-US')
            .samples({ method: 'none' })
            .prepareTableConfig(bench)
            .rows.map(row => row.samples)

        assert.deepStrictEqual(actual, expected)
    })

    test('shortest', () => {
        const expected = ['1B', '1M', '1K', '100 ']
        const actual = tinybenchPrinter
            .locales('en-US')
            .samples({ method: 'shortest' })
            .prepareTableConfig(bench)
            .rows.map(row => row.samples)

        assert.deepStrictEqual(actual, expected)
    })

    test('highest', () => {
        const expected = ['1B', '0.001B', '0.000001B', '0.0000001B']
        const actual = tinybenchPrinter
            .locales('en-US')
            .samples({ method: 'highest' })
            .prepareTableConfig(bench)
            .rows.map(row => row.samples)

        assert.deepStrictEqual(actual, expected)
    })

    test('lowest', () => {
        const expected = ['1,000,000,000 ', '1,000,000 ', '1,000 ', '100 ']
        const actual = tinybenchPrinter
            .locales('en-US')
            .samples({ method: 'lowest' })
            .prepareTableConfig(bench)
            .rows.map(row => row.samples)

        assert.deepStrictEqual(actual, expected)
    })

    test('mean', () => {
        const expected = ['1,000M', '1M', '0.001M', '0.0001M']
        const actual = tinybenchPrinter
            .locales('en-US')
            .samples({ method: 'mean' })
            .prepareTableConfig(bench)
            .rows.map(row => row.samples)

        assert.deepStrictEqual(actual, expected)
    })

    test('thousands', () => {
        const expected = ['1,000,000K', '1,000K', '1K', '0.1K']
        const actual = tinybenchPrinter
            .locales('en-US')
            .samples({ method: 'thousands' })
            .prepareTableConfig(bench)
            .rows.map(row => row.samples)

        assert.deepStrictEqual(actual, expected)
    })

    test('millions', () => {
        const expected = ['1,000M', '1M', '0.001M', '0.0001M']
        const actual = tinybenchPrinter
            .locales('en-US')
            .samples({ method: 'millions' })
            .prepareTableConfig(bench)
            .rows.map(row => row.samples)

        assert.deepStrictEqual(actual, expected)
    })

    test('billions', () => {
        const expected = ['1B', '0.001B', '0.000001B', '0.0000001B']
        const actual = tinybenchPrinter
            .locales('en-US')
            .samples({ method: 'billions' })
            .prepareTableConfig(bench)
            .rows.map(row => row.samples)

        assert.deepStrictEqual(actual, expected)
    })

    test('header', () => {
        const header = 'title'
        const actual = tinybenchPrinter
            .samples({ header })
            .prepareTableConfig(bench)
            .headerTitles?.samples

        assert.strictEqual(actual, header)
    })

    test('headerStyle', () => {
        const headerStyle = ['blue'] as ['blue']
        const actual = tinybenchPrinter
            .samples({ headerStyle })
            .prepareTableConfig(bench)
            .headerStyles?.samples

        assert.strictEqual(actual, headerStyle)
    })

    test('headerAlignment', () => {
        const headerAlignment = 'right'
        const actual = tinybenchPrinter
            .samples({ headerAlignment })
            .prepareTableConfig(bench)
            .headerAlignments?.samples

        assert.strictEqual(actual, headerAlignment)
    })

    test('rowStyle', () => {
        const rowStyle = ['blue'] as ['blue']
        const actual = tinybenchPrinter
            .samples({ rowStyle })
            .prepareTableConfig(bench)
            .columnStyles?.samples

        assert.strictEqual(actual, rowStyle)
    })

    test('rowAlignment', () => {
        const rowAlignment = 'right'
        const actual = tinybenchPrinter
            .samples({ rowAlignment })
            .prepareTableConfig(bench)
            .columnAlignments?.samples

        assert.strictEqual(actual, rowAlignment)
    })
})
