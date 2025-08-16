import { useState } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import ContentContainer from './ContentContainer';

const Page: React.FC<{children?: React.ReactNode}> = ({children}) => {
    const [mode, setMode] = useState<"light" | "dark">("light");
    const [displayType, setDisplayType] = useState<"monitor" | "mobile">("monitor");

    return (
        <Box width="100%" height="100%">
            <Header mode={mode}/>
            <ContentContainer mode={mode}>{children}</ContentContainer>
        </Box>
    )
}

export default Page;