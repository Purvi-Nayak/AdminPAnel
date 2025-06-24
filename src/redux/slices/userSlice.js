import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/client';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  isLoggedin: false,
  user: null,
  token: null,
  error: null,
  usersList: [] ,
  admin: null,
 
  
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await api.USERS.getAll();
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.isLoggedin = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedin = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addToUsersList: (state, action) => {
      if (!state.usersList) state.usersList = [];  
      state.usersList.push(action.payload);
    },
    setUsersList: (state, action) => {
      state.usersList = action.payload;
    },
    logout: (state) => {
      state.isLoggedin = false;
      state.user = null;
      state.token = null;
      state.error = null;
    }
  },
extraReducers: (builder) => {
  builder
    .addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.usersList = action.payload;
      state.isLoading = false; 
      state.error = null;
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false; 
    });
}
});

export const { 
  setLoginStatus, 
  setUser, 
  setToken, 
  setError, 
  logout,
  addToUsersList,
  setUsersList
} = userSlice.actions;

export default userSlice.reducer;