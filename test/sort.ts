import test, { describe } from 'node:test'
import assert from 'node:assert'
import { tinybenchPrinter } from '../src/index.js'
import { createBench } from '../fixtures/createBench.js'

const bench = createBench([
    { name: 'B', time: 2000 },
    { name: 'C', time: 5000 },
    { name: 'A', time: 1000 },
    { name: 'D', time: 10000 },
])

describe('sort', () => {
    test('false', () => {
        const expected = ['B', 'C', 'A', 'D']
        const actual = tinybenchPrinter
            .sort(false)
            .prepareTableConfig(bench)
            .rows.map(row => row.name)

        assert.deepStrictEqual(actual, expected)
    })

    test('asc', () => {
        const expected = ['D', 'C', 'B', 'A']
        const actual = tinybenchPrinter
            .sort('asc')
            .prepareTableConfig(bench)
            .rows.map(row => row.name)

        assert.deepStrictEqual(actual, expected)
    })

    test('desc', () => {
        const expected = ['A', 'B', 'C', 'D']
        const actual = tinybenchPrinter
            .sort('desc')
            .prepareTableConfig(bench)
            .rows.map(row => row.name)

        assert.deepStrictEqual(actual, expected)
    })

    test('custom', () => {
        const expected = ['A', 'B', 'C', 'D']
        const actual = tinybenchPrinter
            .sort(tasks => tasks.sort((a, b) => a.name.localeCompare(b.name)))
            .prepareTableConfig(bench)
            .rows.map(row => row.name)

        assert.deepStrictEqual(actual, expected)
    })
})
