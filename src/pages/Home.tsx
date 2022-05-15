import {
    Box,
    Button, Center, Divider,
    Flex,
    Heading,
    HStack,
    Input, InputGroup, InputLeftAddon,
    Link,
    NumberInput, NumberInputField,
    Image,
    Stack,
    Text, useColorMode, useColorModeValue, useNumberInput,
    VStack
} from "@chakra-ui/react";
import {CheckIcon, ExternalLinkIcon, Icon, InfoOutlineIcon, StarIcon} from "@chakra-ui/icons";
import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const search = useLocation().search;
    const query = new URLSearchParams(search);
    const [id, setId] = useState<number>(Number(query.get("id")));

    const startBgColor = useColorModeValue("green.100", "green.900");

    return (
        <Center flexDir="column">
            <Center m="5pt" flexDir="column">
                <Heading size="md">🌎Postal Coordinatorとは？</Heading>
                <Text m="10pt" textAlign="center" fontSize="sm">
                    🌎Postal Coordinatorは日本で利用されている郵便番号制度を題材としたゲームです。<br/>
                    あなたは普段、郵便を出すときや宅配を頼むときに記入する住所についてどのくらい考えていますか？
                    隣の家の郵便番号は？隣の市の番号は？<br/>
                    🌎Postal Coordinatorは、このように、普段身近に接しているようであまり知らない、郵便番号について理解を深めることができるゲームです。
                    <br/>
                    <Link href='https://www.post.japanpost.jp/zipcode/zipmanual/index.html' isExternal>
                        郵便番号について詳しくはこちら（日本郵政の公式サイト） <ExternalLinkIcon mx='2px'/>
                    </Link>
                </Text>
            </Center>
            <Divider m="10pt"/>
            <Center p="10pt" flexDir="column" bg={startBgColor} rounded="lg">
                <Heading size="md"><StarIcon/> ゲーム開始</Heading>
                <VStack m="10pt">
                    <HStack w="100%">
                        <Heading size="sm" flex={2}>ランダムモード</Heading>
                        <Flex flex={1.5}/>
                        <Button flex={1} colorScheme='teal' variant='outline' onClick={() => navigate("/game")}>
                            開始
                        </Button>
                    </HStack>
                    <HStack w="100%">
                        <Heading size="sm" flex={2}>固定ステージモード</Heading>
                        <Flex flex={0.1}/>
                        <InputGroup flex={1.8}>
                            <InputLeftAddon>ID</InputLeftAddon>
                            <NumberInput w="100%" textAlign="center" value={id}
                                         onChange={v => setId(Number(v))}>
                                <NumberInputField/>
                            </NumberInput>
                        </InputGroup>
                        <Flex flex={0.1}/>
                        <Button flex={0.5} colorScheme='teal' variant='outline' onClick={() => navigate(`/game/${id}`)}>
                            開始
                        </Button>
                    </HStack>
                </VStack>
            </Center>
            <Divider m="10pt"/>
            <Center m="5pt" flexDir="column">
                <Heading size="md"><CheckIcon/> ゲームの流れ</Heading>
                <Text m="10pt" textAlign="center" fontSize="sm">
                    1ゲームは5個のステージで構成されます。<br/>
                    各ステージではお題となる郵便番号が示され、その郵便番号が示す位置をなるべく正確に選択することが目標です。<br/>
                    位置は地図上の<Image src="/leaflet/marker-icon.png" h="1rem" display="inline" marginX="0.5rem"/>アイコンをドラッグして選択します。<br/>
                    ここでいい、と思ったら「決定！」ボタンを押すと結果が表示され、次のステージに進みます。<br/>
                    5ステージ終わるとゲームのリザルトが表示され、SNSで共有したり、次のゲームに進むことができます。
                </Text>
            </Center>
            <Center m="5pt" flexDir="column">
                <Heading size="md"><CheckIcon/> スコアの計算方法</Heading>
                <Text m="10pt" textAlign="center" fontSize="sm">
                    各ステージで決められた目標地点とあなたが選択した地点の距離からスコアが算出されます。<br/>
                    各ステージ5000点満点で、より近い方が高得点となります。
                </Text>
            </Center>
            <Center m="5pt" flexDir="column">
                <Heading size="xs"><InfoOutlineIcon/> Licenses</Heading>
                <Text m="5pt" textAlign="center" fontSize="xs">
                    <Link href="https://wiki.openstreetmap.org/wiki/Leaflet" isExternal>OpenStreetMap:Leaflet</Link> is
                    used to draw the map, thanks to OpenStreetMapContributors!<br/>
                    <Link href="http://geoapi.heartrails.com/api.html" isExternal>HeartRails Geo API</Link> is used to
                    convert between zip codes and coordinates.
                </Text>
            </Center>
        </Center>
    );
}
