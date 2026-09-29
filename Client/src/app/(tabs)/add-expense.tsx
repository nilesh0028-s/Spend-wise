import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CATEGORIES = [
  { name: 'Food', icon: 'food-fork-drink', color: '#FF6B6B', bg: '#fff0f0' },
  { name: 'Travel', icon: 'car-outline', color: '#4ECDC4', bg: '#f0fffe' },
  { name: 'Shopping', icon: 'shopping-outline', color: '#A855F7', bg: '#f9f0ff' },
  { name: 'Bills', icon: 'file-document-outline', color: '#FF9800', bg: '#fff8e1' },
  { name: 'Entertainment', icon: 'gamepad-variant-outline', color: '#2196F3', bg: '#e8f4fd' },
  { name: 'Other', icon: 'dots-horizontal', color: '#888', bg: '#f5f5f5' },
];
const PAYMENT_METHODS = ['UPI', 'Cash', 'Credit Card', 'Debit Card', 'Net Banking'];

export default function AddExpense() {
  const [activeTab, setActiveTab] = useState<'manual' | 'scan'>('manual');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [selectedPayment, setSelectedPayment] = useState('UPI');
  const [showCategory, setShowCategory] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Toggle */}
        <View style={styles.toggleWrapper}>
          <TouchableOpacity
            style={[styles.toggleBtn, activeTab === 'manual' && styles.toggleActive]}
            onPress={() => setActiveTab('manual')}
          >
            <Text style={[styles.toggleText, activeTab === 'manual' && styles.toggleTextActive]}>Manual Entry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, activeTab === 'scan' && styles.toggleActive]}
            onPress={() => setActiveTab('scan')}
          >
            <Text style={[styles.toggleText, activeTab === 'scan' && styles.toggleTextActive]}>Scan Receipt</Text>
          </TouchableOpacity>
        </View>

        {/* Amount */}
        <Text style={styles.label}>Amount</Text>
        <View style={styles.inputBox}>
          <Text style={styles.rupee}>₹</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        {/* Category */}
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity style={styles.inputBox} onPress={() => { setShowCategory(!showCategory); setShowPayment(false); }}>
          <View style={[styles.catIconBox, { backgroundColor: selectedCategory.bg }]}>
            <MaterialCommunityIcons name={selectedCategory.icon as any} size={16} color={selectedCategory.color} />
          </View>
          <Text style={styles.dropdownText}>{selectedCategory.name}</Text>
          <MaterialCommunityIcons name="chevron-down" size={20} color="#888" />
        </TouchableOpacity>
        {showCategory && (
          <View style={styles.dropdown}>
            {CATEGORIES.map(c => (
              <TouchableOpacity key={c.name} style={styles.dropdownItem} onPress={() => { setSelectedCategory(c); setShowCategory(false); }}>
                <View style={[styles.catIconBox, { backgroundColor: c.bg }]}>
                  <MaterialCommunityIcons name={c.icon as any} size={16} color={c.color} />
                </View>
                <Text style={[styles.dropdownItemText, selectedCategory.name === c.name && { color: '#34A748', fontWeight: '600' }]}>{c.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Description */}
        <Text style={styles.label}>Description (Optional)</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="e.g. Lunch at Cafe"
            placeholderTextColor="#ccc"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Date */}
        <Text style={styles.label}>Date</Text>
        <View style={styles.inputBox}>
          <MaterialCommunityIcons name="calendar-outline" size={18} color="#888" style={{ marginRight: 8 }} />
          <Text style={styles.dropdownText}>{today}</Text>
        </View>

        {/* Payment Method */}
        <Text style={styles.label}>Payment Method</Text>
        <TouchableOpacity style={styles.inputBox} onPress={() => { setShowPayment(!showPayment); setShowCategory(false); }}>
          <Text style={styles.dropdownText}>{selectedPayment}</Text>
          <MaterialCommunityIcons name="chevron-down" size={20} color="#888" />
        </TouchableOpacity>
        {showPayment && (
          <View style={styles.dropdown}>
            {PAYMENT_METHODS.map(p => (
              <TouchableOpacity key={p} style={styles.dropdownItem} onPress={() => { setSelectedPayment(p); setShowPayment(false); }}>
                <Text style={[styles.dropdownItemText, selectedPayment === p && { color: '#34A748', fontWeight: '600' }]}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Button */}
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Add Expense</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 40 },
  toggleWrapper: {
    flexDirection: 'row', backgroundColor: '#f0f0f0',
    borderRadius: 50, padding: 4, marginBottom: 24,
  },
  toggleBtn: { flex: 1, paddingVertical: 10, borderRadius: 50, alignItems: 'center' },
  toggleActive: { backgroundColor: '#34A748', elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
  toggleText: { fontSize: 14, color: '#888', fontWeight: '500' },
  toggleTextActive: { color: '#fff', fontWeight: '600' },
  label: { fontSize: 13, color: '#555', marginBottom: 8, marginTop: 16 },
  inputBox: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#e0e0e0',
    borderRadius: 10, paddingHorizontal: 14, height: 50,
  },
  rupee: { fontSize: 16, color: '#555', marginRight: 6 },
  input: { flex: 1, fontSize: 15, color: '#111' },
  dropdownText: { flex: 1, fontSize: 15, color: '#111' },
  dropdown: {
    borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 10,
    marginTop: 4, backgroundColor: '#fff', overflow: 'hidden',
  },
  dropdownItem: { paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', flexDirection: 'row', alignItems: 'center', gap: 10 },
  dropdownItemText: { fontSize: 14, color: '#333' },
  catIconBox: { width: 28, height: 28, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  btn: {
    backgroundColor: '#34A748', borderRadius: 12,
    height: 52, justifyContent: 'center', alignItems: 'center',
    marginTop: 32, marginBottom: 24,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
