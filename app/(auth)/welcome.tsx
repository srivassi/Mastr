import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View style={styles.top}>
          <Text style={styles.logo}>tradr</Text>
          <Text style={styles.tagline}>Learn to trade. Actually understand it.</Text>
        </View>

        <View style={styles.middle}>
          <Text style={styles.bear}>🐻</Text>
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.btnGreen}
            onPress={() => router.push('/(auth)/onboarding')}
            activeOpacity={0.8}
          >
            <Text style={styles.btnGreenText}>Create account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnGhost}
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.8}
          >
            <Text style={styles.btnGhostText}>I already have an account</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, paddingHorizontal: 24 },
  top: {
    alignItems: 'center',
    paddingTop: 48,
  },
  logo: {
    fontSize: 48,
    fontWeight: '900',
    color: '#58CC02',
    letterSpacing: -2,
  },
  tagline: {
    fontSize: 16,
    color: '#AFAFAF',
    marginTop: 8,
    textAlign: 'center',
  },
  middle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bear: {
    fontSize: 120,
  },
  bottom: {
    paddingBottom: 24,
  },
  btnGreen: {
    backgroundColor: '#58CC02',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnGreenText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  btnGhost: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnGhostText: {
    color: '#AFAFAF',
    fontSize: 14,
    fontWeight: '600',
  },
});
