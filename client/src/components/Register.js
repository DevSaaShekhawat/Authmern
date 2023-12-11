import React, { useState } from 'react'
import "./mix.css";
import { NavLink, Navigate, useNavigate } from 'react-router-dom';

const Register = () => {
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    const navigate = useNavigate();

    const [inpval, setInpval] = useState({
        fname:"",
        email:"",
        password:"",
        cpassword:"",
    });

    const setVal = (e) => {
        const {name, value} = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]:value
            }
        })
    }

    const addUserdata = async (e) => {
        e.preventDefault();

        const {fname,email,password,cpassword} = inpval;

        if(fname === ""){
            alert("please enter Your name");
        }else if(email === ""){
            alert("please enter your email");
        }else if(!email.includes("@")){
            alert("enter valid email")
        }else if(password === ""){
            alert("enter your password")
        }else if(password.length < 6){
            alert("password must be 6 char")
        }
        else if(cpassword.length === ""){
            alert("enter your confirm password")
        }
        else if(cpassword.length < 6){
            alert("confirm password must be 6 char")
        }
        else if(password !== cpassword){
            alert("password and confirm password not match")
        }
        else{
            // console.log("user registration successfully done")
            const data = await fetch("/register",{
              method: "POST",
              headers: {
                "Content-Type":"application/json"
              },
              body: JSON.stringify({
                fname,email,password,cpassword
              })
            });
            const res = await data.json();
            // console.log(res);

            if(res.status === 201){
              alert("User registration done");
              setInpval({...inpval, fname:"",email:"",password:"",cpassword:""})
              navigate("/")
            }
        }
    }
  return (
    <>
      <section>
      <div className='form_data'>
        <div className='form_heading'>
          <h1>Sign Up</h1>
          <p style={{textAlign:"center"}}>We are glad that you will be using Project Cloud to manage <br/> your tasks! We hope that you will get like it.</p>
        </div>

        <form>
          <div className='form_input'>
            <label htmlFor='fname'>Username</label>
            <input onChange={setVal} value={inpval.fname}  type='email' name='fname' id='fname' placeholder='Enter your Name'/>
          </div>
          <div className='form_input'>
            <label htmlFor='email'>Email</label>
            <input onChange={setVal} value={inpval.email} type='email' name='email' id='email' placeholder='Enter your email address'/>
          </div>
          <div className='form_input'>
            <label htmlFor='password'>Password</label>
            <div className='two'>
            <input onChange={setVal} value={inpval.password} type={!passShow ? "password" : "text"} name='password' id='password' placeholder='Enter your password'/>
            <div className='showpass' onClick={()=>setPassShow(!passShow)}>
              {!passShow ? "Show" : "Hide"}
            </div>
            </div>
          </div>

          <div className='form_input'>
            <label htmlFor='password'>Confirm Password</label>
            <div className='two'>
            <input onChange={setVal} value={inpval.cpassword} type={!cpassShow ? "password" : "text"} name='cpassword' id='cpassword' placeholder='Confirm password'/>
            <div className='showpass' onClick={()=>setCPassShow(!cpassShow)}>
              {!cpassShow ? "Show" : "Hide"}
            </div>
            </div>
          </div>
          <button className='btn' onClick={addUserdata}>Sign Up</button>
          <p>Already have an Account? <NavLink to="/">Log In</NavLink></p>
        </form>
      </div>
    </section>
    </>
  )
}

export default Register
