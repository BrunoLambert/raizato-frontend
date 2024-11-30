import { defineStore } from 'pinia'
import type { ApiResponseType } from '~/assets/types/common'
import type { UserModel } from '~/assets/types/user'

export const useApiStore = defineStore("apiStore", {
  state: () => ({}),
  actions: {
    async fistCheck(): Promise<boolean> {
      try {
        const api = useApi()
        const checkCookie = useCookie('app_check')
        if (checkCookie.value) return Promise.resolve(true)

        const { data, success } = await api("/startup", "GET") as ApiResponseType
        if (success) {
          checkCookie.value = data
          return Promise.resolve(data as boolean)
        }
        return Promise.reject(false)
      } catch (error: any) {
        return Promise.reject(error)
      }
    },
    async firstRegister(user: UserModel): Promise<boolean> {
      try {
        const checkCookie = useCookie('app_check')
        if (checkCookie.value) {
          const router = useRouter()
          router.push("/")
          return Promise.reject(false)
        }

        const api = useApi()
        const { data, success } = await api("/startup", "POST", user) as ApiResponseType
        if (success) {
          this.setBearerToken(data.token)
        }
        return Promise.resolve(success)
      } catch (error: any) {
        return Promise.reject(error)
      }
    },
    getCSRFCookie() {
      return useFetch("http://localhost:8000/sanctum/csrf-cookie", { credentials: "include" }) as any
    },
    setBearerToken(token?: string): void {
      const authToken = useAuthToken()
      const authCookie = useCookie('auth')

      const toSetToken = token || authCookie.value;
      authToken.value = `Bearer ${toSetToken}`
      authCookie.value = toSetToken
    },
    async login(email: string, password: string): Promise<boolean> {
      try {
        const api = useApi()
        const { data, success } = await api("/login", "POST", { email, password }) as ApiResponseType;
        if (success) {
          this.setBearerToken(data.token)
        }
        return Promise.resolve(success);
      } catch (error: any) {
        return Promise.reject(error)
      }
    },
    async logout(): Promise<boolean> {
      try {
        const api = useApi()
        const response = await api("/logout", "POST") as ApiResponseType
        if (response.success) {
          return Promise.resolve(true)
        }
        return Promise.reject(false)
      } catch (error) {
        return Promise.reject(false)
      }
    }
  }
})