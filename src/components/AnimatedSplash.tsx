import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Animated, Platform, StyleSheet } from 'react-native';

if (Platform.OS !== 'web') {
  SplashScreen.preventAutoHideAsync();
  SplashScreen.setOptions({ duration: 2000, fade: true });
}

export function AnimatedSplash() {
  const [visible, setVisible] = useState(true);
  const [overlayOpacity] = useState(() => new Animated.Value(1));
  const [logoOpacity] = useState(() => new Animated.Value(0));
  const [logoOffset] = useState(() => new Animated.Value(18));
  const [accentOpacity] = useState(() => new Animated.Value(0));
  const [accentScale] = useState(() => new Animated.Value(0.25));
  const [captionOpacity] = useState(() => new Animated.Value(0));
  const [captionOffset] = useState(() => new Animated.Value(10));

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (Platform.OS !== 'web') {
        SplashScreen.hide();
      }

      Animated.sequence([
        Animated.stagger(180, [
          Animated.parallel([
            Animated.timing(logoOpacity, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(logoOffset, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(accentOpacity, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(accentScale, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(captionOpacity, {
              toValue: 1,
              duration: 1300,
              useNativeDriver: true,
            }),
            Animated.timing(captionOffset, {
              toValue: 0,
              duration: 1300,
              useNativeDriver: true,
            }),
          ]),
        ]),
        Animated.delay(350),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          setVisible(false);
        }
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      overlayOpacity.stopAnimation();
      logoOpacity.stopAnimation();
      logoOffset.stopAnimation();
      accentOpacity.stopAnimation();
      accentScale.stopAnimation();
      captionOpacity.stopAnimation();
      captionOffset.stopAnimation();
    };
  }, [
    accentOpacity,
    accentScale,
    captionOffset,
    captionOpacity,
    logoOffset,
    logoOpacity,
    overlayOpacity,
  ]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View pointerEvents="none" style={[styles.overlay, { opacity: overlayOpacity }]}>
      <Animated.Image
        accessibilityLabel="Tribal Logistics"
        resizeMode="contain"
        source={require('../../assets/Logo Tribal Logistics Minimalista.png')}
        style={[
          styles.logo,
          { opacity: logoOpacity, transform: [{ translateY: logoOffset }] },
        ]}
      />
      <Animated.View
        style={[
          styles.accent,
          { opacity: accentOpacity, transform: [{ scaleX: accentScale }] },
        ]}
      />
      <Animated.Text
        style={[
          styles.caption,
          { fontFamily: 'Almarai', opacity: captionOpacity, transform: [{ translateY: captionOffset }] },
        ]}>
        movendo oque importa
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#050505',
  },
  logo: {
    width: 280,
    height: 280,
  },
  accent: {
    position: 'absolute',
    bottom: '30%',
    width: 36,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#FF7900',
  },
  caption: {
    position: 'absolute',
    bottom: '25%',
    color: '#F4F4F2',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
});
