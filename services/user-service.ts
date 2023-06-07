import axios from "axios"
import type {
    Response,
    UserForm,
    UserPagination
} from "../utils/interfaces"

export const fetchAllUsers = async (page: number, sort: string) => {
  const res = await axios.get<UserPagination>(
    `http://localhost:8080/api/users?page=${page}&sort=${sort}`
  )
  return res.data
}

export const deleteUser = async (id: number) => {
  const res = await axios.delete<Response>(
    `http://localhost:8080/api/users/${id}`
  )
  return res.data
}

export const createUser = async (dataForm: UserForm) => {
  const res = await axios.post<Response>(
    `http://localhost:8080/api/users`,
    dataForm
  )
  return res.data
}

export const updateUser = async (dataForm: UserForm, id: number) => {
  const res = await axios.put<Response>(
    `http://localhost:8080/api/users/${id}`,
    dataForm
  )
  return res.data
}
