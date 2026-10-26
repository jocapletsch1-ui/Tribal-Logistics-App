import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Screen, palette } from '@/components/Screen';
import { useIsDesktop } from '@/hooks/use-is-desktop';

const beneficios = [
  { titulo: 'Eficiência', descricao: 'Menos retrabalho e mais agilidade para planejar coletas e entregas.', simbolo: 'ϟ' },
  { titulo: 'Segurança', descricao: 'Dados confiáveis e acompanhamento em cada etapa do transporte.', simbolo: '◇' },
  { titulo: 'Rastreamento', descricao: 'Veículos e rotas visíveis para você saber onde sua carga está.', simbolo: '⌖' },
  { titulo: 'Organização', descricao: 'Registros, prazos e responsáveis reunidos em um único lugar.', simbolo: '⌘' },
];

export default function SobreScreen() {
  const desktop = useIsDesktop();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');

  function enviarMensagem() {
    if (!nome.trim() || !email.trim() || !assunto.trim() || !mensagem.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos antes de continuar.');
      return;
    }
    Alert.alert(
      'Envio não configurado',
      'Sua mensagem foi preenchida, mas o aplicativo ainda não está conectado a um serviço de envio.',
    );
  }

  return (
    <Screen title="Sobre" subtitle="Conheça a missão e os valores da Tribal Logistics.">
      <View style={[styles.layout, desktop && styles.desktopLayout]}>
        <View style={styles.leftColumn}>
          <View style={styles.mission}>
            <Text style={styles.missionEyebrow}>Nossa missão</Text>
            <Text style={styles.missionTitle}>A tribo estará aqui pra resolver seu problema.</Text>
            <Text style={styles.missionText}>
              Simplificar a logística industrial, conectando estoque, cargas e transporte com informação clara para cada decisão do gestor.
            </Text>
            <Text style={styles.missionText}>Da coleta à entrega, sua operação organizada.</Text>
          </View>
          <View style={styles.benefits}>
            {beneficios.map((item) => (
              <View key={item.titulo} style={styles.benefit}>
                <View style={styles.benefitHeading}>
                  <Text style={styles.benefitIcon}>{item.simbolo}</Text>
                  <Text style={styles.benefitTitle}>{item.titulo}</Text>
                </View>
                <Text style={styles.benefitText}>{item.descricao}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.contact}>
          <Text style={styles.contactTitle}>Fale com a tribo</Text>
          <Text style={styles.contactIntro}>Tem uma dúvida ou sugestão? Envie sua mensagem para nossa equipe.</Text>

          <ContactField label="Nome" value={nome} onChangeText={setNome} placeholder="Seu nome" />
          <ContactField label="E-mail" value={email} onChangeText={setEmail} placeholder="seu@email.com" />
          <ContactField label="Assunto" value={assunto} onChangeText={setAssunto} placeholder="Como podemos ajudar?" />
          <ContactField
            label="Mensagem"
            value={mensagem}
            onChangeText={setMensagem}
            placeholder="Escreva sua mensagem"
            multiline
          />

          <Pressable
            accessibilityRole="button"
            onPress={enviarMensagem}
            style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Enviar mensagem</Text>
          </Pressable>

          <View style={styles.contactInfo}>
            <Text style={styles.contactInfoText}>contato@triballogistics.com.br</Text>
            <Text style={styles.contactInfoText}>Segunda a sexta · 08:00 às 18:00</Text>
          </View>
        </View>
      </View>
    </Screen>
  );
}

function ContactField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.65)"
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        style={[styles.input, multiline && styles.messageInput]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    gap: 14,
  },
  desktopLayout: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 14,
  },
  leftColumn: {
    flex: 1.4,
    gap: 14,
  },
  mission: {
    flex: 1.2,
    minHeight: 210,
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#B94F00',
    experimental_backgroundImage: 'linear-gradient(100deg, #FF7900 0%, #331800 100%)',
  },
  missionEyebrow: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  missionTitle: {
    color: '#FFF',
    fontSize: 21,
    lineHeight: 27,
    fontWeight: '800',
    marginTop: 17,
    marginBottom: 16,
  },
  missionText: {
    color: '#FFF',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 7,
  },
  benefits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefit: {
    width: '48%',
    minHeight: 105,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: '#100A05',
    padding: 13,
  },
  benefitHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  benefitIcon: {
    color: palette.accent,
    fontSize: 18,
    fontWeight: '700',
  },
  benefitTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '500',
  },
  benefitText: {
    color: '#F0EEEB',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 10,
  },
  contact: {
    flex: 0.95,
    minWidth: 260,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#713400',
    backgroundColor: '#A94B00',
    padding: 15,
    experimental_backgroundImage: 'linear-gradient(100deg, #BF5A01 0%, #994700 100%)',
  },
  contactTitle: {
    color: '#FFF',
    fontSize: 19,
    fontWeight: '800',
  },
  contactIntro: {
    color: '#FFF',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 11,
    marginBottom: 12,
  },
  field: {
    marginBottom: 8,
  },
  fieldLabel: {
    color: '#FFF',
    fontSize: 11,
    marginBottom: 4,
  },
  input: {
    minHeight: 35,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#5A2A00',
    backgroundColor: 'rgba(85,35,0,0.2)',
    color: '#FFF',
    fontSize: 11,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  messageInput: {
    minHeight: 72,
  },
  sendButton: {
    minHeight: 37,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#572300',
    backgroundColor: '#FF7900',
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    minWidth: 145,
    marginTop: 1,
  },
  sendButtonText: {
    color: '#160900',
    fontSize: 11,
    fontWeight: '600',
  },
  contactInfo: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    marginTop: 13,
    paddingTop: 8,
  },
  contactInfoText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 11,
    lineHeight: 16,
  },
});
