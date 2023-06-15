import { Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <Flex position="fixed" mb="5" width="100%" background="#cec9bf" top="0" justifyContent="space-evenly" alignItems="center" boxShadow=" rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" >
            <Link to="/"><Image src="https://images.unsplash.com/photo-1593882100241-aef1449fe351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9vayUyMGxvZ298ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60" width="20%" /></Link>
            <h1 style={{ color: '#015A62', fontWeight: 'bold' }}><Link to="signup">Signup</Link></h1>
            <h1 style={{ color: '#015A62', fontWeight: 'bold' }}> <Link to="signin">Signin</Link></h1>
        </Flex >
    )
}

export default Navbar