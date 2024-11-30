import type { ApiPaginationType, ApiResponseType } from "./common"

export const UserRoleNames = {
  admin: 'Administrador',
  manager: 'Gerente',
  common: 'Padrão'
}

export enum UserRole {
  ADMIM = 'admin',
  MANAGER = 'manager',
  COMMON = 'common'
}

export interface UserModel {
  readonly 'id': number,
  'fullname': string,
  'email': string,
  'cellphone': string,
  "role": UserRole,
  readonly "created_at": string,
  readonly "updated_at": string,
  password?: string,
  formatted_created_at?: string,
  formatted_updated_at?: string,
  formatted_role?: string,
  formatted_phone?: string
}

export interface UserModelPagination extends ApiPaginationType {
  data: UserModel[]
}

export interface GetUsersType extends ApiResponseType {
  data: UserModelPagination
}

export interface UpdateUserType extends ApiResponseType {
  data: UserModel
}