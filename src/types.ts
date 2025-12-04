import type { Alignment, Style } from "@monstermann/tables"
import type { Task, TaskResultCompleted } from "tinybench"

export type TaskWithResult = Task & { result: TaskResultCompleted }

export type CountMethod =
    | "none"
    | "shortest"
    | "highest"
    | "lowest"
    | "mean"
    | "thousands"
    | "millions"
    | "billions"

export type DurationMethod =
    | "shortest"
    | "highest"
    | "lowest"
    | "mean"
    | "nanoseconds"
    | "microseconds"
    | "milliseconds"
    | "seconds"

export type SummaryMethod =
    | "x"
    | "%"

export type SortMethod =
    | false
    | "asc"
    | "desc"
    | ((tasks: TaskWithResult[]) => TaskWithResult[])

export type DefaultColumn =
    | "name"
    | "summary"
    | "ops"
    | "time"
    | "margin"
    | "samples"

export type ColumnContext = {
    fastestTask: TaskWithResult
    locales: Intl.LocalesArgument
    slowestTask: TaskWithResult
    task: TaskWithResult
    tasks: TaskWithResult[]
    formatCount: (method: CountMethod, value: number, values: number[]) => string
    formatDuration: (method: DurationMethod, value: number, values: number[]) => string
    formatNumber: (value: number) => string
}

export type ColumnOptions = {
    header: string
    headerAlignment: Alignment
    headerStyle: Style[]
    rowAlignment: Alignment
    rowStyle: Style[]
}

export type Column = ColumnOptions & {
    content: (ctx: ColumnContext) => string
}

export type Columns<T extends string> = Record<T, Column>

export type NameOptions = Partial<ColumnOptions>
export type SummaryOptions = Partial<ColumnOptions & { fastestTitle: string, method: SummaryMethod }>
export type OpsOptions = Partial<ColumnOptions & { method: CountMethod }>
export type TimeOptions = Partial<ColumnOptions & { method: DurationMethod }>
export type MarginOptions = Partial<ColumnOptions>
export type SamplesOptions = Partial<ColumnOptions & { method: CountMethod }>
