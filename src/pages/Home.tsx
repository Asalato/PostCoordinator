import {
    Box,
    Button, Center, Divider,
    Flex,
    Heading,
    HStack,
    Input, InputGroup, InputLeftAddon,
    Link,
    NumberInput, NumberInputField,
    Spacer,
    Stack,
    Text, useNumberInput,
    VStack
} from "@chakra-ui/react";
import {CheckIcon, ExternalLinkIcon, InfoOutlineIcon, StarIcon} from "@chakra-ui/icons";
import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const search = useLocation().search;
    const query = new URLSearchParams(search);
    const [id, setId] = useState<number>(Number(query.get("id")));

    return (
        <Center flexDir="column">
            <Center m="5pt" flexDir="column">
                <Heading size="md"><CheckIcon/> Postal Coordinatorとは？</Heading>
                <Text m="10pt" textAlign="center">
                    Lorem ipsum is placeholder text commonly used in the graphic, print, and
                    publishing industries for previewing layouts and visual mockups.
                    <br/>
                    <Link href='https://www.post.japanpost.jp/zipcode/zipmanual/index.html'
                          isExternal textAlign="center">
                        詳しくはこちら（日本郵政の公式サイト） <ExternalLinkIcon mx='2px'/>
                    </Link>
                </Text>
            </Center>
            <Center m="5pt" flexDir="column">
                <Heading size="md"><CheckIcon/> ゲームの流れ</Heading>
                <Text m="10pt" textAlign="center">
                    Lorem ipsum is placeholder text commonly used in the graphic, print, and
                    publishing industries for previewing layouts and visual mockups.<br/>
                    The quick brown fox jumps over the lazy dog" is an English-language pangram—a
                    sentence that contains all of the letters of the English alphabet. Owing to
                    its existence, Chakra was created.
                </Text>
            </Center>
            <Center m="5pt" flexDir="column">
                <Heading size="md"><CheckIcon/> スコアの計算方法</Heading>
                <Text m="10pt" textAlign="center">
                    Lorem ipsum is placeholder text commonly used in the graphic, print, and
                    publishing industries for previewing layouts and visual mockups.
                </Text>
            </Center>
            <Divider m="10pt"/>
            <Center p="10pt" flexDir="column" bg="green.900" rounded="lg">
                <Heading size="md"><StarIcon/> ゲームの開始</Heading>
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
                <Heading size="xs"><InfoOutlineIcon/> ライセンス表記</Heading>
                <Text m="5pt" textAlign="center" fontSize="xs">
                    Lorem ipsum is placeholder text commonly used in the graphic, print, and
                    publishing industries for previewing layouts and visual mockups.
                </Text>
            </Center>
        </Center>
    );
}
