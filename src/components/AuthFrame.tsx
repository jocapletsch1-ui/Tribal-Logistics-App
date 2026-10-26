import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function AuthFrame({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.orangeShape} />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={styles.brand}>
            <Text style={styles.brandText}>TRIBAL</Text>
            <Text style={styles.brandText}>LOGISTICS</Text>
          </View>
          <View style={styles.panel}>{children}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export const authStyles = StyleSheet.create({
  field: {
    marginTop: 12,
  },
  label: {
    color: '#251304',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    minHeight: 34,
    borderWidth: 1,
    borderColor: 'rgba(55,27,5,0.72)',
    borderRadius: 5,
    paddingHorizontal: 8,
    color: '#261506',
    backgroundColor: 'rgba(255,255,255,0.06)',
    fontSize: 11,
  },
  primaryButton: {
    minHeight: 31,
    width: '58%',
    alignSelf: 'center',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
    marginTop: 12,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
  },
  link: {
    alignSelf: 'center',
    paddingVertical: 8,
  },
  forgotButton: {
    alignSelf: 'flex-start',
    paddingTop: 5,
  },
  linkText: {
    color: 'rgba(30,15,4,0.72)',
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  error: {
    color: '#4C1200',
    fontSize: 10,
    marginTop: 8,
    textAlign: 'center',
  },
  note: {
    color: 'rgba(35,17,5,0.7)',
    fontSize: 9,
    lineHeight: 13,
    textAlign: 'center',
    marginTop: 8,
  },
  helper: {
    color: 'rgba(35,17,5,0.62)',
    fontSize: 9,
    marginTop: 4,
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#050505',
  },
  orangeShape: {
    position: 'absolute',
    top: '8%',
    bottom: '-3%',
    left: -30,
    width: '120%',
    backgroundColor: '#994400',
    experimental_backgroundImage: 'linear-gradient(135deg, #B95600 0%, #703100 100%)',
    transform: [{ rotate: '-5deg' }],
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
    paddingTop: 110,
    paddingBottom: 28,
  },
  content: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  brand: {
    alignSelf: 'flex-start',
    marginBottom: 95,
    transform: [{ rotate: '-5deg' }],
  },
  brandText: {
    color: '#3D1C04',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
    lineHeight: 22,
    textShadowColor: 'rgba(0,0,0,0.16)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  panel: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(69,28,0,0.64)',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#E86D00',
  },
});
