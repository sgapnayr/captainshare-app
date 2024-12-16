import React, { useEffect } from 'react';
import { Text, ImageBackground, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, images } from '../constants';
import LinearGradient from 'react-native-linear-gradient';

type Nav = {
  navigate: (value: string) => void
}

const Onboarding1 = () => {
  const { navigate } = useNavigation<Nav>();
  // Add useEffect
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('onboarding2');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []); // run only once after component mounts

  return (
    <ImageBackground
      source={images.onboardingSplash1}
      style={styles.area}>
      <StatusBar hidden />
      <LinearGradient
        // Background linear gradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.background}>
        <Text style={styles.greetingText}>Welcome to 👋</Text>
        <Text style={styles.logoName}>Medico</Text>
        <Text style={styles.subtitle}>The best online doctor consultation app of the century for your daily needs!</Text>
      </LinearGradient>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 270,
    flex: 1
  },
  greetingText: {
    fontSize: 40,
    color: COLORS.white,
    fontFamily: "Urbanist Bold",
    marginVertical: 12,
    paddingHorizontal: 12
  },
  logoName: {
    fontSize: 76,
    color: COLORS.white,
    fontFamily: "Urbanist ExtraBold",
    paddingHorizontal: 12
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.white,
    marginVertical: 12,
    fontFamily: "Urbanist SemiBold",
    paddingHorizontal: 12
  }
})

export default Onboarding1;