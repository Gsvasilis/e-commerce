import { useState } from "react"
import "../styles/SignUpPage.scss"
import {Eye,EyeOff,UserPlus} from "lucide-react"
import {useUserStore} from "../store/useUserStore"
import Spinner from "../components/Spinner"


function SignUpPage() {

  const {signup,loading} = useUserStore()

  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  const handleInput = (e)=>{
    const {name,value} = e.target;
    setFormData((prevFormData)=>({...prevFormData,[name]:value}))
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    signup(formData)
  }
  
  const [showPassword,setShowPassword] = useState(false)
  const handlePassword = ()=>{
    setShowPassword(!showPassword)
  }


  return (
    <div className="signup-page">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="box">
          <label htmlFor="Full Name">Full Name</label>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInput} />
        </div>
        <div className="box">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInput}/>
        </div>
        <div className="box">
          <label htmlFor="password">Password</label>
          <div className="input">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleInput} />
            <div className="input-icon" onClick={handlePassword}>
              {showPassword ? <Eye size={20}/> : <EyeOff size={20}/>}
          </div>
          </div>
        </div>
        <div className="box">
          <label htmlFor="Confirm Password">Confirm Password</label>
          <div className="input">
            <input type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInput} />
          <div className="input-icon" onClick={handlePassword}>
          {showPassword ? <Eye size={20}/> : <EyeOff size={20}/>}
          </div>
          </div>
        </div>
        <button type="submit" disabled={loading}>{loading ?(<><Spinner/>Sign Up</>) :<><UserPlus/>Sign Up </>}</button>
        <a href="/login">Already have an account? <span>Login here!</span></a>
      </form>
    </div>
  )
}

export default SignUpPage