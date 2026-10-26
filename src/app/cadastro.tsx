import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { AuthFrame, authStyles } from '@/components/AuthFrame';

export default function CadastroScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [erro, setErro] = useState('');

  function cadastrar() {
    if (!email.trim() || !email.includes('@') || senha.length < 6) {
      setErro('Informe um e-mail válido e uma senha com pelo menos 6 caracteres.');
      return;
    }
    if (senha !== confirmacao) {
      setErro('As senhas não coincidem.');
      return;
    }
    setErro('');
    router.replace('/dashboard');
  }

  return (
    <AuthFrame>
      <View style={authStyles.field}>
        <Text style={authStyles.label}>E-mail</Text>
        <TextInput
          accessibilityLabel="E-mail"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="exemplo@gmail.com"
          placeholderTextColor="rgba(255,255,255,0.65)"
          style={authStyles.input}
        />
      </View>
      <View style={authStyles.field}>
        <Text style={authStyles.label}>Senha</Text>
        <TextInput
          accessibilityLabel="Senha"
          autoComplete="new-password"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          placeholder="12345678"
          placeholderTextColor="rgba(255,255,255,0.65)"
          style={authStyles.input}
        />
      </View>
      <View style={authStyles.field}>
        <Text style={authStyles.label}>Confirmar senha</Text>
        <TextInput
          accessibilityLabel="Confirmar senha"
          autoComplete="new-password"
          secureTextEntry
          value={confirmacao}
          onChangeText={setConfirmacao}
          onSubmitEditing={cadastrar}
          placeholder="12345678"
          placeholderTextColor="rgba(255,255,255,0.65)"
          style={authStyles.input}
        />
      </View>
      {erro ? <Text accessibilityRole="alert" style={authStyles.error}>{erro}</Text> : null}
      <Pressable accessibilityRole="button" onPress={cadastrar} style={authStyles.primaryButton}>
        <Text style={authStyles.primaryButtonText}>Cadastrar-se</Text>
      </Pressable>
      <Link href="/login" asChild>
        <Pressable style={authStyles.link}>
          <Text style={authStyles.linkText}>Já tem uma conta? Entrar</Text>
        </Pressable>
      </Link>
    </AuthFrame>
  );
}
