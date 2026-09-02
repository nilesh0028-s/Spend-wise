import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { fetchBudget } from '@/redux/createExpenss/createExpense.thunk';

export default function Home() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { budget } = useSelector((state: RootState) => state.budget);
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBudget());
  }, []);

const date = new Date(budget?.month + "-01");

// Get the full month name (e.g., "September")
const monthName = date.toLocaleString('en-US', { month: 'long' });
  return (
    <View style={styles.container}>
      <StatusBar style="light"/>

      {/* Top Half */}
      <View style={styles.topSection}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name ?? 'User'} 👋</Text>
            <Text style={styles.subtext}>Here's your financial overview</Text>
             <Text style={styles.submonth}>{monthName} budget</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn} onPress={() => router.push('/features/AddExpenss')}>
            <MaterialCommunityIcons name="note-edit-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Total Balance Card */}
        <View style={styles.balanceCard}>
          <View>
            <Text style={styles.balanceLabel}>Total Balance</Text>
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

      {/* Bottom Half - blank for now */}
      <View style={styles.bottomSection} />
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
  subtext: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
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
});
