import React, { useEffect, useState } from 'react'
import {  Navigate, useParams } from 'react-router-dom';

const ForgotPassword = () => {

  const {id, token} = useParams();


  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const userValid = async()=>{
    const res = await fetch(`/forgotpassword/${id}/${token}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    });
    const data = await res.json()

    if(data.status == 201){
      setPassword("")
      setMessage(true)
    }else{
      <Navigate to="*"/>
    }
  }

  const setval = (e)=>{
    setPassword(e.target.value)
  }

  const sendpassword = async (e) => {
    e.preventDefault();

    if (password === "") {
        alert("password is required!", {
            position: "top-center"
        });
    } else if (password.length < 6) {
        alert("password must be 6 char!", {
            position: "top-center"
        });
    } else {
        const res = await fetch(`/${id}/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password })
        });

        const data = await res.json()

        if (data.status == 201) {
            setPassword("")
            setMessage(true)
        } else {
            alert("! Token Expired generate new LInk",{
                position: "top-center"
            })
        }
    }
}

useEffect(() => {
  userValid()
}, [])

  return (
    <div>
       <section>
      <div className='form_data'>
        <div className='form_heading'>
          <h1>Enter Your NEW Password</h1>
        </div>

        <form>
          {message ? <p style={{color:"green", fontWeight:"bold"}}>Password Successfully Update</p>:""}
          <div className='form_input'>
            <label htmlFor='password'>New Password</label>
            <input value={password} onChange={setval} type='password' name='password' id='password' placeholder='Enter your New Password'/>
          </div>

          <button className='btn' onClick={sendpassword}>Send</button>
          
        </form>
      </div>
    </section>
    </div>
  )
}

export default ForgotPassword
