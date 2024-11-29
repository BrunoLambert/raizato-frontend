import type { ProductModel } from "./product";

export interface StockModel {
  quantity: number,
  product_id: number,
  "created_at": string,
  "updated_at": string,
  product: ProductModel
}