import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing } from '../../constants/theme';

interface Props {
  current: number;
  total: number;
  hearts: number;
  onExit: () => void;
}

export default function ProgressBar({ current, total, hearts, onExit }: Props) {
  const progress = Math.min((current - 1) / total, 1);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onExit} style={styles.exitBtn} accessibilityLabel="Exit lesson">
        <Text style={styles.exitIcon}>✕</Text>
      </TouchableOpacity>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
      </View>

      <Text style={styles.heartsLabel} accessibilityLabel={`${hearts} hearts remaining`}>
        {hearts}♥
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  exitBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitIcon: {
    fontSize: 18,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  track: {
    flex: 1,
    height: 16,
    backgroundColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  heartsLabel: { fontSize: 16, fontWeight: '700', color: colors.danger, minWidth: 36, textAlign: 'right' },
});
