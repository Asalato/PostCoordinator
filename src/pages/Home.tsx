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
    VStack, UnorderedList, ListItem, OrderedList
} from "@chakra-ui/react";
import {CheckIcon, ExternalLinkIcon, Icon, InfoOutlineIcon, StarIcon} from "@chakra-ui/icons";
import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {isDailyDone} from "../ScoreStore";

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const search = useLocation().search;
    const idStr = new URLSearchParams(search).get("id");
    const [id, setId] = useState<number | undefined>(idStr === null ? undefined : Number(idStr));

    const startBgColor = useColorModeValue("green.100", "green.900");

    return (
        <Center flexDir="column">
            <Center m="5pt" flexDir="column">
                <Heading size="md">🌎Postal Coordinatorとは？</Heading>
                <Text m="10pt" textAlign="center" fontSize="sm">
                    🌎Postal Coordinatorは日本の郵便番号が示す場所を当てるゲームです。<br/>
                    普段、郵便を出すときや宅配を頼むときに記入する住所についてどれくらい知っていますか？
                    隣の家の郵便番号は？隣の市の番号は？<br/>
                    🌎Postal Coordinatorで、そんな、普段身近に接しているようであまり知らない、郵便番号への理解を深めることができます。
                </Text>
                <Link href='https://www.post.japanpost.jp/zipcode/zipmanual/index.html' isExternal fontSize="sm"
                      textAlign="center">
                    郵便番号について詳しくはこちら（日本郵政の公式サイト） <ExternalLinkIcon mx='2px'/>
                </Link>
                <Link
                    href='https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E3%81%AE%E9%83%B5%E4%BE%BF%E7%95%AA%E5%8F%B7'
                    isExternal fontSize="sm" textAlign="center">
                    攻略情報はこちら（Wikipedia - 日本の郵便番号） <ExternalLinkIcon mx='2px'/>
                </Link>
            </Center>
            <Divider m="10pt"/>
            <Center p="10pt" flexDir="column" bg={startBgColor} rounded="lg">
                <Heading size="md"><StarIcon/> ゲーム開始</Heading>
                <VStack m="10pt">
                    {
                        idStr !== null ? "" :
                            <HStack w="100%">
                                <Heading size="sm" flex={2}>デイリーチャレンジモード</Heading>
                                <Flex flex={1.5}/>
                                {
                                    isDailyDone() ? (
                                        <Button flex={1} colorScheme='teal' variant='outline'
                                                onClick={() => navigate("/result/daily")}>
                                            結果を表示
                                        </Button>
                                    ) : (
                                        <Button flex={1} colorScheme='teal' variant='outline'
                                                onClick={() => navigate("/game/daily")}>
                                            開始 (1日1回)
                                        </Button>
                                    )
                                }
                            </HStack>
                    }
                    {
                        idStr !== null ? "" :
                            <HStack w="100%">
                                <Heading size="sm" flex={2}>ランダムモード</Heading>
                                <Flex flex={1.5}/>
                                <Button flex={1} colorScheme='teal' variant='outline' onClick={() => navigate("/game")}>
                                    開始
                                </Button>
                            </HStack>
                    }
                    <HStack w="100%">
                        <Heading size="sm" flex={2}>固定ステージモード</Heading>
                        <Flex flex={0.1}/>
                        <InputGroup flex={1.8}>
                            <InputLeftAddon>ID</InputLeftAddon>
                            <NumberInput w="100%" textAlign="center" value={id}
                                         onChange={v => setId(Number(v))}>
                                <NumberInputField bgColor="rgba(125, 125, 125, 0.05)"/>
                            </NumberInput>
                        </InputGroup>
                        <Flex flex={0.1}/>
                        <Button flex={0.5} colorScheme='teal' variant='outline' onClick={() => navigate(`/game/${id}`)}
                                disabled={id === undefined}>
                            開始
                        </Button>
                    </HStack>
                </VStack>
            </Center>
            <Divider m="10pt"/>
            <Center m="5pt" flexDir="column">
                <Heading size="md"><CheckIcon/> ゲームの流れ</Heading>
                <OrderedList m="10pt" fontSize="sm">
                    <ListItem>1ゲームは5個のステージで構成されます。</ListItem>
                    <ListItem>各ステージではお題となる郵便番号が示され、<br/>その郵便番号が示す位置をなるべく正確に選択することが目標です。</ListItem>
                    <ListItem>位置は地図上の<Image src="/leaflet/marker-icon.png" h="1rem" display="inline" marginX="0.5rem"/>アイコンをドラッグして選択します。</ListItem>
                    <ListItem>ここでいい、と思ったら「決定！」ボタンを押すと結果が表示され、<br/>次のステージに進むことができます。</ListItem>
                    <ListItem>5ステージ終わるとゲームのリザルトが表示され、<br/>SNSで共有したり、次のゲームに進むことができます。</ListItem>
                </OrderedList>
            </Center>
            <Center m="5pt" flexDir="column">
                <Heading size="md"><CheckIcon/> スコアの計算方法</Heading>
                <Text m="10pt" textAlign="center" fontSize="sm">
                    各ステージの目標地点とあなたが選択した地点の距離からスコアが算出されます。<br/>
                    各ステージ5000点満点で、より近い方が高得点となります。
                </Text>
            </Center>
            <Center m="5pt" flexDir="column">
                <Heading size="xs"><InfoOutlineIcon/> Licenses & Acknowledgement</Heading>
                <Text m="5pt" textAlign="center" fontSize="xs">
                    <Link href="https://wiki.openstreetmap.org/wiki/Leaflet" isExternal>OpenStreetMap:Leaflet</Link> is
                    used to draw the map, thanks to OpenStreetMapContributors!<br/>
                    <Link href="http://geoapi.heartrails.com/api.html" isExternal>HeartRails Geo API</Link> is used to
                    convert between zip codes and coordinates.<br/>
                    郵便番号データは<Link href="https://www.post.japanpost.jp/zipcode/download.html"
                                  isExternal>日本郵便のホームページ</Link>より取得しました。<br/>
                    This site uses the <Link
                    href="https://fonts.google.com/specimen/DotGothic16?subset=japanese#standard-styles"
                    isExternal>DotGothic16</Link> font obtained from Google Fonts.
                </Text>
                <Text m="5pt" textAlign="center" fontSize="xs">
                    <Image src="./logo.png" w="0.7rem" display="inline" marginX="0.2rem"/><Link
                    href="https://portfolio.asalato.net/" isExternal>Asalato
                    Workshop</Link> reserves all rights related to this project.<br/>
                    All assets are available on <Link href="https://github.com/Asalato/PostalCoordinator"
                                                      isExternal>GitHub</Link> in an open source initiative.
                </Text>
            </Center>
        </Center>
    );
}
