import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.204.222.173:5000/api/auth';

export async function Register(name: string, email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    await AsyncStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Registration failed';
  }
}

export async function Login(email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Login failed';
  }
}

export async function Logout() {
  await AsyncStorage.removeItem('token');
}
