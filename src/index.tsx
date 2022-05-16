import React from 'react';
import ReactDOM from 'react-dom/client';
import {ColorModeScript, ChakraProvider, extendTheme, Heading} from "@chakra-ui/react";
import {App} from "./App";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const theme = extendTheme({
    fonts: {
        heading: "DotGothic16, sans-serif;",
        body: "DotGothic16, sans-serif;"
    },
    config: {
        initialColorMode: 'system',
        useSystemColorMode: true,
    },
    breakpoints: ["0px", "443px", "600px"]
})

root.render(
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <App/>
    </ChakraProvider>
);
