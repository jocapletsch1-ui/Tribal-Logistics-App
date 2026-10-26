import { Stack, usePathname } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { AppNavigation } from '@/components/AppNavigation';
import { AnimatedSplash } from '@/components/AnimatedSplash';
import { CargasProvider } from '@/context/CargasContext';
import { useIsDesktop } from '@/hooks/use-is-desktop';

export default function TabLayout() {
  const pathname = usePathname();
  const desktop = useIsDesktop();
  const publicScreen = pathname === '/' || pathname === '/login' || pathname === '/cadastro';

  return (
    <SafeAreaProvider>
      <CargasProvider>
        <View style={[styles.container, desktop && styles.desktopContainer]}>
          <View style={styles.pages}>
            <Stack screenOptions={{ headerShown: false, contentStyle: styles.screen }} />
          </View>
          {!publicScreen && desktop ? <AppNavigation mode="sidebar" /> : null}
          {!publicScreen && !desktop ? (
            <SafeAreaView edges={['bottom']} style={styles.mobileNavigation}>
              <AppNavigation mode="bottom" />
            </SafeAreaView>
          ) : null}
          <AnimatedSplash />
        </View>
      </CargasProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090A0B',
  },
  desktopContainer: {
    flexDirection: 'row',
  },
  pages: {
    flex: 1,
    minWidth: 0,
  },
  screen: {
    backgroundColor: '#090A0B',
  },
  mobileNavigation: {
    backgroundColor: '#11100E',
    borderTopWidth: 1,
    borderTopColor: '#493018',
  },
});
