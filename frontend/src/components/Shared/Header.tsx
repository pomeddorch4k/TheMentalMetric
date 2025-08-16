import Box from "@mui/material/Box";
import { Colors } from "../../themes/ThemeColors";
import { HeaderStyle } from "../../themes/SharedStyles";

const Header: React.FC<{mode: 'light' | 'dark'}> = ({mode}) => {
    return (
        <Box width="100%" height="10%" sx={mode === 'light' ? HeaderStyle.light : HeaderStyle.dark}>

        </Box>
    )
}

export default Header;