import { createSlice } from '@reduxjs/toolkit';
import { createBudget } from './createExpense.thunk';

interface Category {
  name: string;
  icon: string;
  color: string;
  allocatedAmount: number;
}

interface BudgetState {
  budget: {
    totalBudget: number;
    categories: Category[];
    month: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: BudgetState = {
  budget: null,
  loading: false,
  error: null,
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    clearBudgetError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budget = action.payload;
      })
      .addCase(createBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearBudgetError } = budgetSlice.actions;
export default budgetSlice.reducer;
