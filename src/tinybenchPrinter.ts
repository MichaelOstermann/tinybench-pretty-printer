import type { Borders, CreateCliTableConfig, Style } from "@monstermann/tables"
import type { Bench } from "tinybench"
import type { Column, Columns, DefaultColumn, MarginOptions, NameOptions, OpsOptions, SamplesOptions, SortMethod, SummaryOptions, TaskWithResult, TimeOptions } from "./types.js"
import { cli, markdown } from "@monstermann/tables"
import { margin } from "./columns/margin.js"
import { name } from "./columns/name.js"
import { ops } from "./columns/ops.js"
import { samples } from "./columns/samples.js"
import { summary } from "./columns/summary.js"
import { time } from "./columns/time.js"
import { createCountFormatter } from "./helpers/createCountFormatter.js"
import { createDurationFormatter } from "./helpers/createDurationFormatter.js"
import { createNumberFormatter } from "./helpers/createNumberFormatter.js"
import { getFastestTask } from "./helpers/getFastestTask.js"
import { getSlowestTask } from "./helpers/getSlowestTask.js"
import { mapRecord } from "./helpers/mapRecord.js"
import { sortTasks } from "./helpers/sortTasks.js"

export interface TinybenchPrinter<T extends string> {
    borders: (borders: Borders) => TinybenchPrinter<T>
    borderStyle: (style: Style[]) => TinybenchPrinter<T>
    column: <U extends string>(name: U, column: Column) => TinybenchPrinter<T | U>
    locales: (locales: Intl.LocalesArgument) => TinybenchPrinter<T>
    margin: (options: MarginOptions) => TinybenchPrinter<T>
    maxWidth: (maxWidth: number) => TinybenchPrinter<T>
    name: (options: NameOptions) => TinybenchPrinter<T>
    ops: (options: OpsOptions) => TinybenchPrinter<T>
    order: (order: T[]) => TinybenchPrinter<T>
    padding: (padding: number) => TinybenchPrinter<T>
    prepareTableConfig: (bench: Bench) => CreateCliTableConfig<T>
    samples: (options: SamplesOptions) => TinybenchPrinter<T>
    sort: (method: SortMethod) => TinybenchPrinter<T>
    stdout: (stdout: NodeJS.WriteStream) => TinybenchPrinter<T>
    summary: (options: SummaryOptions) => TinybenchPrinter<T>
    time: (options: TimeOptions) => TinybenchPrinter<T>
    toCli: (bench: Bench) => string
    toMarkdown: (bench: Bench) => string
    useBottomBorder: (use: boolean) => TinybenchPrinter<T>
    useDividerBorder: (use: boolean) => TinybenchPrinter<T>
    useHeader: (use: boolean) => TinybenchPrinter<T>
    useHeaderSeparator: (use: boolean) => TinybenchPrinter<T>
    useLeftBorder: (use: boolean) => TinybenchPrinter<T>
    useRightBorder: (use: boolean) => TinybenchPrinter<T>
    useRowSeparator: (use: boolean) => TinybenchPrinter<T>
    useTopBorder: (use: boolean) => TinybenchPrinter<T>
}

type Config = {
    borders?: Borders
    borderStyle?: Style[]
    columns: Columns<string>
    locales?: Intl.LocalesArgument
    maxWidth?: number
    order: string[]
    padding?: number
    sort?: SortMethod
    stdout?: NodeJS.WriteStream
    useBottomBorder?: boolean
    useDividerBorder?: boolean
    useHeader?: boolean
    useHeaderSeparator?: boolean
    useLeftBorder?: boolean
    useRightBorder?: boolean
    useRowSeparator?: boolean
    useTopBorder?: boolean
}

export class TinybenchPrinterImpl {
    config: Config

    constructor(config: Config) {
        this.config = config
    }

    borders(borders: Borders) {
        return this.merge({ borders })
    }

    borderStyle(borderStyle: Style[]) {
        return this.merge({ borderStyle })
    }

