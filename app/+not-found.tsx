import { View, Text, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { colors } from '../constants/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: '600', color: colors.textPrimary },
  link: { marginTop: 16 },
  linkText: { color: colors.navy, fontSize: 16 },
});
