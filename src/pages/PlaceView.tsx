import React, {useEffect, useMemo, useRef, useState} from 'react';
import {MapContainer, Marker, Polyline, Popup, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Leaflet, {LatLng, Marker as Mark, Map, LatLngBounds} from "leaflet";
import {Address, Coordinate} from "../address/Address";
import {
    Badge,
    Box,
    Button,
    Center,
    Flex,
    Heading,
    HStack,
    SimpleGrid,
    Spacer,
    Spinner,
    Text, useTimeout,
    VStack, Wrap, WrapItem
} from "@chakra-ui/react";
import {getScore, Stage} from "../GameResult";
import {selectIcon, targetIcon} from "../leaflet/CustomIcons";

const mapStyle = {
    maxWidth: "100%",
    aspectRatio: "3/2",
    margin: "10pt"
}

const TIMER = 60;

export const PlaceView: React.FC<{ address: Address | null, playing: boolean, endTrialAction: (stage: Stage) => void }> = ({
                                                                                                                               address,
                                                                                                                               playing,
                                                                                                                               endTrialAction
                                                                                                                           }) => {
    const defaultPosition = new LatLng(36.2048, 138.2529);
    const [currentPosition, setCurrentPosition] = useState<LatLng>(defaultPosition);

    const mapRef = React.createRef<Map>();

    const markerRef = useRef<Mark>(null);
    const markerEventHandlers = useMemo(() => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setCurrentPosition(marker.getLatLng())
                }
            },
        }),
        []);

    const [timer, setTimer] = useState<number>(TIMER);
    useEffect(() => {
        const interval = setTimeout(() => {
            if (playing) {
                setTimer(timer - 1);
            }
            if (timer <= 0) {
                showResult();
            }
        }, 1000);
        return () => clearInterval(interval);
    })

    if (address == null) return <Center style={mapStyle} m="10pt"><Spinner size="xl"/></Center>;

    const position = new LatLng(address.coordinate.latitude, address.coordinate.longitude);

    const showResult = () => {
        setTimer(TIMER);
        endTrialAction(new Stage(address, currentPosition.distanceTo(position) / 1000, new Coordinate(currentPosition.lat, currentPosition.lng)));
        const map = mapRef.current;
        if (map == null) return;
        const bound = new LatLngBounds(currentPosition, position);
        map.fitBounds(bound, {padding: [50, 50]});
    }

    return (
        <Box m="10pt">
            <MapContainer ref={mapRef}
                          center={currentPosition} zoom={5} style={mapStyle}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker eventHandlers={markerEventHandlers} ref={markerRef} icon={selectIcon}
                        position={currentPosition} draggable={playing} autoPan>
                    <Popup>
                        選択 ({currentPosition.lat.toFixed(2)}, {currentPosition.lng.toFixed(2)})
                    </Popup>
                </Marker>
                {
                    !playing ? (
                        <>
                            <Marker position={position} icon={targetIcon}>
                                <Popup>
                                    正解
                                    ({address.coordinate.latitude.toFixed(2)}, {address.coordinate.longitude.toFixed(2)})
                                </Popup>
                            </Marker>
                            <Polyline positions={[currentPosition, position]} color="green"/>
                        </>
                    ) : ""
                }
            </MapContainer>
            {
                !playing ? (
                    <Wrap justify="center">
                        <HStack>
                            <Heading size="lg">
                                {getScore(currentPosition.distanceTo(position) / 1000).toFixed(0)}
                            </Heading>
                            <Text fontSize="md">ポイント</Text>
                        </HStack>
                        <VStack alignItems="baseline" w="inline">
                            <HStack>
                                <Text>正解：</Text>
                                <Badge fontSize="lg" whiteSpace="break-spaces">
                                    {address.details?.prefecture} {address.details?.city} {address.details?.address}
                                </Badge>
                            </HStack>
                            <HStack>
                                <Text>誤差：</Text>
                                <Badge fontSize="lg">
                                    {(currentPosition.distanceTo(position) / 1000).toFixed(3)}km
                                </Badge>
                            </HStack>
                        </VStack>
                    </Wrap>
                ) : (
                    <HStack justify="end">
                        <Heading fontSize="md" alignItems="center">残り時間</Heading>
                        <Badge fontSize="lg">
                            {Math.floor(timer / 60)}：{`0${Math.floor(timer % 60)}`.slice(-2)}
                        </Badge>
                        <Flex m="5pt"/>
                        <Button colorScheme='teal' variant='outline' onClick={showResult}
                                disabled={!playing}>決定!</Button>
                    </HStack>
                )
            }
        </Box>
    )
};
