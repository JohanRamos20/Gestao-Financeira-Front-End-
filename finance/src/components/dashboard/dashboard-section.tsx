import { ReactNode, useMemo  } from 'react'
import { ViewStyle, StyleProp, View, Text } from 'react-native'
import { makeDashboardStyles } from './dashboard-styles';
import { useTheme} from '@/hooks/use-theme';

type DashboardSectionProps = {
    title? : string,
    subtitle? : string,
    badge? : string,
    children : ReactNode,
    style? : StyleProp<ViewStyle>
    contentStyle? : StyleProp<ViewStyle>
}

export function DashboardSection(props : DashboardSectionProps) {
    const theme = useTheme()
    const styles = useMemo(() => makeDashboardStyles(theme), [theme]);
    return(
        <View style = {[styles.dashboardSectionContainer, props.style]}>
            <View style = {styles.dashboardSectionsRow}>
                <View>
                    {props.subtitle ?(
                        <Text style = {styles.subtitle}>{props.subtitle}</Text>
                    ) : null}
                        <Text style = {styles.title}>{props.title}</Text>
                </View>
                {props.badge ? (
                    <View style = {styles.containerBadge}>
                    <Text style = {styles.subtitle}>
                        {props.badge}
                    </Text>
                </View>
                ): null}
            </View>
            <View style = {props.contentStyle}>{props.children}</View>
            
        </View>

    )
}