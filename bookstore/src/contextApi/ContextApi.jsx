import React, { createContext, useState } from 'react'

const AuthContext = createContext();

function ContextApi({ children }) {

    const [loginData, setLogin] = useState({
        login: false,
        username: " "
    })
    let obj = {
        loginData, setLogin
    }

    return (
        <AuthContext.Provider value={obj} >
            {children}
        </AuthContext.Provider>
    )
}

export default ContextApi
export { AuthContext }