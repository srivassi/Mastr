import { Stack } from 'expo-router';
import { colors, typography } from '../../constants/theme';

export default function LessonLayout() {
  return (
    <Stack screenOptions={{ animation: 'slide_from_right' }}>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="complete"
        options={{
          title: 'Lesson complete',
          headerBackVisible: false,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { fontWeight: '800', fontSize: typography.lg, color: colors.textPrimary },
        }}
      />
    </Stack>
  );
}
