import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import Signin from '../Pages/Signin'
import Signup from '../Pages/Signup'

function Allroutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Signin" element={<Signin />} />
            </Routes>
        </div>
    )
}

export default Allroutes