import React, { useContext } from 'react'
import { Box, Button, Flex, Grid, GridItem, Heading, Image, Input, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { useEffect } from 'react'
import { useState } from 'react'
import Pagination from '../components/Pagination'
import axios from 'axios'
import { AuthContext } from '../contextApi/ContextApi'
function Home() {
    const [allbooks, setbooks] = useState();
    const [page, setPage] = useState(1);
    const [searchData, setSearchData] = useState();
    const [searchType, setValue] = React.useState('')
    let { loginData, setLogin } = useContext(AuthContext)

    let addtoCart = async (obj) => {
        obj.username = loginData.username;
        obj.count = 1
        delete obj._id
        let res = await axios.post("http://127.0.0.1:8000/cart/add", obj)
    }
    let handleSearch = async () => {
        let res = await axios.get(`http://127.0.0.1:8000/search?${searchType}=${searchData}`)
        // console.log(res)
        setbooks(res.data.items)
        setSearchData('')

    }
    useEffect(() => {
        (async () => {
            let res = await fetch(`http://127.0.0.1:8000/books?page=${page}`);
            res = await res.json();
            // console.log(res.items)
            setbooks(res.items);

        })();
    }, [page])
    return (
        <Box p='3' mt="9%">
            <Heading textAlign="left" p="3">Search By</Heading>
            <RadioGroup onChange={setValue} searchType={searchType} p="3">
                <Stack direction='row'>
                    <Radio value='title'>Title</Radio>
                    <Radio value='rating'>Rating</Radio>
                    <Radio value='genres'>Genres</Radio>
                </Stack>
            </RadioGroup>

            <Flex justifyContent='space-around' gap={4}>
                <Input type='search'
                    border="3px solid #015A62"
                    borderRadius="full"
                    disabled={searchType.length == 0}
                    onChange={(e) => setSearchData(e.target.value)}
                ></Input>
                <Button
                    border="2px"
                    borderColor="#015A62"
                    borderRadius="full"
                    onClick={() => handleSearch()}
                >Search</Button>
            </Flex>
            <Grid
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(4, 1fr)'
                gap={4}
                pt='10'
            >

                {
                    allbooks?.map((ele) => {
                        return <GridItem p="3" textAlign='left' key={ele.title} boxShadow="rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset">
                            <Box height="500px" >
                                <Image src={ele.coverImg} alt={ele.title} width='100%' height='300px' />
                                <h1> <b>Title :</b> {ele.title}</h1>
                                <h2> <b>Author :</b> {ele.author}</h2>
                                <h2><b>Language :</b> {ele.language}</h2>
                                <h2><b>Rating :</b> {ele.rating}</h2>
                            </Box>
                            {/* <p>{ele.description}</p> */}
                            <Box mt="2" mb="2" textAlign="center">
                                <Button onClick={(e) => {
                                    e.target.style.color = "white"
                                    e.target.style.background = "#1A5D4F"
                                    addtoCart(ele)
                                }}

                                    border="1px solid #015A62"
                                    borderRadius="full">Add to Cart</Button>
                            </Box>
                        </GridItem>
                    })
                }
            </Grid>

            <Pagination page={page} setPage={setPage} />
        </Box>
    )
}

export default Home