    column(name: string, column: Column) {
        return this.merge({
            columns: { ...this.config.columns, [name]: column },
        })
    }

    locales(locales: Intl.LocalesArgument) {
        return this.merge({ locales })
    }

    margin(options: MarginOptions) {
        return this.column("margin", margin(options))
    }

    maxWidth(maxWidth: number) {
        return this.merge({ maxWidth })
    }

    merge(config: Partial<Config>) {
        return new TinybenchPrinterImpl({
            ...this.config,
            ...config,
        })
    }

    name(options: NameOptions) {
        return this.column("name", name(options))
    }

    ops(options: OpsOptions) {
        return this.column("ops", ops(options))
    }

    order(order: string[]) {
        return this.merge({ order })
    }

    padding(padding: number) {
        return this.merge({ padding })
    }

    prepareTableConfig(bench: Bench) {
        const {
            columns,
            locales,
            order,
            sort,
            ...rest
        } = this.config

        let tasks = bench.tasks.filter(task =>
            task.result.state === "completed"
            || task.result.state === "aborted-with-statistics") as TaskWithResult[]

        if (!tasks.length) return

        tasks = sortTasks(tasks, sort)
        const fastestTask = getFastestTask(tasks)!
        const slowestTask = getSlowestTask(tasks)!
        const formatNumber = createNumberFormatter(locales)
        const formatDuration = createDurationFormatter(locales)
        const formatCount = createCountFormatter(locales)

        const rows = tasks.map(task => mapRecord(columns, column => column.content({
            fastestTask,
            formatCount,
            formatDuration,
            formatNumber,
            locales,
            slowestTask,
            task,
            tasks,
        })))

        return {
            ...rest,
            columnAlignments: mapRecord(columns, column => column.rowAlignment),
            columns: order,
            columnStyles: mapRecord(columns, column => column.rowStyle),
            headerAlignments: mapRecord(columns, column => column.headerAlignment),
            headerStyles: mapRecord(columns, column => column.headerStyle),
            headerTitles: mapRecord(columns, column => column.header),
            rows,
        }
    }

    samples(options: SamplesOptions) {
        return this.column("samples", samples(options))
    }

    sort(sort: SortMethod) {
        return this.merge({ sort })
    }

    stdout(stdout: NodeJS.WriteStream) {
        return this.merge({ stdout })
    }

    summary(options: SummaryOptions) {
        return this.column("summary", summary(options))
    }

    time(options: TimeOptions) {
        return this.column("time", time(options))
    }

    toCli(bench: Bench): string {
        const config = this.prepareTableConfig(bench)
        if (!config) return ""
        return cli.createTable(config)
    }

    toMarkdown(bench: Bench): string {
        const config = this.prepareTableConfig(bench)
        if (!config) return ""
        return markdown.createTable(config)
    }

    useBottomBorder(useBottomBorder: boolean) {
        return this.merge({ useBottomBorder })
    }

    useDividerBorder(useDividerBorder: boolean) {
        return this.merge({ useDividerBorder })
    }

    useHeader(useHeader: boolean) {
        return this.merge({ useHeader })
    }

    useHeaderSeparator(useHeaderSeparator: boolean) {
        return this.merge({ useHeaderSeparator })
    }

    useLeftBorder(useLeftBorder: boolean) {
        return this.merge({ useLeftBorder })
    }

    useRightBorder(useRightBorder: boolean) {
        return this.merge({ useRightBorder })
    }

    useRowSeparator(useRowSeparator: boolean) {
        return this.merge({ useRowSeparator })
    }

    useTopBorder(useTopBorder: boolean) {
        return this.merge({ useTopBorder })
    }
}

export const tinybenchPrinter = new TinybenchPrinterImpl({
    order: ["name", "summary", "ops", "time", "margin", "samples"],
    columns: {
        margin: margin(),
        name: name(),
        ops: ops(),
        samples: samples(),
        summary: summary(),
        time: time(),
    },
}) as TinybenchPrinter<DefaultColumn>
