import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../constants/theme';

export default function LessonCompleteScreen() {
  const { xp, correct, total } = useLocalSearchParams<{
    xp: string;
    correct: string;
    total: string;
  }>();

  const xpNum      = Number(xp ?? 0);
  const correctNum = Number(correct ?? 0);
  const totalNum   = Number(total ?? 1);
  const accuracy   = Math.round((correctNum / totalNum) * 100);
  const perfect    = correctNum === totalNum;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.pip}>{perfect ? '🐻🎉' : '🐻'}</Text>

        {perfect && <Text style={styles.perfectBadge}>Perfect! ⭐</Text>}

        <View style={styles.stats}>
          <Stat label="XP"       value={`+${xpNum} ⚡`} highlight />
          <Stat label="Accuracy" value={`${accuracy}%`} />
          <Stat label="Correct"  value={`${correctNum}/${totalNum}`} />
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.replace('/(tabs)')}
          activeOpacity={0.8}
          accessibilityLabel="Continue to home"
        >
          <Text style={styles.btnText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, highlight && styles.statValueHighlight]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.xl,
  },
  pip:         { fontSize: 96, textAlign: 'center', alignSelf: 'center' },
  perfectBadge: {
    fontSize: typography.lg,
    fontWeight: '800',
    color: colors.gold,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  stat: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.xs,
    borderWidth: 2,
    borderColor: colors.border,
  },
  statLabel: {
    fontSize: typography.xs,
    color: colors.textSecondary,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: typography.lg,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  statValueHighlight: { color: colors.primary },
  btn: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  btnText: {
    fontSize: typography.lg,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },
});
