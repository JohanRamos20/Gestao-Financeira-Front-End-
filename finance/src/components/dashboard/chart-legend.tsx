import { makeDashboardStyles } from '@/components/dashboard/dashboard-styles';
import { useTheme } from '@/hooks/use-theme';
import { useMemo} from 'react';
import { View, Text } from "react-native";
import { formatNumberToMoney } from "@/utils/formatters/format-number-to-money";

export type ChartLegendItem = {
    label : string
    value : number
    percentage? : number
    color? : string
}

export type ChartLegendProps = ChartLegendItem[]

type ChartLegendComponentsProps = {
    data : ChartLegendProps
}

export function ChartLegend({data} : ChartLegendComponentsProps) {
    const theme = useTheme();
    const styles = useMemo(() => makeDashboardStyles(theme), [theme]);

    return (
        <View style = { styles.chartLegendContainer}>
            <Text style = {styles.containersText}>Legenda</Text>
            {data.map((item) => (
                <View style = {[styles.containersColumn, {justifyContent:'space-between'}]}>
                    <View style = {{borderTopWidth:1, borderColor: theme.border}}/>
                    <View key = {item.label} style = {[styles.chartLegendLabel, {alignItems:'center', justifyContent:'flex-start',}]}>
                        <View style = {[styles.chartLegendColorBox, {backgroundColor: item.color}]}/>
                        <View>
                            <Text style = {[styles.containersText, {paddingBottom : 5, fontSize: 22}]}>{item.label}</Text>
                            <Text style = {[styles.descriptionText, {fontSize:18}]}>{formatNumberToMoney(item.value)} · {item.percentage}%</Text>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    )

}