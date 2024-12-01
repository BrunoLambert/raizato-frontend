import type { ApiPaginationType, ApiResponseType } from "./common"

export interface SupplierModel {
  readonly 'id': number,
  'name': string,
  'cnpj': string,
  'contact': string,
  readonly "created_at": string,
  readonly "updated_at": string,
  formatted_created_at?: string,
  formatted_updated_at?: string,
}

export interface SupplierModelPagination extends ApiPaginationType {
  data: SupplierModel[]
}

export interface GetSupplierType extends ApiResponseType {
  data: SupplierModelPagination
}