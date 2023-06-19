import React, { useContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import Signin from '../Pages/Signin'
import Signup from '../Pages/Signup'
import Cart from '../Pages/Cart'
import { AuthContext } from '../contextApi/ContextApi'

function Allroutes() {
    let { loginData, setLogin } = useContext(AuthContext)



    return (
        <div>
            <Routes>
                {/* <Route path="/" element={login ? <Home /> : <Signin />} /> */}
                <Route path="/" element={<Home />} />
                < Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={loginData.login ? <Home /> : <Signin />} />
                <Route path="/cart" element={loginData.login ? <Cart /> : <Signin />} />
            </Routes>
        </div>
    )
}

export default Allroutes