import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

// Définition des interfaces
export interface User {
  username: string;
  email: string;
  token: string;
}

export interface AuthState {
  currentUser: User | undefined;
  isLogged: boolean;
}

const initialState: AuthState = {
  currentUser: undefined,
  isLogged: false,
};

// Thunk pour la création d'un utilisateur
export const register = createAsyncThunk<
  User, // Type de retour
  RegisterPayload, // Type des arguments
  { rejectValue: { error: string } } // Type des rejets
>("auth/register", async (userPayload, thunkAPI) => {
  try {
    const response = await axios.post("https://api.realworld.io/api/users", {
      user: userPayload,
    });
    return response.data.user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      error: error.response?.data?.message || "Une erreur s'est produite",
    });
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLogged = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLogged = true;
      })
      .addCase(register.rejected, (state) => {
        state.isLogged = false;
      });
  },
});

export default authSlice.reducer;
