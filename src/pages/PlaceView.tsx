import React, {useMemo, useRef, useState} from 'react';
import {MapContainer, Marker, Polyline, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Leaflet, {LatLng, Marker as Mark, Map, LatLngBounds} from "leaflet";
import {Address} from "../address/Address";
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
    Text,
    VStack
} from "@chakra-ui/react";
import {getScore, Stage} from "../GameResult";

Leaflet.Icon.Default.imagePath =
    '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/';

const mapStyle = {
    maxWidth: "100%",
    aspectRatio: "3/2",
    margin: "10pt"
}

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

    if (address == null) return <Center style={mapStyle} m="10pt"><Spinner size="xl"/></Center>;

    const position = new LatLng(address.coordinate.latitude, address.coordinate.longitude);
    const zoom = 5;

    const blueIcon = new Leaflet.Icon({
        iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
    });

    const greenIcon = new Leaflet.Icon({
        iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF"
    });

    const showResult = () => {
        endTrialAction(new Stage(address, currentPosition.distanceTo(position) / 1000));

        const map = mapRef.current;
        if (map == null) return;
        const bound = new LatLngBounds(currentPosition, position);
        map.fitBounds(bound, {padding: [50, 50]});
    }

    return (
        <Box m="10pt">
            <MapContainer ref={mapRef}
                          center={defaultPosition} zoom={zoom} style={mapStyle}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker eventHandlers={markerEventHandlers} ref={markerRef}
                        position={currentPosition} draggable={playing} autoPan/>
                {
                    !playing ? (
                        <>
                            <Marker position={position}>
                                ({address.coordinate.latitude}, {address.coordinate.longitude})
                            </Marker>
                            <Polyline positions={[currentPosition, position]}/>
                        </>
                    ) : ""
                }
            </MapContainer>
            {
                !playing ? (
                    <Center>
                        <HStack>
                            <Heading size="lg">
                                {getScore(currentPosition.distanceTo(position) / 1000).toFixed(0)}
                            </Heading>
                            <Text fontSize="md">ポイント</Text>
                        </HStack>
                        <Flex m="5pt"/>
                        <VStack alignItems="baseline" w="inline">
                            <HStack>
                                <Text>正解：</Text>
                                <Badge fontSize="lg">
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
                    </Center>
                ) : (
                    <Flex>
                        <Spacer/>
                        <Button colorScheme='teal' variant='outline' onClick={showResult}
                                disabled={!playing}>決定!</Button>
                    </Flex>
                )
            }
        </Box>
    )
};
