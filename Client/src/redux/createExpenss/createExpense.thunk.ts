import { createAsyncThunk } from '@reduxjs/toolkit';
import { SaveBudget,GetBudget } from './createExpense.service';

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
export const fetchBudget=createAsyncThunk(
  'fetch/budget',
  async (_, { rejectWithValue }) => {
    try {
      const res = await GetBudget();
      return res;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
)