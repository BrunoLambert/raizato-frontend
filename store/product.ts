import { defineStore } from 'pinia'
import type { ApiResponseType } from '~/assets/types/common';
import type { ProductModel } from '~/assets/types/products';
import type { GetProductType, ProductModelPagination } from '~/assets/types/products';

export const useProductStore = defineStore("productStore", {
  state: () => ({
    apiPrefix: "/products"
  }),
  actions: {
    async get(page: number = 1): Promise<ProductModelPagination> {
      try {
        const api = useApi()
        const { data, success } = await api(this.apiPrefix, "GET", { page }) as GetProductType;
        if (success) {
          return Promise.resolve(data);
        }
        return Promise.reject("Failed to fetch");
      } catch (error: any) {
        return Promise.reject(error);
      }
    },
    async search(search: string, completed: boolean = false): Promise<ProductModel[]> {
      try {
        if (search.length < 2) return Promise.resolve([]);

        const api = useApi()
        const { data, success } = await api(`${this.apiPrefix}/search`, "GET", { search, completed }) as ApiResponseType;
        if (success) {
          return Promise.resolve(data);
        }
        return Promise.reject("Failed to fetch");
      } catch (error: any) {
        return Promise.reject(error);
      }
    },
    async create(form: ProductModel): Promise<ProductModel> {
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
    async save(form: ProductModel): Promise<ProductModel> {
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
    async delete(form: ProductModel): Promise<boolean> {
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