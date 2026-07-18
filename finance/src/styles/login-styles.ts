import { useTheme } from '@/hooks/use-theme';
import { StyleSheet } from 'react-native';

type Theme = ReturnType<typeof useTheme>;

export const makeLoginStyles = (theme: Theme) => StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFF',
    },
    leftSide : {
        flex: 1.15,
        backgroundColor: theme.backgroundLogin,
        boxShadow: theme.shadow,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        position: 'relative',
    },
    rightSide : {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    logoContainer: {
        width: 300,
        height: 40,
    },
    logo: {
        width: '100%',
        height: 80,
        aspectRatio: 5,
        resizeMode: 'contain',
    },
    decorativeCircle: {
        position: 'absolute',
        width: 420,
        height: 420,
        borderRadius: 420,
        borderWidth: 52,
        borderColor: theme.primaryMuted,
        opacity: 0.22,
        right: -170,
        bottom: -145,
        zIndex: 0,
    },
    leftContent: {
        flex: 1,
        padding: 0,
        zIndex: 1,
    },
    heroTextContainer: {
        marginTop: 'auto',
        padding: 50,
        width: 350,
    },
    heroTitle: {
        color: '#FFF',
        fontSize: 30,
        fontFamily: theme.fonts.display,
        fontWeight: 'bold'
    },
    heroDescriptionContainer: {
        width: 300,
        paddingTop: 10,
    },
    heroDescription: {
        color: theme.primarySoft,
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'justify',
    },
    inputText : {
        width: '100%',
        minHeight:44,
        borderRadius:10,
        backgroundColor:'#FFF'
    },
    button : {
        backgroundColor:theme.primaryMuted, 
        minHeight:44,
        width: '100%',
    },
    textPressable : {
        color : theme.primaryMuted
    },
    loginContainer : {
        width: '100%',
        maxWidth: 360,
        gap:20,
        alignSelf: 'center',
        alignItems:'stretch'
    },
    forgotPassword: {
        alignSelf: 'flex-end',
    },
    signupRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 15,
        color: theme.textSecondary
    }
})
