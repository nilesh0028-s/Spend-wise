import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, fetchMe } from '@/redux/auth/auth.thunk';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const handlePending = (state: AuthState) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state: AuthState, action: any) => {
  state.loading = false;
  state.error = action.payload;
};

const handleUserFulfilled = (state: AuthState, action: any) => {
  state.loading = false;
  state.user = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null } as AuthState,
  reducers: {
    logout: (state) => { state.user = null; state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleUserFulfilled)
      .addCase(registerUser.rejected, handleRejected)

      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleUserFulfilled)
      .addCase(loginUser.rejected, handleRejected)

      .addCase(fetchMe.pending, handlePending)
      .addCase(fetchMe.fulfilled, handleUserFulfilled)
      .addCase(fetchMe.rejected, handleRejected);
  },
});

export const {  logout } = authSlice.actions;
export default authSlice.reducer;
