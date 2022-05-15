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
    }
})

root.render(
    <>
        <Heading>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=DotGothic16:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
        </Heading>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
            <App/>
        </ChakraProvider>
    </>
);
