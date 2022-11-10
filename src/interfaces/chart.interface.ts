type ChartHeader = [string, string, { role: string; type: string; }];
type ChartBody = [number, number, string];

export type Chart = [ChartHeader, ...ChartBody[]];
