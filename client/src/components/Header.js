import React from 'react'
import Avatar from '@mui/material/Avatar';
import "./header.css"
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
     <header>
        <nav>
          <Link to="/">
          <h1>DevRaj</h1>
          </Link>
            <div className='avtar'>
                <Avatar style={{ background: "blue"}}>H</Avatar>
            </div>
            </nav>
            </header> 
    </>
  )
}

export default Header
