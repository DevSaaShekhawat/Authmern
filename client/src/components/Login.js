import React, { useState } from 'react'
import "./mix.css";
import { NavLink,useNavigate } from 'react-router-dom';

const Login = () => {
  const [passShow, setPassShow] = useState(false);
  const navigate = useNavigate();

  const [inpval, setInpval] = useState({
    email:"",
    password:"",
});
console.log(inpval);

const setVal = (e) => {
  const {name, value} = e.target;

  setInpval(() => {
      return {
          ...inpval,
          [name]:value
      }
  })
}

const loginuser = async (e) => {
  e.preventDefault();

  const {email, password} = inpval;
  if(email === ""){
    alert("Please enter your email")
  }
  else if(!email.includes("@")){
    alert("enter valid email")
  }
  else if(password === ""){
    alert("enter your password")
  }
  else if(password.length < 6){
    alert("password must be 6 char")
  }
  else{
    //console.log("user Login Successfully")

    const data = await fetch("/login",{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email,password
      })
    });
    const res = await data.json();
    // console.log(res);

    if(res.status === 201){
      alert("User Login done");
      localStorage.setItem("usersdatatoken",res.result.token)
      setInpval({...inpval,email:"",password:""})
      navigate("/dass");
    }
  }
}

  return (
    <>
    <section>
      <div className='form_data'>
        <div className='form_heading'>
          <h1>Welcome Back, Log In</h1>
          <p>Hi, we are you glad you are back. Please login.</p>
        </div>

        <form>
          <div className='form_input'>
            <label htmlFor='email'>Email</label>
            <input value={inpval.email} onChange={setVal} type='email' name='email' id='email' placeholder='Enter your email address'/>
          </div>
          <div className='form_input'>
            <label htmlFor='password'>Password</label>
            <div className='two'>
            <input value={inpval.password} onChange={setVal} type={!passShow ? "password" : "text"} name='password' id='password' placeholder='Enter your password'/>
            <div className='showpass' onClick={()=>setPassShow(!passShow)}>
              {!passShow ? "Show" : "Hide"}
            </div>
            </div>
          </div>
          <button className='btn' onClick={loginuser}>Login</button>
          <p>Don't have an Account? <NavLink to="/register"> Sign Up</NavLink></p>
          <p style={{color:"black", fontWeight:"bold"}}>Forgot Password <NavLink to="/password-reset">Click Here</NavLink></p>
        </form>
      </div>
    </section>
    </>
  )
}

export default Login
