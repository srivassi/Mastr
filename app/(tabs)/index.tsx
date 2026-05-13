import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/theme';

export default function LearnScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 16, alignItems: 'center' }}>
        <Text style={{ fontSize: 28, fontWeight: '800', color: colors.textPrimary, marginBottom: 8 }}>
          Learn
        </Text>
        <Text style={{ color: colors.textSecondary }}>Path map coming soon</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
