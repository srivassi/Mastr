import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../../store/userStore';
import { MARKETS } from '../../constants/markets';
import type { MarketId } from '../../types';

const MARKET_DESCRIPTIONS: Record<MarketId, string> = {
  india: 'Nifty 50, SENSEX, SEBI & RBI',
  eu:    'DAX, CAC 40, ECB & Euronext',
  us:    'S&P 500, NASDAQ, Fed & SEC',
};

export default function OnboardingScreen() {
  const [selected, setSelected] = useState<MarketId | null>(null);
  const setMarket = useUserStore((s) => s.setMarket);

  function handleContinue() {
    if (!selected) return;
    setMarket(selected);
    router.push('/(auth)/signup');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Pick your market</Text>
        <Text style={styles.subtitle}>
          Every lesson, chart, and scenario will be tailored to it. You can change this later.
        </Text>

        {(Object.keys(MARKETS) as MarketId[]).map((id) => {
          const market = MARKETS[id];
          const isSelected = selected === id;
          return (
            <TouchableOpacity
              key={id}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => setSelected(id)}
              activeOpacity={0.8}
              accessibilityLabel={`Select ${market.label} market`}
            >
              <Text style={styles.flag}>{market.flag}</Text>
              <View style={styles.cardText}>
                <Text style={[styles.cardTitle, isSelected && styles.cardTitleSelected]}>
                  {market.label}
                </Text>
                <Text style={styles.cardSub}>{MARKET_DESCRIPTIONS[id]}</Text>
              </View>
              {isSelected && <Text style={styles.tick}>✓</Text>}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.btnGreen, !selected && styles.btnDisabled]}
          onPress={handleContinue}
          disabled={!selected}
          activeOpacity={0.8}
          accessibilityLabel="Continue to sign up"
        >
          <Text style={styles.btnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: '#FFFFFF' },
  scroll:        { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 12 },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#3C3C3C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#AFAFAF',
    lineHeight: 20,
    marginBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    backgroundColor: '#F7F7F7',
    minHeight: 72,
    marginBottom: 12,
  },
  cardSelected: {
    borderColor: '#58CC02',
    backgroundColor: '#F0FBE4',
  },
  flag:     { fontSize: 36, marginRight: 16 },
  cardText: { flex: 1 },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3C3C3C',
  },
  cardTitleSelected: { color: '#58CC02' },
  cardSub: {
    fontSize: 12,
    color: '#AFAFAF',
    marginTop: 2,
  },
  tick: {
    fontSize: 20,
    color: '#58CC02',
    fontWeight: '700',
  },
  footer: {
    padding: 24,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  btnGreen: {
    backgroundColor: '#58CC02',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnDisabled: {
    backgroundColor: '#E5E5E5',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
});
