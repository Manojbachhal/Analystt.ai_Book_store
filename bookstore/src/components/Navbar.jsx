import { Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from "react-router-dom"
import logo from '../assets/logo.png'

function Navbar() {
    return (
        <Flex zIndex="99999" position="fixed" mb="5" width="100%" background="#1a5d4f" top="0" justifyContent="space-evenly" alignItems="center" boxShadow=" rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" >
            <Link to="/"><Image src={logo} width="20%" /></Link>
            <h1 style={{ color: '#FFC5AD', fontWeight: 'bold' }}><Link to="/signup">Signup</Link></h1>
            <h1 style={{ color: '#FFC5AD', fontWeight: 'bold' }}> <Link to="/signin">Signin</Link></h1>
            <h1 style={{ color: '#FFC5AD', fontWeight: 'bold' }}> <Link to="/cart">Cart</Link></h1>
        </Flex >
    )
}

export default Navbar