import '@/global.css'

import { Stack } from 'expo-router'
import { ThemeProvider } from '@/providers/theme-provider'
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { AuthProvider } from '@/providers/auth-provider'
import * as SplashScreen from 'expo-splash-screen';
import { Fraunces_500Medium } from '@expo-google-fonts/fraunces';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Fraunces_500Medium,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
    });

    useEffect(() => {
        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;
    return (
        <ThemeProvider>
            <AuthProvider>
                <Stack screenOptions={{headerShown: false}}>
                    <Stack.Screen name="(auth)"/>
                    <Stack.Screen name="(app)"/>
                </Stack>
            </AuthProvider>
        </ThemeProvider>
    )
}
