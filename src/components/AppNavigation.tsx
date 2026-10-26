import { Link, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const abas = [
  { href: '/dashboard', label: 'Dashboard', symbol: '▦' },
  { href: '/nova-carga', label: 'Cadastro de Cargas', symbol: '⬡' },
  { href: '/cargas', label: 'Lista de Cargas', symbol: '☷' },
  { href: '/solicitacoes', label: 'Minhas solicitações', symbol: '◷' },
  { href: '/sobre', label: 'Sobre', symbol: 'ⓘ' },
  { href: '/perfil', label: 'Área do Perfil do Gestor', symbol: '♙' },
] as const;

export function AppNavigation({ mode }: { mode: 'sidebar' | 'bottom' }) {
  const pathname = usePathname();
  const rotaAtiva = pathname === '/detalhe-carga' ? '/cargas' : pathname;

  if (mode === 'sidebar') {
    return (
      <View style={styles.sidebar}>
        <View style={styles.profile}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>♙</Text>
          </View>
          <Text style={styles.profileTitle}>
            {pathname === '/dashboard'
              ? 'Dashboard'
              : pathname === '/nova-carga'
                ? 'Cadastro de Cargas'
                : abas.find((aba) => aba.href === pathname)?.label ?? 'Tribal Logistics'}
          </Text>
          <Text style={styles.profileName}>Cristian Bilizário</Text>
          <Text style={styles.profileCompany}>Metalúrgica Sul Ltda.</Text>
        </View>
        <View style={styles.sidebarLinks}>
          {abas.map((aba) => {
            const ativa = rotaAtiva === aba.href;
            return (
              <Link key={aba.href} href={aba.href} asChild>
                <Pressable
                  accessibilityRole="link"
                  accessibilityState={{ selected: ativa }}
                  style={StyleSheet.flatten([
                    styles.sidebarItem,
                    ativa ? styles.sidebarItemActive : undefined,
                  ])}>
                  <Text style={[styles.sidebarSymbol, ativa && styles.sidebarActiveText]}>
                    {aba.symbol}
                  </Text>
                  <Text style={[styles.sidebarLabel, ativa && styles.sidebarActiveText]}>
                    {aba.label}
                  </Text>
                </Pressable>
              </Link>
            );
          })}
        </View>
        <Link href="/login" asChild>
          <Pressable accessibilityRole="link" style={styles.sidebarItem}>
            <Text style={styles.sidebarSymbol}>⇥</Text>
            <Text style={styles.sidebarLabel}>Sair</Text>
          </Pressable>
        </Link>
        <View style={styles.sidebarMessage}>
          <Text style={styles.sidebarMessageTitle}>A tribo está com você.</Text>
          <Text style={styles.sidebarMessageText}>Mais controle do estoque à entrega.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.navigation}>
      {abas.map((aba) => {
        const ativa = rotaAtiva === aba.href;
        const label = {
          '/dashboard': 'Início',
          '/nova-carga': 'Nova carga',
          '/cargas': 'Cargas',
          '/solicitacoes': 'Pedidos',
          '/sobre': 'Sobre',
          '/perfil': 'Perfil',
        }[aba.href];
        return (
          <Link key={aba.href} href={aba.href} asChild>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel={aba.label}
              accessibilityState={{ selected: ativa }}
              style={StyleSheet.flatten([styles.item, ativa && styles.itemActive])}>
              <Text style={[styles.symbol, ativa && styles.activeText]}>{aba.symbol}</Text>
              <Text style={[styles.label, ativa && styles.activeText]}>{label}</Text>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navigation: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingHorizontal: 3,
    paddingTop: 4,
    paddingBottom: 3,
  },
  item: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingHorizontal: 1,
    paddingVertical: 3,
    borderRadius: 6,
  },
  itemActive: {
    backgroundColor: '#2A1708',
  },
  sidebar: {
    width: 180,
    flexShrink: 0,
    minHeight: '100%',
    paddingHorizontal: 12,
    paddingTop: 48,
    paddingBottom: 22,
    backgroundColor: '#A94B00',
    experimental_backgroundImage: 'linear-gradient(155deg, #7A3300 0%, #E56600 58%, #A94700 100%)',
  },
  profile: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.24)',
    paddingBottom: 18,
    marginBottom: 10,
  },
  profileAvatar: {
    width: 38,
    height: 38,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.42)',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.10)',
    marginBottom: 10,
  },
  profileAvatarText: {
    color: '#FFF',
    fontSize: 18,
  },
  profileTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 7,
  },
  profileName: {
    color: '#FFF',
    fontSize: 9,
    lineHeight: 16,
  },
  profileCompany: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 9,
    lineHeight: 15,
    textAlign: 'center',
  },
  sidebarLinks: {
    gap: 5,
    paddingTop: 5,
  },
  sidebarItem: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 9,
    borderRadius: 7,
  },
  sidebarItemActive: {
    backgroundColor: '#FF7900',
  },
  sidebarSymbol: {
    width: 16,
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
  },
  sidebarLabel: {
    flex: 1,
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  sidebarActiveText: {
    color: '#17100A',
  },
  sidebarMessage: {
    marginTop: 'auto',
    paddingTop: 30,
  },
  sidebarMessageTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19,
  },
  sidebarMessageText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 9,
    lineHeight: 15,
    marginTop: 5,
  },
  symbol: {
    color: '#85878A',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 21,
  },
  label: {
    color: '#85878A',
    fontSize: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeText: {
    color: '#FF8A24',
  },
});
