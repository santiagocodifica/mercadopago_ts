export const signupApi = async (name: string, email:string, password1: string, password2: string)=> {
  const res = await fetch(`/api/v1/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password1, password2 })
  })
  const json = await res.json()
  if(!res.ok){
    throw json.error
  }
  return json
}
