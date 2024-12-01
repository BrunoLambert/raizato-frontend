import type { ApiPaginationType, ApiResponseType } from "./common";
import type { ProductModel } from "./products";

export interface StockModel {
  readonly id: number,
  quantity: number,
  product_id: number,
  product?: ProductModel
  readonly created_at: string,
  readonly updated_at: string,
  formatted_created_at?: string,
  formatted_updated_at?: string,
}

export interface StockModelPagination extends ApiPaginationType {
  data: StockModel[]
}

export interface GetStockType extends ApiResponseType {
  data: StockModelPagination
}