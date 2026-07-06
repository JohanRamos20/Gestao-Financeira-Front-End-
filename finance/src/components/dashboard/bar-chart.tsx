import { makeDashboardStyles } from '@/components/dashboard/dashboard-styles';
import { useTheme } from '@/hooks/use-theme';
import { useMemo, useState } from 'react';
import { BarChart as GiftedBarChart } from 'react-native-gifted-charts'
import { View } from 'react-native'

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
    const [containerWidth, setContainerWidth] = useState(0)

    const barCount = Math.max(data.length, 1)
    const chartHorizontalPadding = 48
    const availableWidth = Math.max(containerWidth - chartHorizontalPadding, 0)
    const minBarWidth = 10
    const maxBarWidth = 40
    const minSpacing = 8
    const sideSpacing = 12

    const barWidth = Math.min(
        maxBarWidth,
        Math.max(minBarWidth, availableWidth / (barCount * 2))
    )
    const remainingWidth = availableWidth - (barWidth * barCount) - (sideSpacing * 2)
    const spacing = barCount > 1
        ? Math.max(minSpacing, remainingWidth / (barCount - 1))
        : 0
    const chartHeight = Math.min(350, Math.max(220, containerWidth * 0.55))

    return(
        <View 
        style = {{flex:1 , alignItems: 'stretch'}}
        onLayout={(event) => {
            setContainerWidth(event.nativeEvent.layout.width)
        }}
        >
            {containerWidth > 0 && (
            <GiftedBarChart
                data={data}
                height={chartHeight}
                frontColor = {theme.primaryMuted}
                stepValue={200}
                noOfSections={5}
                barWidth={barWidth}
                spacing={spacing}
                initialSpacing={sideSpacing}
                yAxisThickness={0}
                yAxisTextStyle = { styles.descriptionText }
                xAxisLabelTextStyle = { styles.descriptionText }
                xAxisThickness={0}
                hideRules
            />
            )}
        </View>
    )
}
