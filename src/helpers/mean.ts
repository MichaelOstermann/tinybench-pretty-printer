export function mean(values: number[]): number {
    return values.reduce((a, b) => a + b, 0) / values.length
}
