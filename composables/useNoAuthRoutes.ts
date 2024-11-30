export default function () {
  return useState("noAuthRoutes", () => {
    return ['index', "startup"]
  })
}