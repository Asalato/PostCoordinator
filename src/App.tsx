import {Box, Button, Container, Divider, extendTheme, Flex, Heading, theme} from "@chakra-ui/react";
import Game, {DailyGame} from "./pages/Game";
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
        <Container m="auto" maxW="500pt" alignItems="center" h="100vh" w="100%" overflowY="auto"
                   css={{
                       '&::-webkit-scrollbar': {
                           width: '4px',
                       },
                       '&::-webkit-scrollbar-track': {
                           width: '6px',
                       },
                       '&::-webkit-scrollbar-thumb': {
                           borderRadius: '24px',
                       },
                   }} bgColor="rgba(125, 125, 125, 0.04)">
            <Heading padding="5pt" marginY="5pt" display="flex" fontSize={["2xl", "3xl", "4xl"]}>
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
                        <Route path="/game/daily" element={<DailyGame/>}/>
                        <Route path="/result" element={<Result/>}/>
                        <Route path="/result/daily" element={<Result isDaily/>}/>
                    </Routes>
                </BrowserRouter>
            </Box>
            <Box position="fixed" left={0} bottom={0} m="5pt" fontSize="xs">ver. {VERSION}</Box>
        </Container>
    );
}
