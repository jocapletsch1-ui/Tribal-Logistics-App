import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';

import { AuthFrame, authStyles } from '@/components/AuthFrame';

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  function entrar() {
    if (usuario.trim() === 'admin' && senha === 'admin') {
      setErro('');
      router.replace('/dashboard');
      return;
    }
    setErro('Acesso de demonstração: use admin / admin.');
  }

  return (
    <AuthFrame>
      <View style={authStyles.field}>
        <Text style={authStyles.label}>Email</Text>
        <TextInput
          accessibilityLabel="Email"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          value={usuario}
          onChangeText={setUsuario}
          placeholder="exemplo@gmail.com"
          placeholderTextColor="rgba(255,255,255,0.65)"
          style={authStyles.input}
        />
      </View>
      <View style={authStyles.field}>
        <Text style={authStyles.label}>Senha</Text>
        <TextInput
          accessibilityLabel="Senha"
          autoComplete="current-password"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          onSubmitEditing={entrar}
          placeholder="12345678"
          placeholderTextColor="rgba(255,255,255,0.65)"
          style={authStyles.input}
        />
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={() => Alert.alert('Recuperar senha', 'A recuperação de senha ainda não está conectada a um serviço de autenticação.')}
        style={authStyles.forgotButton}>
        <Text style={authStyles.helper}>Esqueceu sua senha?</Text>
      </Pressable>
      {erro ? <Text accessibilityRole="alert" style={authStyles.error}>{erro}</Text> : null}
      <Pressable accessibilityRole="button" onPress={entrar} style={authStyles.primaryButton}>
        <Text style={authStyles.primaryButtonText}>Login</Text>
      </Pressable>
      <Link href="/cadastro" asChild>
        <Pressable style={authStyles.link}>
          <Text style={authStyles.linkText}>Cadastre-se</Text>
        </Pressable>
      </Link>
    </AuthFrame>
  );
}
