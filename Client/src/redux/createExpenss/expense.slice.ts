import { createSlice } from '@reduxjs/toolkit';
import { addExpense, fetchExpense } from './createExpense.thunk';

interface Expense {
  category: string;
  amount: number;
  description: string;
  date: string;
  paymentMethod: string;
  
}

interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpense.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchExpense.fulfilled, (state, action) => { state.loading = false; state.expenses = action.payload; })
      .addCase(fetchExpense.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export default expenseSlice.reducer;
