import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import Signin from '../Pages/Signin'
import Signup from '../Pages/Signup'
import Cart from '../Pages/Cart'

function Allroutes() {
    const [login, setLogin] = useState(JSON.parse(localStorage.getItem('bookslogin')))


    return (
        <div>
            <Routes>
                {/* <Route path="/" element={login ? <Home /> : <Signin />} /> */}
                <Route path="/" element={<Home />} />
                < Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={login ? <Home /> : <Signin />} />
                <Route path="/cart" element={login ? <Cart /> : <Signin />} />
            </Routes>
        </div>
    )
}

export default Allroutes