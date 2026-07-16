import { useTheme } from '@/hooks/use-theme';
import { StyleSheet } from 'react-native';

type Theme = ReturnType<typeof useTheme>;

export const makeSharedStyles = (theme: Theme) => StyleSheet.create({
    input: {
        paddingVertical: 20,
        flex: 1,
        fontSize: 22,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.background,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 20,
        paddingHorizontal: 16,
        color: theme.text,
    },
    prefix: {
        color: theme.textSecondary,
        fontSize: 16,
        marginRight: 4,
    },
    label: {
        fontSize: 14,
        paddingBottom: 10,
        color: theme.textSecondary,
        fontWeight: 'bold'
    },
    option: {
        width: '49%',
        height: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.background,
        borderWidth: 1,
        borderColor: theme.border,
        height: 60,
        padding: 2,
        borderRadius: 14,
        justifyContent:'space-between'
    },
    optionText: {
        fontSize:20,
        fontWeight: '500',
        color: theme.textSecondary
    },
    optionCredit: {
        fontSize:20,
        fontWeight: '700',
        color: theme.green
    },
    optionDebit: {
        fontSize:20,
        fontWeight: '700',
        color: theme.red
    },
    categoryContainer: {
        minHeight: 40,
        minWidth: 130,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: theme.background,
        borderWidth: 1,
        borderColor: theme.border,
        paddingLeft: 15,
        gap: 10,
        borderRadius: 20,
    },
    categoryColor: {
        width: 10,
        height: 10,
        borderRadius: 30,
    },
    categoryText: {
        color: theme.textSecondary,
        fontWeight: '600',
        fontSize: 18,
    },
    button: {
        minHeight: 40,
        width: '49%',
        borderRadius:15,
        paddingVertical: 12,
        paddingHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})
