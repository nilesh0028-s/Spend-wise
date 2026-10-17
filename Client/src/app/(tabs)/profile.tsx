import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const MENU_ITEMS = [
  { icon: 'account-outline', label: 'Edit Profile', color: '#34A748' },
  { icon: 'bell-outline', label: 'Notifications', color: '#2196F3' },
  { icon: 'shield-lock-outline', label: 'Privacy & Security', color: '#A855F7' },
  { icon: 'help-circle-outline', label: 'Help & Support', color: '#FF9800' },
  { icon: 'information-outline', label: 'About', color: '#4ECDC4' },
];

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 14 }}>

        {/* Avatar & Name */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase() ?? 'U'}</Text>
          </View>
          <Text style={styles.name}>{user?.name ?? 'User'}</Text>
          <Text style={styles.email}>{user?.email ?? 'user@example.com'}</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>12</Text>
            <Text style={styles.statLabel}>Expenses</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statNum}>₹5,199</Text>
            <Text style={styles.statLabel}>Spent</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statNum}>Aug</Text>
            <Text style={styles.statLabel}>Month</Text>
          </View>
        </View>

        {/* Menu Items */}
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity key={item.label} style={[styles.menuItem, index < MENU_ITEMS.length - 1 && styles.menuBorder]}>
              <View style={[styles.menuIcon, { backgroundColor: item.color + '18' }]}>
                <MaterialCommunityIcons name={item.icon as any} size={20} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn}>
          <MaterialCommunityIcons name="logout" size={20} color="#e53935" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  profileCard: { backgroundColor: '#fff', borderRadius: 16, padding: 24, alignItems: 'center', gap: 6 },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#34A748', justifyContent: 'center', alignItems: 'center', marginBottom: 4,
  },
  avatarText: { fontSize: 30, fontWeight: 'bold', color: '#fff' },
  name: { fontSize: 20, fontWeight: 'bold', color: '#111' },
  email: { fontSize: 13, color: '#888' },
  statsRow: { backgroundColor: '#fff', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center' },
  statBox: { flex: 1, alignItems: 'center', gap: 4 },
  statNum: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  statLabel: { fontSize: 12, color: '#888' },
  divider: { width: 1, height: 36, backgroundColor: '#f0f0f0' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111' },
  menuCard: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  menuBorder: { borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  menuIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  menuLabel: { flex: 1, fontSize: 14, color: '#111', fontWeight: '500' },
  logoutBtn: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginBottom: 24,
  },
  logoutText: { fontSize: 15, fontWeight: '600', color: '#e53935' },
});
