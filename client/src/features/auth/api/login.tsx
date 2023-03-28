export const loginApi = async (email: string, password: string) => {
  const res = await fetch(`/api/v1/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  const json = await res.json()
  if(!res.ok){
    throw json.error
  }
  return json
}
