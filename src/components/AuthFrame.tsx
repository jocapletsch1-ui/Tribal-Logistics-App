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
    marginTop: 14,
  },
  label: {
    color: '#251304',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    minHeight: 42,
    borderWidth: 1,
    borderColor: 'rgba(55,27,5,0.72)',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#261506',
    backgroundColor: 'rgba(255,255,255,0.06)',
    fontSize: 14,
  },
  primaryButton: {
    minHeight: 46,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7900',
    marginTop: 18,
  },
  primaryButtonText: {
    color: '#160B02',
    fontSize: 18,
    fontWeight: '800',
  },
  link: {
    alignSelf: 'center',
    paddingVertical: 10,
  },
  forgotButton: {
    alignSelf: 'flex-start',
    paddingTop: 8,
  },
  linkText: {
    color: 'rgba(30,15,4,0.72)',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  error: {
    color: '#4C1200',
    fontSize: 12,
    marginTop: 10,
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
    fontSize: 12,
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#A64C00',
    backgroundImage: 'linear-gradient(180deg, #D95D00 0%, #B75400 100%)',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
    paddingTop: 44,
    paddingBottom: 28,
  },
  content: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    justifyContent: 'center',
    minHeight: 560,
  },
  brand: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  brandText: {
    color: '#3D1C04',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 1,
    lineHeight: 34,
    textShadowColor: 'rgba(0,0,0,0.16)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  panel: {
    width: '100%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(69,28,0,0.64)',
    borderRadius: 0,
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: '#D56700',
    backgroundImage: 'linear-gradient(135deg, #F57D00 0%, #B95400 42%, #6F3200 100%)',
    justifyContent: 'space-between',
    transform: [{ rotate: '0deg' }],
  },
});
