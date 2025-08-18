import { Box, Button } from "@mui/material";
import ContentContainer from "../Shared/ContentContainer"
import GameGrid from "./GameGrid";
import { useState } from "react";

const GridRecallPage: React.FC = () => {
    const [level, setLevel] = useState<number>();
    
    return (
        <ContentContainer>
            <Box sx={{display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
                <Box width="50%">
                    <GameGrid/>
                </Box>
            </Box>
        </ContentContainer>
    )
}

export default GridRecallPage;