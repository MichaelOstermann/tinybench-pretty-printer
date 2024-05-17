import type { Borders, CreateCliTableConfig, Style } from '@monstermann/tables'
import { cli, markdown } from '@monstermann/tables'
import type Bench from 'tinybench'
import type { Column, Columns, DefaultColumn, MarginOptions, NameOptions, OpsOptions, SamplesOptions, SortMethod, SummaryOptions, TaskWithResult, TimeOptions } from './types.js'
import { name } from './columns/name.js'
import { summary } from './columns/summary.js'
import { ops } from './columns/ops.js'
import { time } from './columns/time.js'
import { margin } from './columns/margin.js'
import { samples } from './columns/samples.js'
import { sortTasks } from './helpers/sortTasks.js'
import { mapRecord } from './helpers/mapRecord.js'
import { getFastestTask } from './helpers/getFastestTask.js'
import { getSlowestTask } from './helpers/getSlowestTask.js'
import { createNumberFormatter } from './helpers/createNumberFormatter.js'
import { createDurationFormatter } from './helpers/createDurationFormatter.js'
import { createCountFormatter } from './helpers/createCountFormatter.js'

export interface TinybenchPrinter<T extends string> {
    order: (order: T[]) => TinybenchPrinter<T>
    column: <U extends string>(name: U, column: Column) => TinybenchPrinter<T | U>
    name: (options: NameOptions) => TinybenchPrinter<T>
    summary: (options: SummaryOptions) => TinybenchPrinter<T>
    ops: (options: OpsOptions) => TinybenchPrinter<T>
    time: (options: TimeOptions) => TinybenchPrinter<T>
    margin: (options: MarginOptions) => TinybenchPrinter<T>
    samples: (options: SamplesOptions) => TinybenchPrinter<T>
    locales: (locales: Intl.LocalesArgument) => TinybenchPrinter<T>
    sort: (method: SortMethod) => TinybenchPrinter<T>
    maxWidth: (maxWidth: number) => TinybenchPrinter<T>
    stdout: (stdout: NodeJS.WriteStream) => TinybenchPrinter<T>
    padding: (padding: number) => TinybenchPrinter<T>
    borders: (borders: Borders) => TinybenchPrinter<T>
    borderStyle: (style: Style[]) => TinybenchPrinter<T>
    useHeader: (use: boolean) => TinybenchPrinter<T>
    useTopBorder: (use: boolean) => TinybenchPrinter<T>
    useBottomBorder: (use: boolean) => TinybenchPrinter<T>
    useLeftBorder: (use: boolean) => TinybenchPrinter<T>
    useRightBorder: (use: boolean) => TinybenchPrinter<T>
    useDividerBorder: (use: boolean) => TinybenchPrinter<T>
    useHeaderSeparator: (use: boolean) => TinybenchPrinter<T>
    useRowSeparator: (use: boolean) => TinybenchPrinter<T>
    toCli: (bench: Bench) => string
    toMarkdown: (bench: Bench) => string
    prepareTableConfig: (bench: Bench) => CreateCliTableConfig<T>
}

type Config = {
    order: string[]
    columns: Columns<string>
    locales?: Intl.LocalesArgument
    sort?: SortMethod
    maxWidth?: number
    stdout?: NodeJS.WriteStream
    padding?: number
    borders?: Borders
    borderStyle?: Style[]
    useHeader?: boolean
    useTopBorder?: boolean
    useBottomBorder?: boolean
    useLeftBorder?: boolean
    useRightBorder?: boolean
    useDividerBorder?: boolean
    useHeaderSeparator?: boolean
    useRowSeparator?: boolean
}

export class TinybenchPrinterImpl {
    config: Config

    constructor(config: Config) {
        this.config = config
    }

    merge(config: Partial<Config>) {
        return new TinybenchPrinterImpl({
            ...this.config,
            ...config,
        })
    }

    order(order: string[]) {
        return this.merge({ order })
    }

