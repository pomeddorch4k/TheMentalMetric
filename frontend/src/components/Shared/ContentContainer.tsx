import type React from "react";
import { ContentContainerStyle } from "../../themes/SharedStyles";
import Box from "@mui/material/Box";

const ContentContainer: React.FC<{
    children?: React.ReactNode, 
    mode: 'light' | 'dark'
}> = ({children, mode}) => {
    return (
        <Box width="100%" height="90%" sx={mode === 'light' ? ContentContainerStyle.light : ContentContainerStyle.dark}>
            {children}
        </Box>
    )
}

export default ContentContainer;