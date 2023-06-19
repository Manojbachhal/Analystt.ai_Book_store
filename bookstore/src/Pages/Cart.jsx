import { Box, Button, Flex, Heading, Image } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Cart() {
    const [data, setData] = useState([]);
    const getData = async () => {
        // console.log("first")
        let obj = {
            username: JSON.parse(localStorage.getItem("booksusername"))
        }
        let res = await axios.post("http://127.0.0.1:8000/cart", obj)
        // console.log(res)
        setData(res.data);

    }
    const updataCart = async (obj) => {
        obj.username = JSON.parse(localStorage.getItem("booksusername"))
        obj.count = 1
        delete obj._id
        let res = await axios.post("http://127.0.0.1:8000/cart/add", obj).then(() => getData())
    }

    const removeFromCart = async (title, username) => {
        let obj = { title, username }
        // console.log(obj)
        let res = await axios.post("http://127.0.0.1:8000/cart/remove", obj).then(() => getData())
        // console.log(res)

    }
    useEffect(() => {
        getData()
    }, [])
    return (<>
        {/* <h1 style={{ margin: '150px 0px 50px 0px', fontSize: '30px' }} >Cart</h1> */}
        <Heading m="150px 0px 50px 0px" color="#1A5D4F">Cart</Heading>
        <ul style={{ margin: '0px 50px' }}>
            {
                data?.map((ele) => {
                    return <ol style={{ marginTop: '50px', textDecoration: 'none' }} key={ele.title}>
                        <Flex height="150px" gap="10px" alignItems="center" p="20px" border="2px solid #1A5D4F" >
                            <Image src={ele.coverImg} alt={ele.title} width="6%" height="100px" />
                            <Box textAlign="left" pl="40px">
                                <h1>Title : {ele.title}</h1>
                                <p>Price : {ele.price} </p>
                                <p>Quantiy: {ele.count} </p>
                                <Flex gap='10px' pt="10px">
                                    <Button onClick={() => updataCart(ele)} border="2px solid black">+ Quantity</Button>
                                    <Button onClick={() => removeFromCart(ele.title, ele.username)} border="2px solid black">Remove Item</Button>

                                </Flex>
                            </Box>

                        </Flex>
                    </ol>
                })
            }
        </ul>
    </>
    )
}

export default Cart