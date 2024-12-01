import { defineStore } from 'pinia'
import type { ApiResponseType } from '~/assets/types/common';
import type { GetSupplierType, SupplierModel, SupplierModelPagination } from '~/assets/types/suppliers';

export const useSupplierStore = defineStore("supplierStore", {
  state: () => ({
    apiPrefix: "/suppliers"
  }),
  actions: {
    async get(page: number = 1): Promise<SupplierModelPagination> {
      try {
        const api = useApi()
        const { data, success } = await api(this.apiPrefix, "GET", { page }) as GetSupplierType;
        if (success) {
          return Promise.resolve(data);
        }
        return Promise.reject("Failed to fetch");
      } catch (error: any) {
        return Promise.reject(error);
      }
    },
    async search(search: string): Promise<SupplierModel[]> {
      try {
        if (search.length < 2) return Promise.resolve([]);

        const api = useApi()
        const { data, success } = await api(`${this.apiPrefix}/search`, "GET", { search }) as ApiResponseType;
        if (success) {
          return Promise.resolve(data);
        }
        return Promise.reject("Failed to fetch");
      } catch (error: any) {
        return Promise.reject(error);
      }
    },
    async create(form: SupplierModel): Promise<SupplierModel> {
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
    async save(form: SupplierModel): Promise<SupplierModel> {
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
    async delete(form: SupplierModel): Promise<boolean> {
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