import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useIsDesktop } from '@/hooks/use-is-desktop';

export function Screen({
  title,
  subtitle,
  action,
  children,
}: PropsWithChildren<{ title: string; subtitle: string; action?: ReactNode }>) {
  const desktop = useIsDesktop();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.content, desktop && styles.desktopContent]}>
        <View style={[styles.header, desktop && styles.desktopHeader]}>
          <View style={styles.headerTop}>
            <View style={styles.brand}>
              <Text style={styles.brandText}>tribal logistics</Text>
            </View>
            {action && !desktop ? <View style={styles.mobileAction}>{action}</View> : null}
          </View>
          <View style={[styles.pageHeading, desktop && styles.desktopPageHeading]}>
            <Text style={[styles.title, desktop && styles.desktopTitle]}>{title}</Text>
            <Text style={[styles.subtitle, desktop && styles.desktopSubtitle]}>{subtitle}</Text>
          </View>
          {desktop ? <View style={styles.headerAction}>{action ?? null}</View> : null}
        </View>
        <View style={[styles.body, desktop && styles.desktopBody]}>{children}</View>
        <Text style={styles.footer}>Tribal Logistics · Gestão de estoque e cargas</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export const palette = {
  background: '#050505',
  surface: '#11100E',
  elevated: '#180B00',
  border: '#493018',
  text: '#F4F4F2',
  secondary: '#B9AAA0',
  muted: '#81766C',
  accent: '#FF7700',
  accentSoft: '#3A1C00',
  panelOrange: '#E66A00',
  panelOrangeDark: '#713000',
};

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 14,
  },
  desktopContent: {
    flexGrow: 1,
    minHeight: '100%',
    paddingHorizontal: 28,
    paddingTop: 13,
    paddingBottom: 18,
  },
  header: {
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: palette.accent,
    paddingBottom: 9,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 18,
  },
  brand: {
    alignSelf: 'flex-start',
  },
  brandText: {
    color: '#F3F3F3',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  mobileAction: {
    alignItems: 'flex-end',
  },
  desktopHeader: {
    minHeight: 83,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  desktopPageHeading: {
    alignItems: 'center',
    paddingTop: 7,
  },
  headerAction: {
    width: 180,
    alignItems: 'flex-end',
    paddingTop: 8,
  },
  pageHeading: {
    flex: 1,
    marginTop: 5,
  },
  title: {
    color: palette.text,
    fontSize: 19,
    fontWeight: '600',
  },
  desktopTitle: {
    fontSize: 26,
    fontWeight: '500',
  },
  desktopSubtitle: {
    fontSize: 10,
    lineHeight: 15,
  },
  desktopBody: {
    flex: 1,
    minHeight: 0,
  },
  subtitle: {
    color: palette.secondary,
    fontSize: 9,
    lineHeight: 13,
    marginTop: 2,
  },
  body: {
    marginTop: 3,
  },
  footer: {
    color: '#6B625A',
    fontSize: 8,
    textAlign: 'center',
    marginTop: 12,
  },
});

export function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <View style={sectionStyles.row}>
      <Text style={sectionStyles.title}>{title}</Text>
      {action}
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    color: palette.text,
    fontSize: 14,
    fontWeight: '700',
  },
});
