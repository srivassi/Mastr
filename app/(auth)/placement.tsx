import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../../store/userStore';
import { getTradrSkipLessons, getCodrSkipLessons } from '../../lib/curriculum';
import Pip from '../../components/pip/Pip';
import type { LanguageId, TrackId } from '../../types';

interface PlacementQ {
  question: string;
  options: string[];
  correct: number;
}

const TRADR_PLACEMENT: PlacementQ[] = [
  {
    question: 'What does owning a share of stock give you?',
    options: [
      'A loan to the company that earns interest',
      'A small ownership stake in the company',
      'A guaranteed annual dividend payment',
      'The right to manage the company',
    ],
    correct: 1,
  },
  {
    question: "A stock's P/E ratio is 25. What does this mean?",
    options: [
      'The stock has risen 25% this year',
      'The company earns 25% profit on revenue',
      'Investors pay £25 for every £1 of annual earnings',
      'The company has £25 in assets per share',
    ],
    correct: 2,
  },
  {
    question: 'On a candlestick chart, what does a red candle indicate?',
    options: [
      'Trading volume was unusually high',
      'The closing price was lower than the opening price',
      'The stock hit a 52-week low',
      'The stock paid a dividend that day',
    ],
    correct: 1,
  },
  {
    question: 'Interest rates rise. What typically happens to existing bond prices?',
    options: [
      'They rise — higher rates mean more demand',
      'Nothing — bonds are independent of rates',
      'They fall — new bonds pay more, making old ones less attractive',
      'They double to compensate investors',
    ],
    correct: 2,
  },
  {
    question: 'CPI rises to 6%. What does a central bank typically do?',
    options: [
      'Cut interest rates to stimulate spending',
      'Print more money to boost the economy',
      'Weaken the currency to help exports',
      'Raise interest rates to cool inflation',
    ],
    correct: 3,
  },
  {
    question: '"Markets crash as Fed raises rates by 0.25%." What\'s misleading about this?',
    options: [
      'Nothing — a rate rise always crashes markets',
      '0.25% is a large move that justifies "crash"',
      '"Crash" overstates a small, widely-expected move — markets often price in known decisions',
      'The Fed never announces rate decisions publicly',
    ],
    correct: 2,
  },
];

const CODR_PLACEMENT: PlacementQ[] = [
  {
    question: 'What is the average time complexity of a hash map lookup?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
    correct: 2,
  },
  {
    question: 'What does the Two Pointers pattern typically require about the input?',
    options: [
      'The input must be a linked list',
      'The array must contain only positive integers',
      'The array is usually sorted or the pointers converge toward each other',
      'The array must have an even number of elements',
    ],
    correct: 2,
  },
  {
    question: 'What problem does a sliding window solve efficiently?',
    options: [
      'Finding shortest paths in a graph',
      'Sorting elements in O(n) time',
      'Subarray/substring problems over a contiguous range of elements',
      'Detecting cycles in a linked list',
    ],
    correct: 2,
  },
  {
    question: 'Which traversal guarantees the shortest path in an unweighted graph?',
    options: ['DFS', 'BFS', 'Binary search', 'Dijkstra'],
    correct: 1,
  },
  {
    question: 'A recursive function calls itself n times before the base case. Space complexity?',
    options: ['O(1)', 'O(log n)', 'O(n) — call stack frames', 'O(n²)'],
    correct: 2,
  },
  {
    question: 'Binary search requires the input to be ___.',
    options: [
      'Unsorted — it searches randomly',
      'An array of integers only',
      'Divisible by 2 in length',
      'Sorted — it eliminates half the search space each step',
    ],
    correct: 3,
  },
];

type PlacementStep = 'intro' | 'quiz' | 'result';

function getSkipMessage(track: TrackId, score: number): { headline: string; sub: string } {
  if (track === 'tradr') {
    if (score >= 5) return {
      headline: `${score}/6 — skipping to Market Mastery`,
      sub: "You know the foundations cold. We're taking you straight to the market-specific content.",
    };
    if (score >= 3) return {
      headline: `${score}/6 — skipping Units 1 & 2`,
      sub: 'Solid grounding. Starting you at Unit 3: Macro & Market Literacy.',
    };
    return {
      headline: `${score}/6 — starting from the beginning`,
      sub: "No worries — foundations are the most important part. Pip's got you.",
    };
  }
  if (score >= 4) return {
    headline: `${score}/6 — skipping language basics`,
    sub: "You've got the toolkit. Starting at Unit 2: The 10 Patterns.",
  };
  return {
    headline: `${score}/6 — starting from Unit 1`,
    sub: "We'll build the toolkit first, then move into patterns.",
  };
}

