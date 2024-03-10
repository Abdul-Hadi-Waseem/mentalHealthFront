import Cookies from "js-cookie"

export function getToken(): string {
  if (typeof window !== "undefined") {
    return Cookies.get("token") || ""
  } else {
    return ""
  }
}
