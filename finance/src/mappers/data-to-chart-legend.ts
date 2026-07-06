import { ChartLegendItem } from '@/components/dashboard/chart-legend';

type ChartColors = {
    spent: string
    remaining: string
}

export function mapTransactionsToChartLegendData(
    data : ChartLegendItem[],
    colors: ChartColors,
) : ChartLegendItem[] {
    const total = data.reduce((acc, item) => acc + item.value, 0)
    
    return data.map((item) => ({
        label : item.label,
        value : item.value,
        percentage : total > 0 ? Math.round((item.value / total) * 100) : 0,
        color : item.color ?? (item.label === 'Gasto' ? colors.spent : colors.remaining)
    }))
}
