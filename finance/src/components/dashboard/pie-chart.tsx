import { PieChart as GiftedPieChart } from "react-native-gifted-charts";
import { makeDashboardStyles } from '@/styles/dashboard-styles';
import { useTheme } from '@/hooks/use-theme';
import { useMemo, useState} from 'react';
import { View, Text } from "react-native";
import { formatNumberToMoney } from "@/utils/formatters/format-number-to-money";

export type PieChartDataItem = {
    label: string,
    value: number,
    color: string
}

export type PieChartProps = PieChartDataItem[]

type PieChartComponentsProps = {
    data : PieChartProps
}

export function PieChart({data} : PieChartComponentsProps) {
    const theme = useTheme();
    const styles = useMemo(() => makeDashboardStyles(theme), [theme]);
    const remaining = data.reduce((acc,  transactions) => {
        if(transactions.label==='Gasto') {
            return acc - transactions.value
        } return acc + transactions.value
    }, 0)
    const valueFormated = formatNumberToMoney(remaining)

    const [containerWidth, setContainerWidth] = useState(0)
    const radius = Math.min(180, Math.max(120, containerWidth * 0.40))
    const innerRadius = radius *0.65

    return (
        <View 
            style = {{flex: 1, alignItems: 'center'}}
            onLayout={(event) => {
                setContainerWidth(event.nativeEvent.layout.width)
            }}
        >
            <GiftedPieChart
                data = {data}
                donut
                radius={radius}
                innerRadius={innerRadius}
                innerCircleColor={theme.surface}
                centerLabelComponent={() => (
                    <View style={{ alignItems: 'center' }}>
                    <Text style = { styles.descriptionText }>Restante</Text>
                    <Text style={{ fontSize: radius * 0.2, color: theme.text , fontWeight: 'bold'}}>{valueFormated}</Text>
                    </View>
                )}
            />
        </View>
    )
}
