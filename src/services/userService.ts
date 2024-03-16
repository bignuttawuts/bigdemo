import axios from 'axios'
import { User } from '../types'

export const createUser = async (user: User) => {
  const data = await axios.post('/.netlify/functions/users', user)
  return data.data
}
