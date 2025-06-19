import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi, { type LoginCredentials } from '../../services/api/authApi';

interface IUser {
  id: number;
  name: string;
  account: string;
  factory: string;
  role: string;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: IAuthState = {
  user: (() => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  })(),
  accessToken: localStorage.getItem('accessToken') || null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const { access_token, user } = await authApi.login(credentials);
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      return { access_token, user };
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Login failed!');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialAuth: (state) => {
      const token = localStorage.getItem('accessToken');
      const user = localStorage.getItem('user');
      if (token && user) {
        state.isAuthenticated = true;
        state.accessToken = token;
        state.user = JSON.parse(user) ?? null;
        state.error = null;
      } else {
        state.accessToken = null;
        state.user = null;
        state.isAuthenticated = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.access_token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.user = null;
        state.error = (action.payload as string) || 'Login failed!';
      });
  },
});

export const { initialAuth } = authSlice.actions;

export default authSlice.reducer;