    column(name: string, column: Column) {
        return this.merge({
            columns: { ...this.config.columns, [name]: column },
        })
    }

    name(options: NameOptions) {
        return this.column('name', name(options))
    }

    summary(options: SummaryOptions) {
        return this.column('summary', summary(options))
    }

    ops(options: OpsOptions) {
        return this.column('ops', ops(options))
    }

    time(options: TimeOptions) {
        return this.column('time', time(options))
    }

    margin(options: MarginOptions) {
        return this.column('margin', margin(options))
    }

    samples(options: SamplesOptions) {
        return this.column('samples', samples(options))
    }

    locales(locales: Intl.LocalesArgument) {
        return this.merge({ locales })
    }

    sort(sort: SortMethod) {
        return this.merge({ sort })
    }

    maxWidth(maxWidth: number) {
        return this.merge({ maxWidth })
    }

    stdout(stdout: NodeJS.WriteStream) {
        return this.merge({ stdout })
    }

    padding(padding: number) {
        return this.merge({ padding })
    }

    borders(borders: Borders) {
        return this.merge({ borders })
    }

    borderStyle(borderStyle: Style[]) {
        return this.merge({ borderStyle })
    }

    useHeader(useHeader: boolean) {
        return this.merge({ useHeader })
    }

    useTopBorder(useTopBorder: boolean) {
        return this.merge({ useTopBorder })
    }

    useBottomBorder(useBottomBorder: boolean) {
        return this.merge({ useBottomBorder })
    }

    useLeftBorder(useLeftBorder: boolean) {
        return this.merge({ useLeftBorder })
    }

    useRightBorder(useRightBorder: boolean) {
        return this.merge({ useRightBorder })
    }

    useDividerBorder(useDividerBorder: boolean) {
        return this.merge({ useDividerBorder })
    }

    useHeaderSeparator(useHeaderSeparator: boolean) {
        return this.merge({ useHeaderSeparator })
    }

    useRowSeparator(useRowSeparator: boolean) {
        return this.merge({ useRowSeparator })
    }

    prepareTableConfig(bench: Bench) {
        const {
            sort,
            locales,
            columns,
            order,
            ...rest
        } = this.config

        let tasks = bench.tasks
            .filter((task): task is TaskWithResult => !!task.result)
            .filter(task => !task.result.error)

        if (!tasks.length) return

        tasks = sortTasks(tasks, sort)
        const fastestTask = getFastestTask(tasks)!
        const slowestTask = getSlowestTask(tasks)!
        const formatNumber = createNumberFormatter(locales)
        const formatDuration = createDurationFormatter(locales)
        const formatCount = createCountFormatter(locales)

        const rows = tasks.map(task => mapRecord(columns, column => column.content({
            task,
            tasks,
            fastestTask,
            slowestTask,
            formatNumber,
            formatDuration,
            formatCount,
            locales,
        })))

        return {
            ...rest,
            rows,
            columns: order,
            headerTitles: mapRecord(columns, column => column.header),
            headerAlignments: mapRecord(columns, column => column.headerAlignment),
            headerStyles: mapRecord(columns, column => column.headerStyle),
            columnAlignments: mapRecord(columns, column => column.rowAlignment),
            columnStyles: mapRecord(columns, column => column.rowStyle),
        }
    }

    toCli(bench: Bench): string {
        const config = this.prepareTableConfig(bench)
        if (!config) return ''
        return cli.createTable(config)
    }

    toMarkdown(bench: Bench): string {
        const config = this.prepareTableConfig(bench)
        if (!config) return ''
        return markdown.createTable(config)
    }
}

export const tinybenchPrinter = new TinybenchPrinterImpl({
    order: ['name', 'summary', 'ops', 'time', 'margin', 'samples'],
    columns: {
        name: name(),
        summary: summary(),
        ops: ops(),
        time: time(),
        margin: margin(),
        samples: samples(),
    },
}) as TinybenchPrinter<DefaultColumn>
