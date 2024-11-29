const BASE_URL = "http://localhost:8000/"
type fecthMethod = "POST" | "GET" | "PUT" | "DELETE" | "PATCH"
interface ApiOptions {
  method: fecthMethod,
  headers: any,
  body?: object,
  query?: object
}

export default function () {
  return (prefix: string, method: fecthMethod, data?: object) => {
    const authToken = useAuthToken()
    // const CSRFToken = useCSRFCookie()

    const options: ApiOptions = {
      method,
      headers: {
        'Authorization': authToken.value
      },
    }

    if (method === 'GET') options.query = data || {}
    else options.body = data || {}

    return $fetch(`${BASE_URL}api${prefix}`, options as any)
  }
}