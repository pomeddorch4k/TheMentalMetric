import type React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const ContentContainer: React.FC<{
    children?: React.ReactNode
}> = ({children}) => {
    const theme = useTheme();

    return (
        <Box width="100%" height="90%" sx={{backgroundColor: theme.palette.background.primary}}>
            {children}
        </Box>
    )
}

export default ContentContainer;