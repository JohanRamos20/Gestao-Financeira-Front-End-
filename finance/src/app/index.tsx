import { useTheme } from '@/hooks/use-theme';
import { useMemo } from 'react';
import { View, StyleSheet, Text, useColorScheme, Dimensions, Platform } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';

type Theme = ReturnType<typeof useTheme>
const { width, height } = Dimensions.get('window')

type GoalProps = {
  id : string,
  name : string,
  targetAmount: number,
  savedAmount: number,
}

type GoalListProps = {
  goals : GoalProps[]
}

const goalMock: GoalProps[] = [
  { id: '1', name: 'Viagem', savedAmount: 800, targetAmount: 2000 },
  { id: '2', name: 'Notebook novo', savedAmount: 1500, targetAmount: 4000 },
  { id: '3', name: 'Reserva de emergência', savedAmount: 3000, targetAmount: 10000 },
  { id: '4', name: 'Notebook novo', savedAmount: 1500, targetAmount: 4000 },
  { id: '5', name: 'Reserva de emergência', savedAmount: 3000, targetAmount: 10000 },
];


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
        <View style = {styles.containersRow}>
          <View style = {styles.movementsContainer}>
              <Text style = { styles.subtitle }>
                Movimentações
              </Text>
            <Text style = { styles.containersText }>
              Últimas transações
            </Text>
          </View>
          <View style = {styles.goalContainer}>
            <Text style = { styles.subtitle }>
              Meta do mês
            </Text>
            <GoalLists goals={goalMock}></GoalLists>
          </View>
        </View>
    </View>  
    )
}

export function GoalLabel(props : GoalProps) {
  const scheme = useColorScheme();
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [scheme])

  const percentage = props.savedAmount !== 0 ? (props.savedAmount/props.targetAmount) * 100 : 0
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100)

  return (
    <View style = { styles.containersColumn }>
      <View style = { styles.containersRow }>
        <Text style = { styles.containersText }>
          {props.name}
        </Text>
        <View style = { styles.goalPercentage }>
          <Text style = { styles.percentageText }>
            {clampedPercentage.toFixed(0)}%
          </Text>
        </View>
      </View>
      <View style = { styles.emptyProgressBar }>
        <View style = {[styles.fillProgressBar, {width: `${clampedPercentage}%`}]}/>
      </View>
      <Text style = { styles.descriptionText }>
        R$ {props.savedAmount} guardados de R$ {props.targetAmount}
      </Text>

    </View>
  )
}

export function GoalLists({goals} : GoalListProps) {
  const scheme = useColorScheme();
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [scheme]);

  return (
    <FlatList
      data = {goals}
      keyExtractor= {(item) => item.id}
      renderItem={({item}) => (
        <GoalLabel 
          id={item.id}
          name={item.name} 
          savedAmount={item.savedAmount} 
          targetAmount={item.targetAmount} 
        />
      )}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      />
  )

}

const makeStyles = (theme : Theme) => StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems : 'center',
    backgroundColor: theme.background,
    paddingTop: 40,
    gap: 30,
  },
  listContent : {
    gap: 20
  },
  container: {
    backgroundColor: theme.primaryDark,
    width: '95%',
    height: height * 0.43 ,
    borderRadius: 30,
    padding: 25,
    gap: 30,
  },
  containersRow: {
    width: '95%',
    flexDirection: 'row',
    gap: 20
  },
  containersColumn: {
    width: '95%',
    flexDirection: 'column',
    gap: 10
  },
  movementsContainer: {
    backgroundColor: theme.surface,
    width: '65%',
    height: height * 0.43 ,
    borderRadius: 30,
    padding: 20,
    gap: 5,
    borderWidth: 1,
    borderColor: theme.border
  },
  containersText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text
  },
  goalContainer: {
    overflow: 'hidden',
    backgroundColor: theme.surface,
    width: '33%',
    height: height * 0.43 ,
    borderRadius: 30,
    padding: 20,
    paddingRight: 0,
    gap: 10,
    borderWidth: 1,
    borderColor: theme.border
  },
    goalPercentage: {
    marginRight: -20,
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 24,
    borderRadius: 30,
    backgroundColor: theme.primaryMuted
  },
  percentageText : {
    fontSize: 13,
    color: '#FFF',
    fontWeight: 'bold',
    alignContent: 'center'
  },
  
  emptyProgressBar : {
    height : 8,
    borderRadius:4,
    backgroundColor: theme.primarySoft,
    overflow: 'hidden'
  },

  fillProgressBar : {
    height : '100%',
    borderRadius:4,
    backgroundColor: theme.primaryMuted
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
    fontSize: 14,
    color: theme.primary,
    fontWeight : 'bold'
  },
  balancetext: {
    fontSize: 55,
    fontWeight: 'bold',
    marginTop: -10,
    color: theme.text
  },
  descriptionText: {
    marginTop : -5,
    fontSize: 14,
    color: theme.textSecondary,
  }
})
