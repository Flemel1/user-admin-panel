import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUser, deleteUser, fetchAllUsers, updateUser } from "../services/user-service"
import type {
  Response,
  UserForm,
  UserPagination,
  UserState,
} from "../utils/interfaces"

export const fetchUsers = createAsyncThunk<
  UserPagination,
  { page: number; sort: string }
>("users/fetchUsers", async ({ page, sort }, { rejectWithValue }) => {
  try {
    const response = await fetchAllUsers(page, sort)
    return response
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const deleteUserById = createAsyncThunk<Response, { id: number }>(
  "users/deleteUserById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await deleteUser(id)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const createdUser = createAsyncThunk<Response, UserForm>(
  "users/createUser",
  async (dataForm, { rejectWithValue }) => {
    try {
      const response = await createUser(dataForm)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const updatedUser = createAsyncThunk<
  Response,
  { id: number; dataForm: UserForm }
>("users/updateUser", async ({ dataForm, id }, { rejectWithValue }) => {
  try {
    const response = await updateUser(dataForm, id)
    return response
  } catch (error) {
    return rejectWithValue(error)
  }
})

const initialState: UserState = {
  users: {
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    data: [],
  },
  page: 1,
  sort: "asc",
  isLoading: true,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
      state.users = {
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        data: [],
      }
    },
    changeSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload
      state.users = {
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        data: [],
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createdUser.fulfilled, (state, action) => {
      state.isLoading = true
      state.users = {
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        data: [],
      }
    })
    builder.addCase(createdUser.rejected, (state) => {
      if (state.isLoading === false) {
        state.isLoading = true
      }
    })
    builder.addCase(updatedUser.fulfilled, (state, action) => {
      state.isLoading = true
      state.users = {
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        data: [],
      }
    })
    builder.addCase(updatedUser.rejected, (state) => {
      if (state.isLoading === false) {
        state.isLoading = true
      }
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      if (state.isLoading === true || state.users.data.length === 0) {
        state.isLoading = false
        state.users = action.payload
      }
    })
    builder.addCase(fetchUsers.rejected, (state) => {
      state.isLoading = true
      state.users = {
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        data: [],
      }
    })
    builder.addCase(deleteUserById.fulfilled, (state, action) => {
      state.isLoading = true
      state.users = {
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        data: [],
      }
    })
    builder.addCase(deleteUserById.rejected, (state) => {
      if (state.isLoading === false) {
        state.isLoading = true
      }
    })
  },
})

export const { changePage, changeSort } = userSlice.actions

export default userSlice.reducer
