import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Modal } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { createBudget } from '@/redux/createExpenss/createExpense.thunk';

const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Food', icon: 'food-fork-drink', color: '#FF6B6B', bg: '#fff0f0', percent: 0.25 },
  { id: 2, name: 'Travel', icon: 'car-outline', color: '#4ECDC4', bg: '#f0fffe', percent: 0.15 },
  { id: 3, name: 'Shopping', icon: 'shopping-outline', color: '#A855F7', bg: '#f9f0ff', percent: 0.20 },
  { id: 4, name: 'Bills', icon: 'file-document-outline', color: '#FF9800', bg: '#fff8e1', percent: 0.20 },
  { id: 5, name: 'Entertainment', icon: 'gamepad-variant-outline', color: '#2196F3', bg: '#e8f4fd', percent: 0.10 },
  { id: 6, name: 'Other', icon: 'dots-horizontal', color: '#888', bg: '#f5f5f5', percent: 0.10 },
];

export default function AddExpenss() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.budget);
  const [budget, setBudget] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [showSuccess, setShowSuccess] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const totalBudget = parseFloat(budget) || 0;
  const getAmount = (percent: number) => Math.round(totalBudget * percent);
  const allocated = categories.reduce((sum, c) => sum + getAmount(c.percent), 0);
  const remaining = totalBudget - allocated;

  const updateAmount = (id: number, value: string) => {
    const newAmount = parseFloat(value) || 0;
    const newPercent = totalBudget > 0 ? newAmount / totalBudget : 0;
    setCategories(prev => prev.map(c => c.id === id ? { ...c, percent: newPercent } : c));
  };

  const handleSave = async () => {
    if (!totalBudget) return;
    const payload = categories.map(c => ({
      name: c.name,
      icon: c.icon,
      color: c.color,
      allocatedAmount: getAmount(c.percent),
    }));
    const result = await dispatch(createBudget({ totalBudget, categories: payload }));
    if (createBudget.fulfilled.match(result)) {
      setShowSuccess(true);
      timerRef.current = setTimeout(() => {
        setShowSuccess(false);
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Budget Input */}
        <View style={styles.inputCard}>
          <Text style={styles.sectionTitle}>Allocate Monthly Budget</Text>
          <Text style={styles.sectionSub}>Enter your total budget to auto-split across categories</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.currency}>₹</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
              value={budget}
              onChangeText={setBudget}
            />
          </View>
        </View>

        {/* Category List */}
        <View style={styles.listCard}>
          {categories.map((cat, index) => (
            <View key={cat.id}>
              <View style={styles.row}>
                <View style={[styles.iconBox, { backgroundColor: cat.bg }]}>
                  <MaterialCommunityIcons name={cat.icon as any} size={20} color={cat.color} />
                </View>
                <Text style={styles.catName}>{cat.name}</Text>
                {editingId === cat.id ? (
                  <TextInput
                    style={styles.amountInput}
                    defaultValue={String(getAmount(cat.percent))}
                    onChangeText={(v) => updateAmount(cat.id, v)}
                    keyboardType="numeric"
                    autoFocus
                    onBlur={() => setEditingId(null)}
                  />
                ) : (
                  <Text style={styles.amount}>₹{getAmount(cat.percent).toLocaleString()}</Text>
                )}
                <TouchableOpacity onPress={() => setEditingId(cat.id)}>
                  <MaterialCommunityIcons name="pencil-outline" size={18} color="#aaa" />
                </TouchableOpacity>
              </View>
              {index < categories.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Allocated</Text>
            <Text style={styles.summaryValue}>₹{allocated.toLocaleString()}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Remaining</Text>
            <Text style={[styles.summaryValue, { color: remaining < 0 ? '#E53935' : '#34A748' }]}>
              ₹{remaining.toLocaleString()}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleSave} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Continue</Text>}
        </TouchableOpacity>

        <Modal transparent visible={showSuccess} animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.popup}>
              <MaterialCommunityIcons name="check-circle" size={40} color="#34A748" />
              <Text style={styles.popupText}>Budget created successfully!</Text>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  inputCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', marginBottom: 4 },
  sectionSub: { fontSize: 13, color: '#888', marginBottom: 16 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1.5,
    borderColor: '#34A748', borderRadius: 14, paddingHorizontal: 16,
    height: 60, backgroundColor: '#f9fef9',
  },
  currency: { fontSize: 24, fontWeight: 'bold', color: '#34A748', marginRight: 8 },
  input: { flex: 1, fontSize: 24, fontWeight: 'bold', color: '#111' },
  listCard: { backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 16, marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 12 },
  iconBox: { width: 38, height: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  catName: { flex: 1, fontSize: 15, fontWeight: '500', color: '#111' },
  amount: { fontSize: 15, fontWeight: '600', color: '#111' },
  amountInput: {
    fontSize: 15, fontWeight: '600', color: '#34A748',
    borderBottomWidth: 1, borderBottomColor: '#34A748', minWidth: 70, textAlign: 'right',
  },
  divider: { height: 1, backgroundColor: '#f0f0f0' },
  summaryCard: { backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 16, marginBottom: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14 },
  summaryLabel: { fontSize: 14, color: '#555', fontWeight: '500' },
  summaryValue: { fontSize: 15, fontWeight: 'bold', color: '#111' },
  btn: { backgroundColor: '#34A748', borderRadius: 14, height: 54, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  popup: { backgroundColor: '#fff', borderRadius: 16, padding: 28, alignItems: 'center', gap: 12 },
  popupText: { fontSize: 16, fontWeight: '600', color: '#111' },
});
