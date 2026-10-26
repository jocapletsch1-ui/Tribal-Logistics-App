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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#A64C00',
    backgroundImage: 'linear-gradient(180deg, #D95D00 0%, #8E3D00 100%)',
  },
  content: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
    paddingTop: 18,
    paddingBottom: 22,
  },
  brandBlock: {
    alignSelf: 'stretch',
    paddingHorizontal: 2,
    paddingTop: 8,
    paddingBottom: 2,
  },
  brand: {
    color: '#271305',
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 32,
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  brandSecond: {
    color: '#271305',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 30,
    letterSpacing: 1,
  },
  featureCard: {
    width: '100%',
    alignSelf: 'center',
    minHeight: 150,
    marginTop: 18,
    paddingVertical: 22,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: 'rgba(64, 22, 0, 0.7)',
    borderRadius: 0,
    backgroundColor: '#D56700',
    backgroundImage: 'linear-gradient(135deg, #F57D00 0%, #B95400 42%, #6F3200 100%)',
    justifyContent: 'center',
    transform: [{ rotate: '0deg' }],
  },
  secondFeatureCard: {
    marginTop: 18,
    backgroundColor: '#C35A00',
    backgroundImage: 'linear-gradient(135deg, #E66D00 0%, #A74900 45%, #602B00 100%)',
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  cardText: {
    color: '#FFF0E2',
    fontSize: 16,
    lineHeight: 22,
  },
  actions: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 18,
    gap: 12,
  },
  loginButton: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: '#FF7900',
  },
  loginText: {
    color: '#160B02',
    fontSize: 22,
    fontWeight: '800',
  },
  arrow: {
    color: '#160B02',
    fontSize: 26,
    fontWeight: '700',
  },
  footer: {
    color: '#F7D7BA',
    fontSize: 12,
    textAlign: 'left',
  },
});
