import { createAsyncThunk } from '@reduxjs/toolkit';
import { Login, Register } from '@/features/auth/auth.service';

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
