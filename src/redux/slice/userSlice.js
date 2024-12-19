import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/users",
});
const loginapi = axios.create({
  baseURL: "http://localhost:3000/api/auth",
});

const initialState = {
  topUsers: [],
  userssArr: [],
  inActiveUsers: [],
  totalRegisteredUsers: 0,
  totalVerifiedUsers: 0,
  isLoadingArr: false,
  selectedusers: null,
  isLoadingSelected: false,
};
export const Login = createAsyncThunk("auth/login", async (formData) => {
  try {
    const res = await loginapi.post("/login", formData);
    return res.data.token;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
});
export const getUsers = createAsyncThunk("users/getAllUsers", async () => {
  try {
    const res = await api.get("/getAllUsers", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res.data.users);
    return {
      users: res.data.users,
      totalRegisteredUsers: res.data.totalRegisteredUsers,
      totalVerifiedUsers: res.data.totalVerifiedUsers,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
});

export const getInActiveUsers = createAsyncThunk(
  "users/inActiveUser",
  async () => {
    try {
      const res = await api.get("/inActiveUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data.inActive;
    } catch (error) {
      console.error("Error fetching userss:", error);
      throw error;
    }
  }
);

export const getTopFreq = createAsyncThunk("users/getFrequency", async () => {
  try {
    const res = await api.get("/getFrequency", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res.data);
    return res.data.topUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
});

export const addusers = createAsyncThunk("users/addUser", async (users) => {
  try {
    console.log("Request URL:", `${api.defaults.baseURL}/addUsers`);
    const res = await api.post("/addUsers", users);
    return res.data;
  } catch (error) {
    console.error("Error adding users:", error);
    throw error;
  }
});

export const updateusers = createAsyncThunk(
  "users/updateUser",
  async (updatedUser) => {
    try {
      const res = await api.patch(
        `/updateUser/${updatedUser.id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data; // Returning the updated user data from the server
    } catch (error) {
      console.error("Error updating users:", error);
      throw error;
    }
  }
);

export const getusersById = createAsyncThunk(
  "users/getUserById",
  async (id) => {
    try {
      const res = await api.get(`/getUserById/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  }
);

export const deleteusers = createAsyncThunk("users/deleteUser", async (id) => {
  try {
    await api.delete(`/deleteUser/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return id;
  } catch (error) {
    console.error("Error deleting users:", error);
    throw error;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    removeSelectedusers(state) {
      state.selectedusers = null;
      state.isLoadingSelected = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoadingArr = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoadingArr = false;
        state.userssArr = action.payload.users;
        state.totalRegisteredUsers = action.payload.totalRegisteredUsers;
        state.totalVerifiedUsers = action.payload.totalVerifiedUsers;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isLoadingArr = false;
      })
      .addCase(getTopFreq.fulfilled, (state, action) => {
        state.isLoadingArr = false;
        state.topUsers = action.payload;
      })
      
      .addCase(getTopFreq.rejected, (state) => {
        state.isLoadingArr = false;
      })
      .addCase(getInActiveUsers.fulfilled, (state, action) => {
        state.isLoadingArr = false;
        state.inActiveUsers = action.payload;
      })
      .addCase(getInActiveUsers.rejected, (state) => {
        state.isLoadingArr = false;
      })
      .addCase(addusers.fulfilled, (state, action) => {
        state.userssArr.push(action.payload);
      })
      .addCase(updateusers.fulfilled, (state, action) => {
        state.userssArr = state.userssArr.map((m) =>
          m.id === action.payload.id ? { ...m, ...action.payload } : m
        );
      })
      .addCase(getusersById.pending, (state) => {
        state.isLoadingSelected = true;
      })
      .addCase(getusersById.fulfilled, (state, action) => {
        state.isLoadingSelected = false;
        state.selectedusers = action.payload;
      })
      .addCase(deleteusers.fulfilled, (state, action) => {
        state.userssArr = state.userssArr.filter(
          (m) => m.id !== action.payload
        );
      });
  },
});

export const { removeSelectedUsers } = usersSlice.actions;

export default usersSlice.reducer;
