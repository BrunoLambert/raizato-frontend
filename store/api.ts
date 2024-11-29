import { defineStore } from 'pinia'

export const useApiStore = defineStore("apiStore", {
  state: () => ({}),
  actions: {
    getCSRFCookie() {
      return $fetch("http://localhost:8000/sanctum/csrf-cookie")
    },
    setBearerToken(token: string): void {
      const authToken = useAuthToken()
      authToken.value = `Bearer ${token}`
    },
    async login(email: string, password: string): Promise<boolean> {
      const api = useApi()
      try {
        const { data } = await api("/login", "POST", { email, password }) as any;
        this.setBearerToken(data.token)
        return true;
      } catch (error: any) {
        console.error(error)
        return false;
      }
    }
  }
})