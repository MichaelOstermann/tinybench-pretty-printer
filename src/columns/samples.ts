import type { Column, SamplesOptions } from "../types.js"

export function samples(options: SamplesOptions = {}): Column {
    return {
        header: options?.header ?? "samples",
        headerAlignment: options?.headerAlignment ?? "center",
        headerStyle: options?.headerStyle ?? ["bold"],
        rowAlignment: options?.rowAlignment ?? "right",
        rowStyle: options?.rowStyle ?? ["magenta"],
        content({ formatCount, task, tasks }) {
            return formatCount(
                options.method ?? "shortest",
                task.result.throughput.samplesCount,
                tasks.map(task => task.result.throughput.samplesCount),
            )
        },
    }
}
