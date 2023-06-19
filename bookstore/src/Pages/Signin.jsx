import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
    let [data, setData] = useState({});
    let navigate = useNavigate();

    const handlesignin = async () => {
        let res = await axios.post("http://127.0.0.1:8000/signin", data)
        console.log(res);

        if (res.data.token == "Sign in Sucessful") {
            localStorage.setItem("booksusername", JSON.stringify(data.username))
            localStorage.setItem("bookslogin", JSON.stringify(true))
            navigate("/");
        }
    };
    const handlesubmit = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({ ...data, [name]: value });
        console.log(data);
    };
    return (
        <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
                <Stack spacing={4} w={"full"} maxW={"md"}>
                    <Heading fontSize={"2xl"}>Sign in to your account</Heading>
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" name="username" onChange={handlesubmit} placeholder="Enter your email or username" />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" name="password" onChange={handlesubmit} placeholder="Enter your password" />
                    </FormControl>
                    <Stack spacing={6}>
                        <Stack
                            direction={{ base: "column", sm: "row" }}
                            align={"start"}
                            justify={"space-between"}
                        >
                            <Checkbox >Remember me</Checkbox>
                            <Link color="#1A5D4F">Forgot password?</Link>
                        </Stack>
                        <Button
                            background="#1A5D4F"
                            variant={"solid"}
                            onClick={handlesignin}
                        >
                            Sign In
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={"Login Image"}
                    objectFit={"cover"}
                    src={
                        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
                    }
                />
            </Flex>
        </Stack>
    );
}
