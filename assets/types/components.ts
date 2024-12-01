import type { CategoryModel } from "./category"
import type { ProductModel } from "./products"
import type { StockModel } from "./stock"
import type { StocklogModel } from "./stocklog"
import type { SupplierModel } from "./suppliers"
import type { UserModel } from "./user"

export interface CommonTableColsTitle {
  label: string,
  key: string,
}

export interface CommonTableProps {
  colsTitle: CommonTableColsTitle[],
  data: any[],
  loading?: boolean
}

export interface HomeTabsType {
  key: string,
  label: string,
  table: CommonTableProps
}

export interface CommonInputProps {
  label?: string,
  placeholder?: string,
  disabled?: boolean,
  type?: string,
  readonly?: boolean
}

export interface LayoutNavigationLinks {
  label: string,
  icon: string,
  to: string,
  role?: string[]
}

export interface UserFormProps {
  user?: UserModel,
  lockRole?: boolean
}

export interface CategoryFormProps {
  category?: CategoryModel,
}

export interface SupplierFormProps {
  supplier?: SupplierModel,
}

export interface ProductFormProps {
  product?: ProductModel,
}

export interface StockFormProps {
  stock?: StockModel,
}

export interface StocklogFormProps {
  stocklog?: StocklogModel,
}