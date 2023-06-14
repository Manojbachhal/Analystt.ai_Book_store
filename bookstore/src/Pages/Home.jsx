import React from 'react'
import { Box, Button, Flex, Grid, GridItem, Image, Input } from "@chakra-ui/react"
import { useEffect } from 'react'
import { useState } from 'react'
import Pagination from '../components/Pagination'
function Home() {
    const [allbooks, setbooks] = useState();
    const [page, setPage] = useState(1);
    useEffect(() => {
        (async () => {
            let res = await fetch(`http://127.0.0.1:8000/books?page=${page}`);
            res = await res.json();
            console.log(res.items)
            setbooks(res.items);

        })();
    }, [page])
    return (
        <Box p='3'>
            <Flex justifyContent='space-around' gap={4}>
                <Input type='search'
                    border="2px"
                    borderColor="red.400"
                    borderRadius="full"
                ></Input>
                <Button
                    border="2px"
                    borderColor="red.400"
                    borderRadius="full"
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
                        return <GridItem textAlign='left' >
                            <Image src={ele.coverImg} alt={ele.title} width='100%' height='300px' />
                            <h1>Title : {ele.title}</h1>
                            <h2>Author : {ele.author}</h2>
                            <h2>Language : {ele.language}</h2>
                            <h2>Rating : {ele.rating}</h2>
                            {/* <p>{ele.description}</p> */}
                        </GridItem>
                    })
                }
            </Grid>

            <Pagination page={page} setPage={setPage} />
        </Box>
    )
}

export default Home