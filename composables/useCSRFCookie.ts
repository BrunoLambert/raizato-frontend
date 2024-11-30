export default function () {
  return useState("CSRF", () => {
    const xsrfToken = useCookie('XSRF-TOKEN')
    if (!xsrfToken.value) return ""

    return xsrfToken.value
  })
}