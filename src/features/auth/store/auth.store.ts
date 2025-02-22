import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  token: string;
}

export interface LoginResponse {
  token: string;
}

export interface ErrorResponse {
  error: string;
}

export interface AuthState {
  currentUser: RegisterResponse | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  currentUser: undefined,
  isAuthenticated: false,
  isLoading: false,
};

export const register = createAsyncThunk<
  RegisterResponse, // Type de retour
  RegisterPayload, // Type des arguments
  { rejectValue: { error: string } } // Type des rejets
>("auth/register", async (userPayload, thunkAPI) => {
  try {
    const response = await axios.post(
      "https://reqres.in/api/register",
      userPayload
    );

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      error: error?.response?.data?.message || "Une erreur s'est produite",
    });
  }
});

export const login = createAsyncThunk<
  LoginResponse, // Type de retour
  RegisterPayload, // Type des arguments
  { rejectValue: { error: string } } // Type des rejets
>("auth/login", async (userPayload, thunkAPI) => {
  try {
    const response = await axios.post(
      "https://reqres.in/api/login",
      userPayload
    );

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      error: error?.response?.data?.message || "Une erreur s'est produite",
    });
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("tokenReqres");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("tokenReqres", action.payload.token);
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.currentUser = undefined;
      });
  },
});

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default authSlice.reducer;
