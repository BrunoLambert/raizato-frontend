import { defineStore } from 'pinia'
import type { CategoryModel, CategoryModelPagination, GetCategoriesType } from '~/assets/types/category';
import type { ApiResponseType } from '~/assets/types/common';

export const useCategoryStore = defineStore("categoryStore", {
  state: () => ({
    apiPrefix: "/categories"
  }),
  actions: {
    async get(page: number = 1): Promise<CategoryModelPagination> {
      try {
        const api = useApi()
        const { data, success } = await api(this.apiPrefix, "GET", { page }) as GetCategoriesType;
        if (success) {
          return Promise.resolve(data);
        }
        return Promise.reject("Failed to fetch");
      } catch (error: any) {
        return Promise.reject(error);
      }
    },
    async search(search: string): Promise<CategoryModel[]> {
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
    async create(form: CategoryModel): Promise<CategoryModel> {
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
    async save(form: CategoryModel): Promise<CategoryModel> {
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
    async delete(form: CategoryModel): Promise<boolean> {
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