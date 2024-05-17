import { formatNumber } from './formatNumber.js'

export const createNumberFormatter = (locales: Intl.LocalesArgument) => (value: number) => formatNumber(value, locales)
