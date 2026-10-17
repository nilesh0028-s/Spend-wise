import { createAsyncThunk } from '@reduxjs/toolkit';
import { SaveBudget, GetBudget, AddExpense } from './createExpense.service';

export const createBudget = createAsyncThunk(
  'create/budget',
  async (data: { totalBudget: number; categories: any[] }, { rejectWithValue }) => {
    try {
      const res = await SaveBudget(data.totalBudget, data.categories);
      return res;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const fetchBudget = createAsyncThunk(
  'fetch/budget',
  async (_, { rejectWithValue }) => {
    try {
      const res = await GetBudget();
      return res;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const addExpense = createAsyncThunk(
  'expense/add',
  async (
    data: { category: string; amount: number; description: string; date: string; paymentMethod: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await AddExpense(data);
      dispatch(fetchBudget());
      return res;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
