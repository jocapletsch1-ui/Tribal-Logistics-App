import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

import { Screen, palette } from '@/components/Screen';
import { useCargas } from '@/context/CargasContext';

export default function PerfilScreen() {
  const { cargas } = useCargas();
  const pendentes = cargas.filter((carga) => carga.status === 'Pendente').length;

  return (
    <Screen title="Perfil do Gestor" subtitle="Consulte e gerencie as informações do seu perfil.">
      <Pressable
        accessibilityRole="button"
        onPress={() => Alert.alert('Editar perfil', 'A edição do perfil ainda não está conectada a um serviço de conta.')}
        style={styles.editButton}>
        <Text style={styles.editButtonText}>Editar Perfil</Text>
      </Pressable>

      <View style={styles.card}>
        <View style={styles.sectionHeading}>
          <Text style={styles.icon}>♙</Text>
          <Text style={styles.sectionTitle}>Informações pessoais</Text>
        </View>
        <View style={styles.identity}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>♙</Text>
          </View>
          <View style={styles.identityCopy}>
            <Text style={styles.name}>Não informado</Text>
            <Text style={styles.role}>Perfil do gestor</Text>
          </View>
        </View>
        <Detail label="Nome completo" value="Não informado" />
        <View style={styles.detailsRow}>
          <Detail label="E-mail" value="Não informado" />
          <Detail label="Telefone" value="Não informado" />
        </View>
      </View>

      <View style={styles.professionalCard}>
        <View style={styles.sectionHeading}>
          <Text style={styles.professionalIcon}>▣</Text>
          <Text style={styles.sectionTitle}>Dados profissionais</Text>
        </View>
        <Text style={styles.description}>Informações de atuação e vínculo profissional.</Text>
        <Detail label="Cargo" value="Não informado" />
        <View style={styles.detailGap}>
          <Detail label="Empresa" value="Não informado" />
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.sectionHeading}>
          <Text style={styles.icon}>♢</Text>
          <Text style={styles.sectionTitle}>Segurança</Text>
        </View>
        <Text style={styles.bodyText}>Altere sua senha pra manter o acesso protegido.</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => Alert.alert('Segurança', 'A alteração de senha ainda não está conectada a um serviço de autenticação.')}
          style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Alterar senha</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <View style={styles.sectionHeading}>
          <Text style={styles.icon}>☷</Text>
          <Text style={styles.sectionTitle}>Preferências</Text>
        </View>
        <Text style={styles.preferenceTitle}>Notificações e configurações</Text>
        <Text style={styles.bodyText}>Nenhuma configuração disponível pra este perfil.</Text>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Cargas registradas</Text>
          <Text style={styles.summaryValue}>{cargas.length}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Aguardando aceite</Text>
          <Text style={styles.summaryValue}>{pendentes}</Text>
        </View>
      </View>

      <Link href="/login" asChild>
        <Pressable accessibilityRole="link" style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Sair da conta</Text>
        </Pressable>
      </Link>
    </Screen>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detail}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  editButton: {
    minHeight: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: palette.accent,
    marginBottom: 9,
  },
  editButtonText: {
    color: '#211000',
    fontSize: 9,
    fontWeight: '800',
  },
  card: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 8,
    padding: 9,
    backgroundColor: '#100A04',
    marginBottom: 8,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  icon: {
    color: palette.accent,
    fontSize: 12,
  },
  sectionTitle: {
    color: palette.text,
    fontSize: 10,
    fontWeight: '600',
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,138,0,0.48)',
    borderRadius: 20,
    backgroundColor: 'rgba(255,138,0,0.08)',
  },
  avatarText: {
    color: '#FF8A00',
    fontSize: 15,
  },
  identityCopy: {
    flex: 1,
  },
  name: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '600',
  },
  role: {
    color: '#B9AAA0',
    fontSize: 7,
    marginTop: 2,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 7,
  },
  detail: {
    flex: 1,
    gap: 2,
    marginTop: 5,
  },
  detailLabel: {
    color: '#C6B8AB',
    fontSize: 7,
  },
  detailValue: {
    color: '#F4F4F2',
    fontSize: 8,
  },
  professionalCard: {
    borderWidth: 1,
    borderColor: '#964400',
    borderRadius: 8,
    padding: 9,
    backgroundColor: '#A94B00',
    experimental_backgroundImage: 'linear-gradient(180deg, #B65300 0%, #542500 100%)',
    marginBottom: 8,
  },
  professionalIcon: {
    color: '#FFF',
    fontSize: 11,
  },
  description: {
    color: '#F0D8C5',
    fontSize: 7,
  },
  detailGap: {
    marginTop: 3,
  },
  bodyText: {
    color: '#B9B2AC',
    fontSize: 8,
    lineHeight: 12,
  },
  secondaryButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginTop: 8,
  },
  secondaryButtonText: {
    color: '#FFF',
    fontSize: 7,
  },
  preferenceTitle: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: '600',
    marginBottom: 3,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginVertical: 7,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  summaryLabel: {
    color: palette.secondary,
    fontSize: 7,
  },
  summaryValue: {
    color: palette.text,
    fontSize: 8,
    fontWeight: '800',
  },
  signOutButton: {
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#493018',
    borderRadius: 6,
    marginTop: 2,
  },
  signOutButtonText: {
    color: palette.secondary,
    fontSize: 9,
    fontWeight: '600',
  },
});
