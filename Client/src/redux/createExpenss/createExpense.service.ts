import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.204.222.173:5000/api/budget';

export async function SaveBudget(totalBudget: number, categories: any[]) {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(API_URL, { totalBudget, categories }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Budget creation failed';
  }
}
