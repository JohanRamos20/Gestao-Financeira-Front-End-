import { Redirect }from 'expo-router';
import { useAuth } from '@/hooks/use-auth';
import { View, Image, useWindowDimensions, Text } from 'react-native'
import { useMemo } from 'react';
import { makeLoginStyles } from '@/styles/login-styles';
import { LoginContainer } from '@/components/login/login-container';
import { useTheme } from '@/hooks/use-theme';
import { HeroText } from '@/components/login/hero-text';

export default function LoginScreen() {
  const { isAuthenticated } = useAuth();
  const { width } = useWindowDimensions()
  const theme = useTheme()
  const styles = useMemo(() => makeLoginStyles(theme), [theme])
  const isCompact = width < 820

  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  return (
    <View style={[styles.screen, isCompact && styles.screenCompact]}>
        <View style = {[styles.leftSide, isCompact && styles.leftSideCompact]}>
          <View style={[styles.decorativeCircle, isCompact && styles.decorativeCircleCompact]} />
          <View style={styles.leftContent}>
            <View style = {[styles.logoContainer, isCompact && styles.logoContainerCompact]}>
              <Image
                source={require('@/assets/images/logo_finance_app.png')}
                style={[styles.logo, isCompact && styles.logoCompact]}
              />
            </View>
            <HeroText title ='Cada centavo, no seu lugar.' description='Acesse sua conta e veja como o seu mês está indo — entradas, saídas e metas, tudo num só painel.'></HeroText>
          </View>
        </View>
        <View style = {[styles.rightSide, isCompact && styles.rightSideCompact]}>
          <LoginContainer/>
        </View>
    </View>
  );
}
