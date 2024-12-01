export default function (dateString: string) {
  const date = new Date(dateString)
  if (!date) {
    return dateString
  }
  return new Date(dateString).toLocaleDateString()
}