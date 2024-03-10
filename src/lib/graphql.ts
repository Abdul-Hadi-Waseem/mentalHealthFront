import { createClient } from "urql"
import { getToken } from "../utils"

const url = "http://139.99.28.47:3000/graphql"
// const url = "http://localhost:3000/graphql"

export const client = createClient({
  url,
  fetchOptions: () => {
    const token = getToken()
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    }
  },
})
