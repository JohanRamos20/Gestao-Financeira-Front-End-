import { View } from 'react-native'
import { useMemo } from 'react';
import { makeLoginStyles } from '@/styles/login-styles';
import { useTheme } from '@/hooks/use-theme';
import { LeftSide } from '@/components/left-side-auth-pages';
import { CreateAccountContainer } from '@/components/login/create-account-container';

export default function CreateAccountScreen() {
  const theme = useTheme()
  const styles = useMemo(() => makeLoginStyles(theme), [theme])

  return (
    <View style={styles.screen}>
              <LeftSide title='Seu primeiro real, organizado.' description='Crie sua conta e comece a acompanhar entradas, saídas e metas — sem planilha, sem complicação.'/>
            <View style = {styles.rightSide}>
              <CreateAccountContainer/>
            </View>
        </View>
  );
}
