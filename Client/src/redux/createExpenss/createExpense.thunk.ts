import { createAsyncThunk } from '@reduxjs/toolkit';
import { SaveBudget } from './createExpense.service';

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
