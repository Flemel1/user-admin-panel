import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createRole, fetchPaginationRoles } from "../services/role-service"
import type { RoleForm, RolePagination, RoleState } from "../utils/interfaces"

export const fetchRoles = createAsyncThunk<RolePagination, number>(
  "roles/fetchRoles",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await fetchPaginationRoles(page)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const createdRole = createAsyncThunk<Response, RoleForm>(
  "users/createUser",
  async (dataForm, { rejectWithValue }) => {
    try {
      const response = await createRole(dataForm)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const initialState: RoleState = {
  roles: {
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    data: [],
  },
  page: 1,
  isLoading: true,
}

export const userSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
      state.roles = {
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        data: [],
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createdRole.fulfilled, (state, action) => {
      state.isLoading = true
      state.roles = {
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        data: [],
      }
    })
    builder.addCase(createdRole.rejected, (state) => {
      if (state.isLoading === false) {
        state.isLoading = true
      }
    })
    builder.addCase(fetchRoles.fulfilled, (state, action) => {
      if (state.isLoading === true || state.roles.data.length === 0) {
        state.isLoading = false
        state.roles = action.payload
      }
    })
    builder.addCase(fetchRoles.rejected, (state) => {
      state.isLoading = true
      state.roles = {
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        data: [],
      }
    })
  },
})

export const { changePage } = userSlice.actions

export default userSlice.reducer
