import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchExpense } from '../../redux/createExpenss/createExpense.thunk';
import { useEffect } from 'react';

const CATEGORY_META: Record<string, { icon: string; color: string; bg: string }> = {
  Food:          { icon: 'food-fork-drink',        color: '#FF6B6B', bg: '#fff0f0' },
  Travel:        { icon: 'car-outline',             color: '#4ECDC4', bg: '#f0fffe' },
  Shopping:      { icon: 'shopping-outline',        color: '#A855F7', bg: '#f9f0ff' },
  Bills:         { icon: 'file-document-outline',   color: '#FF9800', bg: '#fff8e1' },
  Entertainment: { icon: 'gamepad-variant-outline', color: '#2196F3', bg: '#e8f4fd' },
  Other:         { icon: 'dots-horizontal',         color: '#888',    bg: '#f5f5f5' },
};

export default function Expense() {
  const dispatch = useDispatch<AppDispatch>();
  const { expenses, loading } = useSelector((state: RootState) => state.expenses);

  useEffect(() => {
    dispatch(fetchExpense());
  }, []);

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <View style={styles.container}>

      {/* Green Header */}
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Total Spent This Month</Text>
        <Text style={styles.headerAmount}>₹ {totalSpent.toLocaleString()}</Text>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="receipt-text-outline" size={18} color="#fff" />
            <Text style={styles.statNum}>{expenses.length}</Text>
            <Text style={styles.statLabel}>Transactions</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="trending-down" size={18} color="#fff" />
            <Text style={styles.statNum}>
              ₹ {expenses.length > 0 ? Math.round(totalSpent / expenses.length).toLocaleString() : 0}
            </Text>
            <Text style={styles.statLabel}>Avg per expense</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="calendar-month-outline" size={18} color="#fff" />
            <Text style={styles.statNum}>
              {new Date().toLocaleString('en-US', { month: 'short' })}
            </Text>
            <Text style={styles.statLabel}>Month</Text>
          </View>
        </View>
      </View>

      {/* Transaction List */}
      {loading ? (
        <ActivityIndicator size="large" color="#34A748" style={{ marginTop: 40 }} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 30 }}
        >
          <Text style={styles.sectionTitle}>All Transactions</Text>

          {expenses.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="receipt-text-outline" size={64} color="#ccc" />
              <Text style={styles.emptyTitle}>No Expenses Yet</Text>
              <Text style={styles.emptySubtitle}>Your transactions will appear here once you add an expense.</Text>
            </View>
          ) : (
            expenses.map(exp => {
              const meta = CATEGORY_META[exp.category] ?? CATEGORY_META['Other'];
              return (
                <View key={exp._id} style={styles.expenseCard}>
                  <View style={[styles.iconBox, { backgroundColor: meta.bg }]}>
                    <MaterialCommunityIcons name={meta.icon as any} size={20} color={meta.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.expDesc}>{exp.description || exp.category}</Text>
                    <Text style={styles.expMeta}>{exp.date} · {exp.paymentMethod}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.expAmount}>- ₹{exp.amount.toLocaleString()}</Text>
                    <View style={[styles.categoryBadge, { backgroundColor: meta.bg }]}>
                      <Text style={[styles.categoryBadgeText, { color: meta.color }]}>{exp.category}</Text>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },

  header: {
    backgroundColor: '#34A748',
    paddingTop: 24,
    paddingBottom: 28,
    paddingHorizontal: 20,
    gap: 4,
  },
  headerLabel: { fontSize: 13, color: '#d4f5da', fontWeight: '500' },
  headerAmount: { fontSize: 36, fontWeight: 'bold', color: '#fff', marginBottom: 16 },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 14,
    padding: 14,
  },
  statBox: { flex: 1, alignItems: 'center', gap: 4 },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.3)' },
  statNum: { fontSize: 15, fontWeight: 'bold', color: '#fff' },
  statLabel: { fontSize: 11, color: '#d4f5da' },

  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111', marginBottom: 4 },

  expenseCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  iconBox: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  expDesc: { fontSize: 14, fontWeight: '600', color: '#111' },
  expMeta: { fontSize: 12, color: '#aaa', marginTop: 2 },
  expAmount: { fontSize: 15, fontWeight: 'bold', color: '#e53935' },
  categoryBadge: { marginTop: 4, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  categoryBadgeText: { fontSize: 10, fontWeight: '600' },

  emptyState: { alignItems: 'center', paddingTop: 60, gap: 12, paddingHorizontal: 24 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#555' },
  emptySubtitle: { fontSize: 13, color: '#aaa', textAlign: 'center', lineHeight: 20 },
});
