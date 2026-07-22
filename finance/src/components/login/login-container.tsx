import { useTheme } from '@/providers/theme-provider';
import { useAuth } from '@/providers/auth-provider';
import { Button } from '@/components/button';
import { View, Text, Pressable } from 'react-native'
import { useMemo, useState } from 'react';
import { makeLoginStyles } from '@/styles/login-styles';
import { TextInput } from '@/components/modal/text-input';
import { Link } from 'expo-router';
import { ModalError } from '@/components/modal/modal-error';
import { getErrorMessage } from '@/utils/get-error-message';


export function LoginContainer() {
    const { signIn } = useAuth();
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const theme = useTheme()
    const styles = useMemo(() => makeLoginStyles(theme), [theme])

    async function handleSignIn() {
        try {
            await signIn({ email, password })
        } catch (error) {
            setErrorMessage(getErrorMessage(error))
        }
    }

    return(
        <View style={styles.loginContainer}>
            <View>
                <Text style={styles.subtitle}>Bem-vindo de volta</Text>
                <Text style={styles.title}>Entrar na sua conta</Text>
            </View>
            <TextInput label='E-mail' placeholder='seu@email.com' onChangeText={setEmail} value={email} style={styles.inputText} font={{ fontSize: 14 }}></TextInput>
            <TextInput label='Senha' placeholder='••••••••' onChangeText={setPassword} value={password} style={styles.inputText} font={{ fontSize: 14 }} secureTextEntry={true}></TextInput>
            <Pressable style={styles.forgotPassword}>
                <Text style={styles.textPressable}>
                    Esqueceu a senha?
                </Text>
            </Pressable>
            <Button onPress={handleSignIn} label='Entrar' style={styles.button} contentStyle={{ fontSize: 14, color: '#FFF' }}></Button>
            <View style={styles.signupRow}>
                <Text>
                    Não tem conta?
                </Text>
                <Link href="/create-account" asChild>
                    <Pressable>
                        <Text style={styles.textPressable}>
                            Criar Conta
                        </Text>
                    </Pressable>
                </Link>
            </View>
            <ModalError
                visible={!!errorMessage}
                title="Erro ao entrar"
                message={errorMessage}
                variant="error"
                buttonLabel="Entendi"
                onClose={() => setErrorMessage('')}
            />
        </View>
    )
}
