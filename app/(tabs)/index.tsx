import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, spacing, typography } from '../../constants/theme';

export default function LearnScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Learn</Text>
        <Text style={styles.subtitle}>Path map coming soon</Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.push('/lesson/unit1-lesson1')}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>▶  Try a lesson</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner:     { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg, gap: spacing.lg },
  title:     { fontSize: typography.xxl, fontWeight: '900', color: colors.textPrimary },
  subtitle:  { fontSize: typography.sm, color: colors.textSecondary },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    borderRadius: 16,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  btnText: { color: '#fff', fontSize: typography.lg, fontWeight: '800' },
});
