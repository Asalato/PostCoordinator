import {Box, Button, Container, Divider, Flex, Heading, theme} from "@chakra-ui/react";
import Game from "./pages/Game";
import React from "react";
import {BrowserRouter, Navigate, Route, Routes, useNavigate, useParams} from "react-router-dom";
import {Home} from "./pages/Home";
import {Result} from "./pages/Result";
import {VERSION} from "./version";

export const App: React.FC = () => {
    const getRandomSeed = () => Math.floor(Math.random() * 1000000000);

    const GameNode: React.FC = () => {
        const {id} = useParams();
        const seed = Number(id);
        return isNaN(seed) ? <Navigate to="/" replace/> : <Game seed={seed}/>;
    };
    return (
        <Container m="auto" maxW="500pt" alignItems="center" h="100vh">
            <Flex position="absolute" bgColor="lightgray" minW="500pt" h="100vh" m="0" p="0" opacity={0.1} zIndex={-1}/>
            <Heading padding="5pt" marginY="5pt" display="flex">
                <Flex onClick={() => window.location.href = "/"} cursor="pointer" width="auto">🌎</Flex>
                <Flex m="0.25rem"/>
                POS〒AL
                <Flex m="0.15rem"/>
                COORDINATOR
            </Heading>
            <Divider/>
            <Box m="5pt">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/game" element={<Navigate replace to={`/game/${getRandomSeed()}`}/>}/>
                        <Route path="/game/:id" element={<GameNode/>}/>
                        <Route path="/result" element={<Result/>}/>
                    </Routes>
                </BrowserRouter>
            </Box>
            <Box position="absolute" left={0} bottom={0} m="5pt">ver. {VERSION}</Box>
        </Container>
    );
}
