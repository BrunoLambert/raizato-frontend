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