import React, { useState } from 'react'

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const setVal = (e) => {
        setEmail(e.target.value)
    }

    const sendLink = async(e) => {
        e.preventDefault();

        const res = await fetch("/sendpasswordlink",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email})
        });
        const data = await res.json();

        if(data.status == 201){
            setEmail("");
            setMessage(true)
        }else{
            alert("Invalid User")
        }
    }
  return (
    <>
      <section>
      <div className='form_data'>
        <div className='form_heading'>
          <h1>Enter Your Email</h1>
        </div>

        {message ? <p style={{color:"green", fontWeight:"bold"}}>password reset link send successfully in your email</p>:""}

        <form>
          <div className='form_input'>
            <label htmlFor='email'>Email</label>
            <input value={email} onChange={setVal} type='email' name='email' id='email' placeholder='Enter your email address'/>
          </div>

          <button className='btn' onClick={sendLink}>Send</button>
          
        </form>
      </div>
    </section>
    </>
  )
}

export default PasswordReset
