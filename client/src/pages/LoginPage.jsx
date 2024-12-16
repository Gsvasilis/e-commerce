import { useState } from "react"
import "../styles/LoginPage.scss"
import {Eye,EyeOff,LogIn} from "lucide-react"
import {useUserStore} from "../store/useUserStore"
import Spinner from "../components/Spinner"

function LoginPage() {

  const {login,loading} = useUserStore()

  const [showPassword,setShowPassword] = useState(false)
  const [email ,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleSubmit = (e)=>{
    e.preventDefault()
    login(email,password)
  }

  const handlePassword = ()=>{
    setShowPassword(!showPassword)
  }
  return (
    <div className="login-page">
        <form onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <div className="box">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="box">
          <label htmlFor="password">Password</label>
          <div className="input">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <div className="input-icon" onClick={handlePassword}>
              {showPassword ?<Eye size={20}/> : <EyeOff size={20}/>}
          </div>
          </div>
        </div>
        <button type="submit" disabled={loading}>{loading ?(<><Spinner/>Log In</> ) :<><LogIn/>Log In </>}</button>
        <a href="/signup">Not a member? <span>Sign up here!</span></a>
      </form>
    </div>
  )
}

export default LoginPage