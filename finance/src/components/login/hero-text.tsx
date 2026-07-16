import { useTheme } from '@/providers/theme-provider'
import { makeLoginStyles } from '@/styles/login-styles'
import { useMemo } from 'react'
import { View, Text } from 'react-native' 

type HeroTextProps = {
    title : string,
    description: string
}

export function HeroText(props : HeroTextProps) {
    const theme = useTheme()
    const styles = useMemo(() => makeLoginStyles(theme), [theme])
    return (
        <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>
                {props.title}
            </Text>
            <View style={styles.heroDescriptionContainer}>
                <Text style={styles.heroDescription}>
                    {props.description}
                </Text>
            </View>
        </View>
    )
}