import { Button } from '@/components/button';
import { TextInput } from '@/components/modal/text-input';
import { useTheme } from '@/providers/theme-provider';
import { makeLoginStyles } from '@/styles/login-styles';
import { Link } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export function CreateAccountContainer() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const theme = useTheme();
    const styles = useMemo(() => makeLoginStyles(theme), [theme]);

    return (
        <View style={styles.loginContainer}>
            <View>
                <Text style={styles.subtitle}>Novo por aqui</Text>
                <Text style={styles.title}>Criar sua conta</Text>
            </View>
            <TextInput label="Nome completo" placeholder="Seu nome" onChangeText={setName} value={name} style={styles.inputText} font={{ fontSize: 14 }}></TextInput>
            <TextInput label="E-mail" placeholder="seu@email.com" onChangeText={setEmail} value={email} style={styles.inputText} font={{ fontSize: 14 }} keyboardType="email-address"></TextInput>
            <TextInput label="Senha" placeholder="••••••••" onChangeText={setPassword} value={password} style={styles.inputText} font={{ fontSize: 14 }} secureTextEntry={true}></TextInput>
            <TextInput label="Confirmar Senha" placeholder="••••••••" onChangeText={setConfirmPassword} value={confirmPassword} style={styles.inputText} font={{ fontSize: 14 }} secureTextEntry={true}></TextInput>
            <Button onPress={() => {}} label="Criar conta" style={styles.button} contentStyle={{ fontSize: 14, color: '#FFF' }}></Button>
            <View style={styles.signupRow}>
                <Text>
                    Já tem conta?
                </Text>
                <Link href="/login" asChild>
                    <Pressable>
                        <Text style={styles.textPressable}>
                            entrar
                        </Text>
                    </Pressable>
                </Link>
            </View>
        </View>
    );
}
