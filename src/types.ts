import type { Alignment, Style } from '@monstermann/tables'
import type { Task, TaskResult } from 'tinybench'

export type TaskWithResult = Task & { result: TaskResult }

export type CountMethod =
    | 'none'
    | 'shortest'
    | 'highest'
    | 'lowest'
    | 'mean'
    | 'thousands'
    | 'millions'
    | 'billions'

export type DurationMethod =
    | 'shortest'
    | 'highest'
    | 'lowest'
    | 'mean'
    | 'nanoseconds'
    | 'microseconds'
    | 'milliseconds'
    | 'seconds'

export type SummaryMethod =
    | 'x'
    | '%'

export type SortMethod =
    | false
    | 'asc'
    | 'desc'
    | ((tasks: TaskWithResult[]) => TaskWithResult[])

export type DefaultColumn =
    | 'name'
    | 'summary'
    | 'ops'
    | 'time'
    | 'margin'
    | 'samples'

export type ColumnContext = {
    task: TaskWithResult
    tasks: TaskWithResult[]
    fastestTask: TaskWithResult
    slowestTask: TaskWithResult
    locales: Intl.LocalesArgument
    formatNumber: (value: number) => string
    formatDuration: (method: DurationMethod, value: number, values: number[]) => string
    formatCount: (method: CountMethod, value: number, values: number[]) => string
}

export type ColumnOptions = {
    header: string
    headerStyle: Style[]
    headerAlignment: Alignment
    rowStyle: Style[]
    rowAlignment: Alignment
}

export type Column = ColumnOptions & {
    content: (ctx: ColumnContext) => string
}

export type Columns<T extends string> = Record<T, Column>

export type NameOptions = Partial<ColumnOptions>
export type SummaryOptions = Partial<ColumnOptions & { method: SummaryMethod, fastestTitle: string }>
export type OpsOptions = Partial<ColumnOptions & { method: CountMethod }>
export type TimeOptions = Partial<ColumnOptions & { method: DurationMethod }>
export type MarginOptions = Partial<ColumnOptions>
export type SamplesOptions = Partial<ColumnOptions & { method: CountMethod }>
