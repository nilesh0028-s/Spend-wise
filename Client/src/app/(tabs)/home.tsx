import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { fetchBudget } from '@/redux/createExpenss/createExpense.thunk';
const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Food', icon: 'food-fork-drink', color: '#FF6B6B', bg: '#fff0f0', percent: 0.25 },
  { id: 2, name: 'Travel', icon: 'car-outline', color: '#4ECDC4', bg: '#f0fffe', percent: 0.15 },
  { id: 3, name: 'Shopping', icon: 'shopping-outline', color: '#A855F7', bg: '#f9f0ff', percent: 0.20 },
  { id: 4, name: 'Bills', icon: 'file-document-outline', color: '#FF9800', bg: '#fff8e1', percent: 0.20 },
  { id: 5, name: 'Entertainment', icon: 'gamepad-variant-outline', color: '#2196F3', bg: '#e8f4fd', percent: 0.10 },
  { id: 6, name: 'Other', icon: 'dots-horizontal', color: '#888', bg: '#f5f5f5', percent: 0.10 },
];

export default function Home() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { budget } = useSelector((state: RootState) => state.budget);
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBudget());
  }, []);

const monthName = budget?.month
  ? new Date(budget.month + "-01").toLocaleString('en-US', { month: 'long' })
  : '';
  return (
    <View style={styles.container}>
      {/* Top Half */}
      <View style={styles.topSection}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name ?? 'User'} 👋</Text>
             <Text style={styles.submonth}>{monthName} budget</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn} onPress={() => router.push('/features/AddExpenss')}>
            <MaterialCommunityIcons name="note-edit-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Total Balance Card */}
        <View style={styles.balanceCard}>
          <View>
            <Text style={styles.balanceLabel}>Remaining Balance</Text>
            <Text style={styles.balanceAmount}>₹ 45,000.00</Text>
          </View>
          <MaterialCommunityIcons name="wallet" size={40} color="#34A748" />
        </View>

        {/* Income & Expense Row */}
        <View style={styles.row}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Budget</Text>
            <Text style={styles.statAmount}>₹ {budget?.totalBudget}</Text>
            <Text style={styles.statSub}>This Month</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Spend</Text>
            <Text style={[styles.statAmount]}>₹ 15,000.00</Text>
            <Text style={styles.statSub}>This Month</Text>
          </View>
        </View>
      </View>

      {/* Bottom Half - Categories */}
      <ScrollView style={styles.bottomSection} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 10 }}>
        {budget?.categories?.map((cat: any) => (
          <View key={cat.name} style={styles.catCard}>
            <View style={[styles.iconBox, { backgroundColor: cat.color + '20' }]}>
              <MaterialCommunityIcons name={cat.icon as any} size={20} color={cat.color} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.catName}>{cat.name}</Text>
                <Text style={styles.catAmount}>₹ {cat.allocatedAmount?.toLocaleString()}</Text>
              </View>
              <View style={styles.progressBg}>
                <View style={[styles.progressFill, {
                  width: `${Math.min(((cat.spentAmount ?? 0) / cat.allocatedAmount) * 100, 100)}%`,
                  backgroundColor: cat.color,
                }]} />
              </View>
              <Text style={styles.catSub}>₹ {cat.spentAmount ?? 0} spent</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topSection: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
  },
  submonth:{
    fontSize: 14,
    color: '#302e2e',
    marginTop: 3,
  },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceCard: {
    backgroundColor: '#f0faf2',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 6,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 16,
    gap: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#2b2929',
  },
  statAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  statSub: {
    fontSize: 11,
    color: '#aaa',
  },
  bottomSection: {
    flex: 1,
  },
  catCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  catSub: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 2,
  },
  catAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111',
  },
  progressBg: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 4,
  },
  progressFill: {
    height: 6,
    borderRadius: 4,
  },
});
