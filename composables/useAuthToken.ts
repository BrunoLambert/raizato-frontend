export default function () {
  return useState("authToken", () => {
    const authCookie = useCookie('auth')
    if (!authCookie.value) return ""

    return `Bearer ${authCookie.value}`
  })
}