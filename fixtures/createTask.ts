import type { Task } from "tinybench"
import type { TaskWithResult } from "../src/types.js"
import type { TaskOptions } from "./types.js"

export function createTask({
    margin = 0,
    name = "",
    samples = 0,
    time = 0,
}: TaskOptions) {
    return {
        name,
        result: {
            period: 0.012473746164400444,
            runtime: "bun",
            runtimeVersion: "1.3.3",
            state: "completed",
            timestampProviderName: "performanceNow",
            totalTime: 100.00202299999836,
            latency: {
                aad: 0.0006042830658793024,
                critical: 1.96,
                df: 8016,
                mad: 0.00009999999997489795,
                max: 0.0699510000000032,
                mean: time,
                min: 0.011762000000032913,
                moe: 0.00003765203626542283,
                p50: 0.01223299999998062,
                p75: 0.012243000000012216,
                p99: 0.02187660000003008,
                p995: 0.023003000000016982,
                p999: 0.028401624000000354,
                rme: 0.30185026830897227,
                samples: undefined,
                samplesCount: samples,
                sd: 0.001720039176593652,
                sem: 0.000019210222584399406,
                variance: 0.0000029585347690169686,
            },
            throughput: {
                aad: 2584.591517912362,
                critical: 1.96,
                df: 8016,
                mad: 662.8241028443299,
                max: 85019.55449729653,
                mean: 1000 / time,
                min: 14295.721290617063,
                moe: 132.13434972230343,
                p50: 81746.09662401571,
                p75: 83243.15325047553,
                p99: 83634.48787635835,
                p995: 84875.23340660904,
                p999: 84947.33265369936,
                rme: margin,
                samples: undefined,
                samplesCount: samples,
                sd: 6036.227536113473,
                sem: 67.41548455219562,
                variance: 36436042.86773454,
            },
        },
    } as TaskWithResult
}

export function createFailedTask() {
    return { name: "", result: { error: new Error("Whoops"), state: "errored" } } as Task
}
