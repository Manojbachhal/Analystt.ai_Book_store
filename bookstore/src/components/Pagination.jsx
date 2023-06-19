import { Flex, Button } from "@chakra-ui/react";
import React from "react";

function Pagination({ page, setPage }) {
    // console.log(page)
    return (
        <Flex gap="4" justifyContent="center" pt="5">
            <Button
                colorScheme="gray"
                border="2px"
                borderColor="#015A62"
                borderRadius="full"
                onClick={() => {
                    setPage(page - 1);
                }}
            >
                Prev
            </Button>
            <Button
                colorScheme="gray"
                border="2px"
                borderColor="#015A62"
                borderRadius="full"
            >
                {page}
            </Button>
            <Button
                colorScheme="gray"
                border="2px"
                borderColor="#015A62"
                borderRadius="full"
                onClick={() => {
                    setPage(page + 1);
                }}
            >
                Next
            </Button>
        </Flex>
    );
}

export default Pagination;
