import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { loginUser } from '@/redux/auth/auth.thunk';
import { RootState, AppDispatch } from '@/redux/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = async () => {
    setSubmitted(true);
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      router.replace('/(tabs)/home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back 👋</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      {submitted && error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.inputWrapper}>
        <MaterialCommunityIcons name="email-outline" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={styles.inputWrapper}>
        <MaterialCommunityIcons name="lock-outline" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <MaterialCommunityIcons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#aaa" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.forgotWrapper}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Link href="/auth/pages/Register" style={styles.signupLink}>Sign Up</Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 32,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    fontSize: 13,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
    height: 52,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#111',
  },
  forgotWrapper: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgot: {
    color: '#34A748',
    fontSize: 13,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#34A748',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
  },
  signupLink: {
    color: '#34A748',
    fontWeight: '600',
  },
});
