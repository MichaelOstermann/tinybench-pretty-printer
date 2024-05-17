export function formatNumber(
    value: number,
    locales: Intl.LocalesArgument,
): string {
    return value.toLocaleString(locales, getPrecision(value))
}

function getPrecision(value: number): Intl.NumberFormatOptions {
    if (value < 1) return { maximumSignificantDigits: 2 }
    if (value < 10) return { maximumSignificantDigits: 1 }
    return { maximumFractionDigits: 0 }
}
