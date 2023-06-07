export interface User {
  id: number
  name: string
  address: string
  birthday: string
  sex: string
  email: string
  role: {
    role_name: string
  }
}

export interface Role {
  role_name: string
}

export interface UserPagination {
  current_page: number
  total_pages: number
  total_items: number
  data: User[]
}

export interface RolePagination {
  current_page: number
  total_pages: number
  total_items: number
  data: Role[]
}

export interface UserForm {
  name: string
  email: string
  birthday: string
  sex: string
  role_name: string
  address: string
}

export interface RoleForm {
  role_name: string
}

export interface UserState {
  users:
    | UserPagination
    | {
        current_page: number
        total_pages: number
        total_items: number
        data: []
      }
  isLoading: boolean
  sort: string
  page: number
}

export interface RoleState {
  roles:
    | RolePagination
    | {
        current_page: number
        total_pages: number
        total_items: number
        data: []
      }
  isLoading: boolean
  page: number
}

export interface Response {
  status_code: number
  message: string | null
}

export interface EditUserProps {
  user: User
}
