import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.orangeShape} />
      <View style={styles.content}>
        <View style={styles.brandBlock}>
          <Text style={styles.brand}>TRIBAL</Text>
          <Text style={styles.brandSecond}>LOGISTICS</Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.cardTitle}>Tribal Logistics</Text>
          <Text style={styles.cardText}>Conectando sua operação ao mercado logístico.</Text>
        </View>
        <View style={[styles.featureCard, styles.secondFeatureCard]}>
          <Text style={styles.cardTitle}>Problemas no estoque?</Text>
          <Text style={styles.cardText}>A tribo está aqui para resolver seu problema.</Text>
        </View>

        <View style={styles.actions}>
          <Link href="/login" asChild>
            <Pressable accessibilityRole="button" style={styles.loginButton}>
              <Text style={styles.loginText}>Login</Text>
              <Text style={styles.arrow}>→</Text>
            </Pressable>
          </Link>
          <Text style={styles.footer}>Tribal Logistics · Gestão de estoque e cargas</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#050505',
  },
  orangeShape: {
    position: 'absolute',
    top: -38,
    left: -24,
    width: '115%',
    height: '67%',
    backgroundColor: '#A64C00',
    experimental_backgroundImage: 'linear-gradient(120deg, #FF7900 0%, #472100 100%)',
    transform: [{ rotate: '-5deg' }],
  },
  content: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-start',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 5,
  },
  brandBlock: {
    alignSelf: 'stretch',
    paddingHorizontal: 2,
    paddingTop: 2,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.42)',
    transform: [{ rotate: '-5deg' }],
  },
  brand: {
    color: '#271305',
    fontSize: 27,
    fontWeight: '900',
    lineHeight: 28,
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  brandSecond: {
    color: '#271305',
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 26,
    letterSpacing: 1,
  },
  featureCard: {
    width: '94%',
    alignSelf: 'center',
    minHeight: 76,
    marginTop: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 9,
    backgroundColor: 'rgba(207,91,0,0.66)',
    transform: [{ rotate: '4deg' }],
  },
  secondFeatureCard: {
    marginTop: 12,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  cardText: {
    color: '#FFF0E2',
    fontSize: 9,
    lineHeight: 13,
    marginTop: 5,
  },
  actions: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: '26%',
    gap: 10,
  },
  loginButton: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#FF7900',
  },
  loginText: {
    color: '#160B02',
    fontSize: 14,
    fontWeight: '800',
  },
  arrow: {
    color: '#160B02',
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    color: '#77716C',
    fontSize: 8,
  },
});
