import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.193.52.173:5000/api/budget';
const EXPENSE_URL = 'http://10.193.52.173:5000/api/expenses';

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

export async function GetBudget() {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Fetching the budget failed';
  }
}

export async function AddExpense(data: {
  category: string;
  amount: number;
  description: string;
  date: string;
  paymentMethod: string;
}) {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(EXPENSE_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Adding expense failed';
  }
}
export async function GetExpense(){
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(EXPENSE_URL, {headers:{Authorization: `Bearer ${token}`}});
    return response.data;
    
  } catch (error:any) {
    throw error.response?.data?.message || 'Fetching Expense failed';
    
  }
}
