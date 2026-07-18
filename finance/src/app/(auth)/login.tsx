import { Redirect }from 'expo-router';
import { useAuth } from '@/hooks/use-auth';
import { View } from 'react-native'
import { useMemo } from 'react';
import { makeLoginStyles } from '@/styles/login-styles';
import { LoginContainer } from '@/components/login/login-container';
import { useTheme } from '@/hooks/use-theme';
import { LeftSide } from '@/components/left-side-auth-pages';

export default function LoginScreen() {
  const { isAuthenticated } = useAuth();
  const theme = useTheme()
  const styles = useMemo(() => makeLoginStyles(theme), [theme])

  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  return (
    <View style={styles.screen}>
          <LeftSide title='Cada centavo, no seu lugar.' description='Acesse sua conta e veja como o seu mês está indo — entradas, saídas e metas, tudo num só painel.'/>
        <View style = {styles.rightSide}>
          <LoginContainer/>
        </View>
    </View>
  );
}
