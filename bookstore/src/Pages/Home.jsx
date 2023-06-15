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
        <Box p='3' mt="9%">
            <Flex justifyContent='space-around' gap={4}>
                <Input type='search'
                    border="3px solid #015A62"
                    borderRadius="full"
                ></Input>
                <Button
                    border="2px"
                    borderColor="#015A62"
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
                        return <GridItem p="3" textAlign='left' key={ele.title} boxShadow="rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset">
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