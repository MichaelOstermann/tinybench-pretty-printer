import test, { describe } from 'node:test'
import assert from 'node:assert'
import { tinybenchPrinter } from '../src/index.js'
import { bench } from '../fixtures/bench.js'

describe('time', () => {
    test('shortest', () => {
        const expected = ['1ns', '1µs', '1ms', '1s ']
        const actual = tinybenchPrinter
            .locales('en-US')
            .time({ method: 'shortest' })
            .prepareTableConfig(bench)
            .rows.map(row => row.time)

        assert.deepStrictEqual(actual, expected)
    })

    test('highest', () => {
        const expected = ['0.000000001s ', '0.000001s ', '0.001s ', '1s ']
        const actual = tinybenchPrinter
            .locales('en-US')
            .time({ method: 'highest' })
            .prepareTableConfig(bench)
            .rows.map(row => row.time)

        assert.deepStrictEqual(actual, expected)
    })

    test('lowest', () => {
        const expected = ['1ns', '1,000ns', '1,000,000ns', '1,000,000,000ns']
        const actual = tinybenchPrinter
            .locales('en-US')
            .time({ method: 'lowest' })
            .prepareTableConfig(bench)
            .rows.map(row => row.time)

        assert.deepStrictEqual(actual, expected)
    })

    test('mean', () => {
        const expected = ['0.000001ms', '0.001ms', '1ms', '1,000ms']
        const actual = tinybenchPrinter
            .locales('en-US')
            .time({ method: 'mean' })
            .prepareTableConfig(bench)
            .rows.map(row => row.time)

        assert.deepStrictEqual(actual, expected)
    })

    test('nanoseconds', () => {
        const expected = ['1ns', '1,000ns', '1,000,000ns', '1,000,000,000ns']
        const actual = tinybenchPrinter
            .locales('en-US')
            .time({ method: 'nanoseconds' })
            .prepareTableConfig(bench)
            .rows.map(row => row.time)

        assert.deepStrictEqual(actual, expected)
    })

    test('microseconds', () => {
        const expected = ['0.001µs', '1µs', '1,000µs', '1,000,000µs']
        const actual = tinybenchPrinter
            .locales('en-US')
            .time({ method: 'microseconds' })
            .prepareTableConfig(bench)
            .rows.map(row => row.time)

        assert.deepStrictEqual(actual, expected)
    })

    test('milliseconds', () => {
        const expected = ['0.000001ms', '0.001ms', '1ms', '1,000ms']
        const actual = tinybenchPrinter
            .locales('en-US')
            .time({ method: 'milliseconds' })
            .prepareTableConfig(bench)
            .rows.map(row => row.time)

        assert.deepStrictEqual(actual, expected)
    })

    test('seconds', () => {
        const expected = ['0.000000001s ', '0.000001s ', '0.001s ', '1s ']
        const actual = tinybenchPrinter
            .locales('en-US')
            .time({ method: 'seconds' })
            .prepareTableConfig(bench)
            .rows.map(row => row.time)

        assert.deepStrictEqual(actual, expected)
    })

    test('header', () => {
        const header = 'title'
        const actual = tinybenchPrinter
            .time({ header })
            .prepareTableConfig(bench)
            .headerTitles?.time

        assert.strictEqual(actual, header)
    })

    test('headerStyle', () => {
        const headerStyle = ['blue'] as ['blue']
        const actual = tinybenchPrinter
            .time({ headerStyle })
            .prepareTableConfig(bench)
            .headerStyles?.time

        assert.strictEqual(actual, headerStyle)
    })

    test('headerAlignment', () => {
        const headerAlignment = 'right'
        const actual = tinybenchPrinter
            .time({ headerAlignment })
            .prepareTableConfig(bench)
            .headerAlignments?.time

        assert.strictEqual(actual, headerAlignment)
    })

    test('rowStyle', () => {
        const rowStyle = ['blue'] as ['blue']
        const actual = tinybenchPrinter
            .time({ rowStyle })
            .prepareTableConfig(bench)
            .columnStyles?.time

        assert.strictEqual(actual, rowStyle)
    })

    test('rowAlignment', () => {
        const rowAlignment = 'right'
        const actual = tinybenchPrinter
            .time({ rowAlignment })
            .prepareTableConfig(bench)
            .columnAlignments?.time

        assert.strictEqual(actual, rowAlignment)
    })
})
