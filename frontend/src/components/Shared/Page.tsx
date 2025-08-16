import { useState } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import Header from './Header';
import ContentContainer from './ContentContainer';
import { DarkTheme, LightTheme } from '../../themes/Theme';

const Page: React.FC<{children?: React.ReactNode}> = ({children}) => {
    const [mode, setMode] = useState<"light" | "dark">("light");
    const [displayType, setDisplayType] = useState<"desktop" | "mobile">("desktop");

    //should be using theme.palette.mode so it can be passed to child components easily
    return (
        <ThemeProvider theme={mode === 'light' ? LightTheme(displayType) : DarkTheme(displayType)}>
            <Box width="100%" height="100%">
                <Header setMode={setMode}/>
                <ContentContainer>{children}</ContentContainer>
            </Box>
        </ThemeProvider>
    )
}

export default Page;