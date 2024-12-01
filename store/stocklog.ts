import { defineStore } from 'pinia'
import type { ApiResponseType } from '~/assets/types/common';
import type { GetStocklogType, StocklogkModelPagination, StocklogModel } from '~/assets/types/stocklog';

export const useStocklogStore = defineStore("stocklogStore", {
  state: () => ({
    apiPrefix: "/stocks/logs"
  }),
  actions: {
    async get(page: number = 1): Promise<StocklogkModelPagination> {
      try {
        const api = useApi()
        const { data, success } = await api(this.apiPrefix, "GET", { page }) as GetStocklogType;
        if (success) {
          return Promise.resolve(data);
        }
        return Promise.reject("Failed to fetch");
      } catch (error: any) {
        return Promise.reject(error);
      }
    },
    async create(form: StocklogModel): Promise<StocklogModel> {
      try {
        const api = useApi()
        const { data, success } = await api(this.apiPrefix, "POST", form) as ApiResponseType
        if (success) {
          return Promise.resolve(data)
        }
        return Promise.reject("Failed")
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async save(form: StocklogModel): Promise<StocklogModel> {
      try {
        const api = useApi()
        const { data, success } = await api(`${this.apiPrefix}/${form.id}`, "PUT", form) as ApiResponseType
        if (success) {
          return Promise.resolve(data)
        }
        return Promise.reject("Failed")
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async delete(form: StocklogModel): Promise<boolean> {
      try {
        const api = useApi()
        const response = await api(`${this.apiPrefix}/${form.id}`, "DELETE") as ApiResponseType
        if (response.success) {
          return Promise.resolve(true)
        }
        return Promise.resolve(false)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },
})