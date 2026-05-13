import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/theme';

export default function LeaderboardScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: '800', color: colors.textPrimary, marginBottom: 8 }}>
          League
        </Text>
        <Text style={{ color: colors.textSecondary }}>Weekly rankings coming soon</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
