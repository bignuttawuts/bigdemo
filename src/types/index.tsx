export interface TransferResponse<T> {
  data: T
}

export interface User {
  userId: string
  firstname: string
  lastname: string
  email: string
  role: string
  lastLogin: number
  joinedDate: number
}
