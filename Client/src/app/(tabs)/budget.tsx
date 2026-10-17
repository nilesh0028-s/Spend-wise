import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DUMMY_BUDGET = {
  totalBudget: 50000,
  totalSpent: 5199,
  month: 'August 2025',
  categories: [
    { name: 'Food', icon: 'food-fork-drink', color: '#FF6B6B', bg: '#fff0f0', allocatedAmount: 10000, spentAmount: 1350 },
    { name: 'Travel', icon: 'car-outline', color: '#4ECDC4', bg: '#f0fffe', allocatedAmount: 5000, spentAmount: 200 },
    { name: 'Shopping', icon: 'shopping-outline', color: '#A855F7', bg: '#f9f0ff', allocatedAmount: 15000, spentAmount: 1500 },
    { name: 'Bills', icon: 'file-document-outline', color: '#FF9800', bg: '#fff8e1', allocatedAmount: 8000, spentAmount: 1200 },
    { name: 'Entertainment', icon: 'gamepad-variant-outline', color: '#2196F3', bg: '#e8f4fd', allocatedAmount: 5000, spentAmount: 649 },
    { name: 'Other', icon: 'dots-horizontal', color: '#888', bg: '#f5f5f5', allocatedAmount: 7000, spentAmount: 300 },
  ],
};

export default function Budget() {
  const remaining = DUMMY_BUDGET.totalBudget - DUMMY_BUDGET.totalSpent;
  const overallPercent = (DUMMY_BUDGET.totalSpent / DUMMY_BUDGET.totalBudget) * 100;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 14 }}>

        {/* Overall Card */}
        <View style={styles.overallCard}>
          <Text style={styles.overallMonth}>{DUMMY_BUDGET.month}</Text>
          <View style={styles.overallRow}>
            <View>
              <Text style={styles.overallLabel}>Total Budget</Text>
              <Text style={styles.overallAmount}>₹ {DUMMY_BUDGET.totalBudget.toLocaleString()}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.overallLabel}>Remaining</Text>
              <Text style={[styles.overallAmount, { color: '#34A748' }]}>₹ {remaining.toLocaleString()}</Text>
            </View>
          </View>
          {/* Overall Progress */}
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${Math.min(overallPercent, 100)}%`, backgroundColor: '#34A748' }]} />
          </View>
          <Text style={styles.overallSub}>₹ {DUMMY_BUDGET.totalSpent.toLocaleString()} spent of ₹ {DUMMY_BUDGET.totalBudget.toLocaleString()}</Text>
        </View>

        {/* Category Breakdown */}
        <Text style={styles.sectionTitle}>Category Breakdown</Text>
        {DUMMY_BUDGET.categories.map(cat => {
          const percent = (cat.spentAmount / cat.allocatedAmount) * 100;
          const catRemaining = cat.allocatedAmount - cat.spentAmount;
          return (
            <View key={cat.name} style={styles.catCard}>
              <View style={styles.catHeader}>
                <View style={[styles.iconBox, { backgroundColor: cat.bg }]}>
                  <MaterialCommunityIcons name={cat.icon as any} size={20} color={cat.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.catRow}>
                    <Text style={styles.catName}>{cat.name}</Text>
                    <Text style={styles.catAllocated}>₹ {cat.allocatedAmount.toLocaleString()}</Text>
                  </View>
                  <View style={styles.progressBg}>
                    <View style={[styles.progressFill, { width: `${Math.min(percent, 100)}%`, backgroundColor: cat.color }]} />
                  </View>
                  <View style={styles.catRow}>
                    <Text style={styles.catSpent}>₹ {cat.spentAmount.toLocaleString()} spent</Text>
                    <Text style={[styles.catRemaining, { color: catRemaining < 0 ? '#e53935' : '#34A748' }]}>
                      ₹ {Math.abs(catRemaining).toLocaleString()} {catRemaining < 0 ? 'over' : 'left'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  overallCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, gap: 12 },
  overallMonth: { fontSize: 13, color: '#888', fontWeight: '500' },
  overallRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  overallLabel: { fontSize: 12, color: '#888', marginBottom: 4 },
  overallAmount: { fontSize: 22, fontWeight: 'bold', color: '#111' },
  overallSub: { fontSize: 12, color: '#aaa' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111' },
  catCard: { backgroundColor: '#fff', borderRadius: 14, padding: 14 },
  catHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  catRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  catName: { fontSize: 14, fontWeight: '600', color: '#111' },
  catAllocated: { fontSize: 14, fontWeight: 'bold', color: '#111' },
  catSpent: { fontSize: 12, color: '#aaa', marginTop: 4 },
  catRemaining: { fontSize: 12, fontWeight: '600', marginTop: 4 },
  progressBg: { height: 6, backgroundColor: '#f0f0f0', borderRadius: 4, marginTop: 8, marginBottom: 2 },
  progressFill: { height: 6, borderRadius: 4 },
});
