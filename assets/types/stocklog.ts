import type { ApiPaginationType, ApiResponseType } from "./common";
import type { StockModel } from "./stock";
import type { UserModel } from "./user";

export enum StocklogType {
  Purchase = 'purchase',
  Returning = 'return',
  Sale = "sale",
  Loss = "loss",
}

export enum ExtendedStocklogType {
  Adjustment = "adjustment",
  Creation = 'creation',
}

export type CompletedStocklogType = StocklogType | ExtendedStocklogType

export const StocklogTypeNames = {
  'purchase': "Compras",
  'return': "Retorno",
  'sale': "Vendas",
  'loss': "Percas",
  'adjustment': "Ajustes",
  'creation': "Criação"
}

export interface StocklogModel {
  readonly id: number,
  quantity: number,
  type: CompletedStocklogType,
  formatted_type?: string,
  user_id: number,
  user?: UserModel,
  stock_id: number,
  stock?: StockModel,
  readonly created_at: string,
  readonly updated_at: string,
  formatted_created_at?: string,
  formatted_updated_at?: string,
  product_id?: number | { id: number, name: string }
}

export interface StocklogkModelPagination extends ApiPaginationType {
  data: StocklogModel[]
}

export interface GetStocklogType extends ApiResponseType {
  data: StocklogkModelPagination
}