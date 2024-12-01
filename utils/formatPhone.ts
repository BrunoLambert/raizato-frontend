export default function (phone: string) {
  switch (phone.length) {
    case 8:
      return `${phone.substring(0, 4)}-${phone.substring(4)}`
    case 9:
      return `${phone.substring(0, 5)}-${phone.substring(5)}`
    case 11:
      return `${phone.substring(0, 2)} ${phone.substring(2, 7)}-${phone.substring(7)}`
    case 13:
      return `+${phone.substring(0, 2)} ${phone.substring(2, 4)} ${phone.substring(4, 9)}-${phone.substring(9)}`
    case 14:
      return `+${phone.substring(0, 3)} ${phone.substring(3, 5)} ${phone.substring(5, 10)}-${phone.substring(10)}`
    default:
      return phone
  }
}