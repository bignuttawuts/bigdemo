import axios from 'axios'
import { User } from '../types'

export const createUser = async (user: User) => {
  const data = await axios.post('/.netlify/functions/users', user)
  return data.data
}

export const fetchUserList = async () => {
  const data = await axios.post('/.netlify/functions/user-list')
  return data.data
}

export const deleteUser = async (userId: number) => {
  const data = await axios.delete(`/.netlify/functions/users?userId=${userId}`)
  return data.data
}

export const updateUser = async (user: User) => {
  const data = await axios.put(`/.netlify/functions/users?userId=${user.userId}`, user)
  return data.data
}