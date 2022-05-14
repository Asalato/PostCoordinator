import {Box, Button, Flex, HStack, Link, Spacer, Text, VStack} from "@chakra-ui/react";
import {ShareButton} from "../ShareButton";
import React from "react";
import {getCurrentGame, getHighScore} from "../ScoreStore";
import {Navigate, useNavigate} from "react-router-dom";

export const Result: React.FC = () => {
    const navigate = useNavigate();
    const currentGame = getCurrentGame();
    if (currentGame == null) return <Navigate replace to="/"/>

    return (
        <VStack direction="column">
            <Text>
                最終スコア：{currentGame.getTotalScore().toFixed(0)}<br/>
                (最高スコア：{getHighScore().toFixed(0)})
            </Text>
            <Box>
                <ShareButton result={currentGame}/>
            </Box>
            <HStack>
                <Button colorScheme='teal' variant='outline' onClick={() => navigate("/game")}>
                    新しいゲームを開始
                </Button>
                <Button colorScheme='teal' variant='outline' onClick={() => navigate("/")}>
                    トップに戻る
                </Button>
                <Spacer/>
            </HStack>
        </VStack>
    )
}
