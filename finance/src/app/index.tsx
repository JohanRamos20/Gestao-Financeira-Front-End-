import { useTheme } from '@/hooks/use-theme';
import { useMemo } from 'react';
import { View, StyleSheet, Text, useColorScheme, Dimensions } from 'react-native'

type Theme = ReturnType<typeof useTheme>
const { width, height } = Dimensions.get('window')

export default function DashboardScreen() {
  const scheme = useColorScheme();
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [scheme])

  return(
    <View style = {styles.wrapper}>
      <View style={styles.container}>
        <View style ={styles.innerCollumn}>
          <Text style={styles.subtitle}>Olá, usuário</Text> 
          {/* 
            Colocar a variável usuário
          */}
          <Text style={styles.title}>Visão geral</Text>
        </View>
        <View style={styles.innerCollumn}>
          <Text style={styles.subtitle}>Saldo total</Text>
          <Text style={styles.balancetext}>R$ 12.345,00</Text>
          {/* 
            Colocar a variável saldo
          */}
        </View>
        <View style = {styles.cardsRow}>
          <View style = {styles.card}>
            <Text style = {styles.cardLabel}>
              Receitas
            </Text>
            <Text style = {styles.cardBalance}>
              R$ 5.200
            </Text>
          </View>
          <View style = {styles.card}>
            <Text style = {styles.cardLabel}>
              Gastos
            </Text>
            <Text style = {styles.cardBalance}>
              R$ 2.000
            </Text>
          </View>
          <View style = {styles.card}>
            <Text style = {styles.cardLabel}>
              Futuros
            </Text>
            <Text style = {styles.cardBalance}>
              R$ 1.500
            </Text>
          </View>
        </View>
      </View>
    </View>  
    )
}

const makeStyles = (theme : Theme) => StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems : 'center',
    backgroundColor: theme.background,
    paddingTop: 40
  },
  container: {
    backgroundColor: theme.primaryDark,
    width: '95%',
    height: height * 0.43 ,
    borderRadius: 30,
    padding: 25,
    gap: 30,
  },
  innerCollumn: {
    borderRadius: 8,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 16
  },
  card: {
    flex: 1,
    backgroundColor : theme.primarySoft,
    borderRadius: 16,
    padding: 16,
    height: height * 0.1
  },
  cardLabel: {
    fontSize: 16,
    color: theme.primary,
  },
  cardBalance: {
    fontSize: 22,
    color: theme.text,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: theme.text
  },
  subtitle: {
    fontSize: 16,
    color: theme.primary
  },
  balancetext: {
    fontSize: 60,
    fontWeight: 'bold',
    marginTop: -10,
    color: theme.text
  }

})
