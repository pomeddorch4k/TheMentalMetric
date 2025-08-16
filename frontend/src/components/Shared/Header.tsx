import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

const Header: React.FC<{
    setMode: (mode: 'light' | 'dark') => void
}> = ({setMode}) => {
    const theme = useTheme();

    return (
        <Box width="100%" height="10%" sx={{backgroundColor: theme.palette.background.secondary}}>
            
        </Box>
    )
}

export default Header;