import type { CategoryModel } from "./category"
import type { ApiPaginationType, ApiResponseType } from "./common"
import type { SupplierModel } from "./suppliers"

export interface ProductModel {
  readonly 'id': number,
  name: string,
  code: string,
  description: string,
  cost_price: number,
  selling_price: number,
  minimum_stock: number,
  expiration_date: string,
  category_id: number,
  supplier_id: number,
  category?: CategoryModel,
  supplier?: SupplierModel,
  readonly created_at: string,
  readonly updated_at: string,
  formatted_created_at?: string,
  formatted_updated_at?: string,
  formatted_expiration_date?: string,
}

export interface ProductModelPagination extends ApiPaginationType {
  data: ProductModel[]
}

export interface GetProductType extends ApiResponseType {
  data: ProductModelPagination
}