export default function PlacementScreen() {
  const user                 = useUserStore((s) => s.user);
  const setPendingSkipLessons = useUserStore((s) => s.setPendingSkipLessons);

  const track    = (user?.track    ?? 'tradr') as TrackId;
  const language = (user?.language ?? 'python') as LanguageId;
  const level    = user?.level ?? 1;

  const [step, setStep]           = useState<PlacementStep>('intro');
  const [currentQ, setCurrentQ]   = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [revealed, setRevealed]   = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finalScore, setFinalScore] = useState(0);

  const questions = track === 'codr' ? CODR_PLACEMENT : TRADR_PLACEMENT;
  const q         = questions[currentQ];
  const progress  = (currentQ / questions.length) * 100;

  function handleOptionSelect(idx: number) {
    if (revealed) return;
    const isCorrect = idx === q.correct;
    setSelectedIdx(idx);
    setRevealed(true);
    const newCount = isCorrect ? correctCount + 1 : correctCount;
    if (isCorrect) setCorrectCount(newCount);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((c) => c + 1);
        setSelectedIdx(null);
        setRevealed(false);
      } else {
        const skipIds = track === 'codr'
          ? getCodrSkipLessons(newCount, language)
          : getTradrSkipLessons(newCount);
        setPendingSkipLessons(skipIds);
        setFinalScore(newCount);
        setStep('result');
      }
    }, 700);
  }

  function handleSkip() {
    setPendingSkipLessons([]);
    router.replace('/(tabs)');
  }

  if (step === 'intro') {
    const trackLabel = track === 'tradr' ? 'Tradr' : 'Codr';
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.introInner}>
          <View style={styles.pipContainer}>
            <Pip level={level} mood="idle" size={140} />
          </View>

          <Text style={styles.welcomeTitle}>Welcome to {trackLabel}!</Text>
          <Text style={styles.welcomeSub}>
            Quick placement check — 6 questions, 2 minutes. No penalty for wrong answers.
            Tap honestly and we'll skip you ahead to the right starting point.
          </Text>

          <View style={styles.pillRow}>
            <View style={styles.pill}><Text style={styles.pillText}>6 questions</Text></View>
            <View style={styles.pill}><Text style={styles.pillText}>~2 minutes</Text></View>
            <View style={styles.pill}><Text style={styles.pillText}>no penalty</Text></View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.btnGreen}
            onPress={() => setStep('quiz')}
            activeOpacity={0.8}
            accessibilityLabel="Start placement check"
          >
            <Text style={styles.btnText}>Let's go →</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSkip}
            onPress={handleSkip}
            activeOpacity={0.7}
            accessibilityLabel="Skip placement, start from the beginning"
          >
            <Text style={styles.btnSkipText}>Skip — start from the beginning</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (step === 'quiz') {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.quizHeader}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressLabel}>{currentQ + 1}/{questions.length}</Text>
        </View>

        <View style={styles.quizMeta}>
          <Text style={styles.quizEyebrow}>PLACEMENT CHECK · NO PENALTY FOR WRONG ANSWERS</Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.quizContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.quizQuestion}>{q.question}</Text>

          <View style={styles.optionsContainer}>
            {q.options.map((opt, idx) => {
              const isSelected = selectedIdx === idx;
              const isCorrect  = idx === q.correct;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.option,
                    revealed && isSelected && (isCorrect ? styles.optionCorrect : styles.optionWrong),
                    revealed && !isSelected && isCorrect && styles.optionCorrect,
                  ]}
                  onPress={() => handleOptionSelect(idx)}
                  activeOpacity={0.8}
                  disabled={revealed}
                  accessibilityLabel={opt}
                >
                  <Text style={[
                    styles.optionText,
                    revealed && (isSelected || isCorrect) && styles.optionTextRevealed,
                  ]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Result
  const { headline, sub } = getSkipMessage(track, finalScore);
  const skipping = finalScore >= (track === 'codr' ? 4 : 3);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.resultInner}>
        <View style={styles.pipBg}>
          <Pip level={level} mood={skipping ? 'celebrate' : 'idle'} size={120} />
        </View>

        <Text style={styles.resultHeadline}>{headline}</Text>
        <Text style={styles.resultSub}>{sub}</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.btnGreen}
          onPress={() => router.replace('/(tabs)')}
          activeOpacity={0.8}
          accessibilityLabel="Go to my learning path"
        >
          <Text style={styles.btnText}>Go to my path →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:  { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { flex: 1 },

  // Intro
  introInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  pipContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#F0FBE4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#3C3C3C',
    textAlign: 'center',
  },
  welcomeSub: {
    fontSize: 15,
    color: '#AFAFAF',
    textAlign: 'center',
    lineHeight: 22,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  pill: {
    backgroundColor: '#F0FBE4',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: '#58CC02',
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#58CC02',
  },

  // Quiz
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 12,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E5E5',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#58CC02',
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#AFAFAF',
    minWidth: 28,
    textAlign: 'right',
  },
  quizMeta: {
    paddingHorizontal: 24,
    marginBottom: 4,
  },
  quizEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: '#AFAFAF',
    letterSpacing: 0.5,
  },
  quizContent: {
    padding: 24,
    paddingTop: 12,
    gap: 16,
  },
  quizQuestion: {
    fontSize: 22,
    fontWeight: '900',
    color: '#3C3C3C',
    lineHeight: 30,
  },
  optionsContainer: { gap: 10 },
  option: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    backgroundColor: '#F7F7F7',
  },
  optionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3C3C3C',
    lineHeight: 20,
  },
  optionCorrect: {
    borderColor: '#58CC02',
    backgroundColor: '#D7FFB8',
  },
  optionWrong: {
    borderColor: '#FF4B4B',
    backgroundColor: '#FFDFE0',
  },
  optionTextRevealed: { fontWeight: '700' },

  // Result
  resultInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  pipBg: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#E8F9D7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  resultHeadline: {
    fontSize: 24,
    fontWeight: '900',
    color: '#3C3C3C',
    textAlign: 'center',
    lineHeight: 30,
  },
  resultSub: {
    fontSize: 15,
    color: '#AFAFAF',
    textAlign: 'center',
    lineHeight: 22,
  },

  // Shared footer
  footer: {
    padding: 24,
    paddingBottom: 24,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  btnGreen: {
    backgroundColor: '#58CC02',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#58A700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  btnSkip: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  btnSkipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#AFAFAF',
  },
});
