import { createBench } from './createBench.js'

export const bench = createBench([
    { name: 'A', time: 0.000001, samples: 1_000_000_000, margin: 1.00 },
    { name: 'B', time: 0.001, samples: 1_000_000, margin: 1.50 },
    { name: 'C', time: 1, samples: 1_000, margin: 2.00 },
    { name: 'D', time: 1000, samples: 100, margin: 2.50 },
])
