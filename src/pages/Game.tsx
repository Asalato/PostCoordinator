import React, {useEffect, useState} from 'react';
import {PlaceView} from "./PlaceView";
import {Address} from "../address/Address";
import {GetRandomAddress} from "../address/GetAddress";
import {Box, Button, Flex, Heading, HStack, Text, Link, Spacer, Badge, VStack, Wrap, WrapItem} from "@chakra-ui/react";
import {tryUpdateHighScore, updateCurrentGame} from "../ScoreStore";
import {useNavigate} from "react-router-dom";
import {GameResult, Stage} from "../GameResult";

const MAX_GAME = 5;

export const Game: React.FC<{ seed: number }> = ({seed}) => {
    const [times, setCount] = useState<number>(1);
    const [gameResult, setGameResult] = useState<GameResult>(new GameResult(seed, []));
    const addStageToResult = (stage: Stage) => {
        setGameResult(new GameResult(seed, [...gameResult.stages, stage]));
    }

    const [playing, setPlaying] = useState<boolean>(false);
    const [address, setAddress] = useState<Address | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (address != null) return;
        let loading = true;
        GetRandomAddress(seed, times - 1).then(address => {
            if (!loading) return;
            setAddress(address);
            setPlaying(true);
        });
        return () => {
            loading = false
        };
    }, [address, times]);

    return (
        <Box className="App">
            <Wrap m="10pt" justify={["end", "space-between", "space-between"]}>
                <WrapItem alignItems="end" marginRight="auto !important">
                    {
                        address == null ? "" :
                            <HStack>
                                <Text fontSize="xl">お題：</Text>
                                <Badge fontSize="2xl">〒{address.postalCode.toString()}</Badge>
                            </HStack>
                    }
                </WrapItem>
                <WrapItem marginLeft="auto !important">
                    <VStack alignItems="end">
                        <Heading size="md">
                            {times}/{MAX_GAME}&nbsp;ゲーム
                        </Heading>
                        <Heading size="sm">
                            累計スコア：{gameResult.getTotalScore().toFixed(0)}ポイント
                        </Heading>
                    </VStack>
                </WrapItem>
            </Wrap>
            <PlaceView address={address} playing={playing} endTrialAction={(stage) => {
                setPlaying(false);
                addStageToResult(stage);
            }}/>
            <Flex>
                <Spacer/>
                {
                    address != null && !playing ? (
                        <Button colorScheme='teal' variant='outline' onClick={() => {
                            setPlaying(false);
                            if (times < MAX_GAME) {
                                setCount(times + 1);
                                setAddress(null);
                            } else {
                                updateCurrentGame(gameResult);
                                tryUpdateHighScore(gameResult.getTotalScore());
                                navigate("/result")
                            }
                        }}>{
                            times < MAX_GAME ? "次のゲームへ進む" : "リザルトを表示"
                        }</Button>
                    ) : ""
                }
            </Flex>
        </Box>
    );
}

export default Game;
