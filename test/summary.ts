import test, { describe } from 'node:test'
import assert from 'node:assert'
import { tinybenchPrinter } from '../src/index.js'
import { createBench } from '../fixtures/createBench.js'

const bench = createBench([
    { name: 'A', time: 1000, samples: 100, margin: 1 },
    { name: 'B', time: 2000, samples: 100, margin: 1 },
    { name: 'C', time: 5000, samples: 100, margin: 1 },
    { name: 'D', time: 10000, samples: 100, margin: 1 },
])

describe('summary', () => {
    test('%', () => {
        const expected = ['🥇', '-50%', '-80%', '-90%']
        const actual = tinybenchPrinter
            .locales('en-US')
            .summary({ method: '%' })
            .prepareTableConfig(bench)
            .rows.map(row => row.summary)

        assert.deepStrictEqual(actual, expected)
    })

    test('x', () => {
        const expected = ['🥇', '2x slower', '5x slower', '10x slower']
        const actual = tinybenchPrinter
            .locales('en-US')
            .summary({ method: 'x' })
            .prepareTableConfig(bench)
            .rows.map(row => row.summary)

        assert.deepStrictEqual(actual, expected)
    })

    test('custom title', () => {
        const expected = ['Wowie!', '-50%', '-80%', '-90%']
        const actual = tinybenchPrinter
            .locales('en-US')
            .summary({ fastestTitle: 'Wowie!' })
            .prepareTableConfig(bench)
            .rows.map(row => row.summary)

        assert.deepStrictEqual(actual, expected)
    })

    test('header', () => {
        const header = 'title'
        const actual = tinybenchPrinter
            .summary({ header })
            .prepareTableConfig(bench)
            .headerTitles?.summary

        assert.strictEqual(actual, header)
    })

    test('headerStyle', () => {
        const headerStyle = ['blue'] as ['blue']
        const actual = tinybenchPrinter
            .summary({ headerStyle })
            .prepareTableConfig(bench)
            .headerStyles?.summary

        assert.strictEqual(actual, headerStyle)
    })

    test('headerAlignment', () => {
        const headerAlignment = 'right'
        const actual = tinybenchPrinter
            .summary({ headerAlignment })
            .prepareTableConfig(bench)
            .headerAlignments?.summary

        assert.strictEqual(actual, headerAlignment)
    })

    test('rowStyle', () => {
        const rowStyle = ['blue'] as ['blue']
        const actual = tinybenchPrinter
            .summary({ rowStyle })
            .prepareTableConfig(bench)
            .columnStyles?.summary

        assert.strictEqual(actual, rowStyle)
    })

    test('rowAlignment', () => {
        const rowAlignment = 'right'
        const actual = tinybenchPrinter
            .summary({ rowAlignment })
            .prepareTableConfig(bench)
            .columnAlignments?.summary

        assert.strictEqual(actual, rowAlignment)
    })
})
