import { createBench } from "./createBench.js"

export const bench = createBench([
    { margin: 1.00, name: "A", samples: 1_000_000_000, time: 0.000001 },
    { margin: 1.50, name: "B", samples: 1_000_000, time: 0.001 },
    { margin: 2.00, name: "C", samples: 1_000, time: 1 },
    { margin: 2.50, name: "D", samples: 100, time: 1000 },
])
