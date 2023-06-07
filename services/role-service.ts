import axios from "axios"
import type { Role, RoleForm, RolePagination } from "../utils/interfaces"

export const fetchRoles = async () => {
  const res = await axios.get<Role[]>(`http://localhost:8080/api/roles/all`)
  return res.data
}

export const fetchPaginationRoles = async (page: number) => {
  const res = await axios.get<RolePagination>(`http://localhost:8080/api/roles?page=${page}`)
  return res.data
}

export const createRole = async (dataForm: RoleForm) => {
  const res = await axios.post<Response>(
    `http://localhost:8080/api/roles`,
    dataForm
  )
  return res.data
}
