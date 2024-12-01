import { defineStore } from 'pinia'
import type { ApiResponseType } from '~/assets/types/common';
import type { GetUsersType, UpdateUserType, UserModel, UserModelPagination } from "~/assets/types/user";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    details: {} as UserModel
  }),
  actions: {
    async getUserDetails(): Promise<boolean> {
      try {
        const api = useApi()
        const response = await api('/user', "GET") as UserModel
        this.details = response
        return Promise.resolve(true)
      } catch (error: any) {
        return Promise.reject(error)
      }
    },
    async updateMyUser(user: UserModel): Promise<UserModel> {
      try {
        const api = useApi()
        const response = await api('/user', "PUT", user) as UpdateUserType
        if (response.success) {
          return Promise.resolve(response.data)
        }
        return Promise.reject("Failed")
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getUsers(page: number = 1): Promise<UserModelPagination> {
      try {
        const api = useApi()
        const { data, success } = await api("/users", "GET", { page }) as GetUsersType;
        if (success) {
          return Promise.resolve(data);
        }
        return Promise.reject("Failed to fetch");
      } catch (error: any) {
        return Promise.reject(error);
      }
    },
    async createUser(user: UserModel): Promise<UserModel> {
      try {
        const api = useApi()
        const response = await api(`/users`, "POST", user) as UpdateUserType
        if (response.success) {
          return Promise.resolve(response.data)
        }
        return Promise.reject("Failed")
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async saveUser(user: UserModel): Promise<UserModel> {
      try {
        const api = useApi()
        const response = await api(`/users/${user.id}`, "PUT", user) as UpdateUserType
        if (response.success) {
          return Promise.resolve(response.data)
        }
        return Promise.reject("Failed")
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async deleteUser(user: UserModel): Promise<boolean> {
      try {
        const api = useApi()
        const response = await api(`/users/${user.id}`, "DELETE") as ApiResponseType
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