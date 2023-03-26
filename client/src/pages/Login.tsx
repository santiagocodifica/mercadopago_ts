import { LoginForm } from "../features/auth"

const Login = () => {
  return(
    <div className="p-4 md:p-8 mt-40 md:grid md:grid-cols-2">
      <h2 className="font-serif text-5xl mb-10">Log into your account</h2>
      <div className="md:w-4/5 lg:w-2/3">
        <LoginForm />
      </div>
    </div>
  )
}
export default Login 
