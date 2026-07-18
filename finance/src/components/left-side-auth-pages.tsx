import { useTheme } from "@/providers/theme-provider"
import { makeLoginStyles } from "@/styles/login-styles"
import { useMemo } from "react"
import { View, Image} from 'react-native'
import { HeroText } from "./login/hero-text"

type LeftSideProps = {
    title : string,
    description : string
}

export function LeftSide(props : LeftSideProps) {
    const theme = useTheme()
    const styles = useMemo(() => makeLoginStyles(theme), [theme])

    return(
            <View style={styles.leftSide}>
                <View style={styles.decorativeCircle} />
                <View style={styles.leftContent}>
                    <View style = {styles.logoContainer}>
                    <Image
                        source={require('@/assets/images/logo_finance_app.png')}
                        style={styles.logo}
                    />
                    </View>
                    <HeroText title = {props.title} description={props.description}></HeroText>
                </View>
            </View>
    )

}
