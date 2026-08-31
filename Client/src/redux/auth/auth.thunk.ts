import { createAsyncThunk } from '@reduxjs/toolkit';
import { Login, Register, GetMe } from '@/redux/auth/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await Register(data.name, data.email, data.password);
      return res.user;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await Login(data.email, data.password);
      return res.user;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const fetchMe = createAsyncThunk(
  'auth/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return rejectWithValue('No token');
      const user = await GetMe(token);
      return user;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
