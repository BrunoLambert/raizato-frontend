import type { ApiPaginationType, ApiResponseType } from "./common"

export interface CategoryModel {
  readonly 'id': number,
  'name': string,
  readonly "created_at": string,
  readonly "updated_at": string,
  formatted_created_at?: string,
  formatted_updated_at?: string,
}

export interface CategoryModelPagination extends ApiPaginationType {
  data: CategoryModel[]
}

export interface GetCategoriesType extends ApiResponseType {
  data: CategoryModelPagination
}