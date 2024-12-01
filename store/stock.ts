import { defineStore } from 'pinia'
import type { ApiResponseType } from '~/assets/types/common';
import type { GetStockType, StockModel, StockModelPagination } from '~/assets/types/stock';

export const useStockStore = defineStore("stockStore", {
  state: () => ({
    apiPrefix: "/stocks"
  }),
  actions: {
    async get(page: number = 1): Promise<StockModelPagination> {
      try {
        const api = useApi()
        const { data, success } = await api(this.apiPrefix, "GET", { page }) as GetStockType;
        if (success) {
          return Promise.resolve(data);
        }
        return Promise.reject("Failed to fetch");
      } catch (error: any) {
        return Promise.reject(error);
      }
    },
    // async search(search: string): Promise<StockModel[]> {
    //   try {
    //     if (search.length < 2) return Promise.resolve([]);

    //     const api = useApi()
    //     const { data, success } = await api(`${this.apiPrefix}/search`, "GET", { search }) as ApiResponseType;
    //     if (success) {
    //       return Promise.resolve(data);
    //     }
    //     return Promise.reject("Failed to fetch");
    //   } catch (error: any) {
    //     return Promise.reject(error);
    //   }
    // },
    async create(form: StockModel): Promise<StockModel> {
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
    async save(form: StockModel): Promise<StockModel> {
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
    async delete(form: StockModel): Promise<boolean> {
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