export enum UserRole {
  ADMIM = 'admin',
  MANAGER = 'manager',
  COMMON = 'common'
}

export interface UserModel {
  'fullname': string,
  'email': string,
  'cellphone': string,
  "role": UserRole,
  "created_at": string,
  "updated_at": string
}