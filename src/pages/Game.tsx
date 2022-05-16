import React, {useEffect, useState} from 'react';
import {PlaceView} from "./PlaceView";
import {Address} from "../address/Address";
import {GetRandomAddress} from "../address/GetAddress";
import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Text,
    Link,
    Spacer,
    Badge,
    VStack,
    Wrap,
    WrapItem,
    Center
} from "@chakra-ui/react";
import {isDailyDone, tryUpdateHighScore, updateCurrentGame, updateDailyGame} from "../ScoreStore";
import {useNavigate} from "react-router-dom";
import {GameResult, Stage} from "../GameResult";

const MAX_GAME = 5;

export const Game: React.FC<{ seed: number, day?: Date }> = ({seed, day}) => {
    const [times, setCount] = useState<number>(1);
    const [gameResult, setGameResult] = useState<GameResult>(new GameResult(seed, [], day));
    const addStageToResult = (stage: Stage) => {
        setGameResult(new GameResult(seed, [...gameResult.stages, stage], day));
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
                                if (day !== undefined) updateDailyGame(gameResult);
                                navigate(day === undefined ? "/result" : "/result/daily");
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

export const DailyGame: React.FC = () => {
    const navigate = useNavigate();

    if (isDailyDone())
        return (
            <VStack>
                <Text>今日のデイリーチャレンジは完了しています</Text>
                <HStack>
                    <Button colorScheme='teal' variant='outline' onClick={() => navigate("/result/daily")}>
                        結果を表示
                    </Button>
                    <Button colorScheme='teal' variant='outline' onClick={() => navigate("/game")}>
                        新しいゲームを開始
                    </Button>
                    <Button colorScheme='teal' variant='outline' onClick={() => navigate("/")}>
                        トップに戻る
                    </Button>
                </HStack>
            </VStack>
        );

    const today = new Date();
    const dailySeed = Number(`${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`);
    return (
        <Game seed={dailySeed} day={today}/>
    )
}

export default Game;
