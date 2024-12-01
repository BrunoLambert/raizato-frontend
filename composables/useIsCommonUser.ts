import { UserRole } from "~/assets/types/user"
import { useUserStore } from "~/store/user"

export default function () {
  return useState("isCommonUser", () => {
    const userStore = useUserStore()

    return computed(() => !!userStore.details.role && userStore.details.role === UserRole.COMMON)
  })
}