import { defineStore } from 'pinia'
import type { UserModel } from "~/assets/types/user";

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
        return true
      } catch (error: any) {
        console.error(error)
        return false
      }
    }
  }
})