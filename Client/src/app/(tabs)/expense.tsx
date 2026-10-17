import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DUMMY_EXPENSES = [
  { id: '1', category: 'Food', icon: 'food-fork-drink', color: '#FF6B6B', bg: '#fff0f0', description: 'Lunch at Cafe', amount: 500, date: '12 Aug 2025', paymentMethod: 'UPI' },
  { id: '2', category: 'Travel', icon: 'car-outline', color: '#4ECDC4', bg: '#f0fffe', description: 'Uber to Office', amount: 200, date: '11 Aug 2025', paymentMethod: 'Cash' },
  { id: '3', category: 'Shopping', icon: 'shopping-outline', color: '#A855F7', bg: '#f9f0ff', description: 'Amazon Order', amount: 1500, date: '10 Aug 2025', paymentMethod: 'Credit Card' },
  { id: '4', category: 'Bills', icon: 'file-document-outline', color: '#FF9800', bg: '#fff8e1', description: 'Electricity Bill', amount: 1200, date: '09 Aug 2025', paymentMethod: 'Net Banking' },
  { id: '5', category: 'Entertainment', icon: 'gamepad-variant-outline', color: '#2196F3', bg: '#e8f4fd', description: 'Netflix Subscription', amount: 649, date: '08 Aug 2025', paymentMethod: 'Debit Card' },
  { id: '6', category: 'Food', icon: 'food-fork-drink', color: '#FF6B6B', bg: '#fff0f0', description: 'Dinner with Friends', amount: 850, date: '07 Aug 2025', paymentMethod: 'UPI' },
  { id: '7', category: 'Other', icon: 'dots-horizontal', color: '#888', bg: '#f5f5f5', description: 'Miscellaneous', amount: 300, date: '06 Aug 2025', paymentMethod: 'Cash' },
];

const totalSpent = DUMMY_EXPENSES.reduce((sum, e) => sum + e.amount, 0);

export default function Expense() {
  return (
    <View style={styles.container}>
      {/* List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 10 }}>
        <Text style={styles.sectionTitle}>All Transactions</Text>
        {DUMMY_EXPENSES.map(exp => (
          <View key={exp.id} style={styles.expenseCard}>
            <View style={[styles.iconBox, { backgroundColor: exp.bg }]}>
              <MaterialCommunityIcons name={exp.icon as any} size={20} color={exp.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.expDesc}>{exp.description}</Text>
              <Text style={styles.expMeta}>{exp.date} · {exp.paymentMethod}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.expAmount}>- ₹{exp.amount.toLocaleString()}</Text>
              <Text style={[styles.expCategory, { color: exp.color }]}>{exp.category}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  summaryCard: {
    backgroundColor: '#34A748', margin: 16, borderRadius: 16,
    padding: 20, alignItems: 'center', gap: 4,
  },
  summaryLabel: { fontSize: 13, color: '#d4f5da' },
  summaryAmount: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  summarySub: { fontSize: 12, color: '#d4f5da' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111', marginBottom: 4 },
  expenseCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  iconBox: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  expDesc: { fontSize: 14, fontWeight: '600', color: '#111' },
  expMeta: { fontSize: 12, color: '#aaa', marginTop: 2 },
  expAmount: { fontSize: 15, fontWeight: 'bold', color: '#e53935' },
  expCategory: { fontSize: 11, fontWeight: '600', marginTop: 2 },
});
