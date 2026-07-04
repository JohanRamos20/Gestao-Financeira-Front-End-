import { makeDashboardStyles } from '@/components/dashboard/dashboard-styles';
import { useTheme } from '@/hooks/use-theme';
import { useMemo } from 'react';
import { BarChart as GiftedBarChart } from 'react-native-gifted-charts'

export type BarChartDataItem = {
    value : number,
    label : string
}

export type BarChartProps = BarChartDataItem[]

type BarChartComponentProps = {
    data : BarChartProps
}

export function BarChart({ data } : BarChartComponentProps){
    const theme = useTheme();
    const styles = useMemo(() => makeDashboardStyles(theme), [theme]);
    return(
    <GiftedBarChart
            data={data}
            frontColor = {theme.primaryMuted}
            stepValue={200}
            noOfSections={5}
            barWidth={50}
            spacing={90}
            initialSpacing={60}
            yAxisThickness={0}
            yAxisTextStyle = { styles.descriptionText }
            xAxisLabelTextStyle = { styles.descriptionText }
            xAxisThickness={0}
            hideRules
        />
    )
}