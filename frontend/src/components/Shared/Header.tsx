import { Button, IconButton, MenuItem, Select, Stack, type SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme, type Theme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LightModeIcon from '@mui/icons-material/LightMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import type { HeaderEntry } from "../../types/Header";
import type React from "react";

const selectStyling = (theme: Theme) => { return {
    margin: "0px 15px 0px 15px",
    boxShadow: `${theme.palette.text.secondary} 0px 0px 0px 1px`,
    borderColor: "text.secondary",
    height: "70%", width: "auto", aspectRatio: "1 / 1",
    borderRadius: "5px", padding: "0",
    '& .MuiSelect-icon': {
        padding: "0", margin: "0",
        height: "50%", width: "50%", transform: "translate(-50%, -50%)",
        transition: "none", top: "50%", left: "50%"
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
}}

const headerItems: HeaderEntry[] = [
    {link: "/", label: "Home Page"},
    {link: "/GridRecall", label: "Grid Recall"}
];

const GithubButton: React.FC = () => {
    const theme = useTheme();

    return (
        <Link to="https://github.com/Jackson-Wozniak/TheMentalMetric" target="_blank"
            style={{height: "100%", display: "flex", alignItems: "center", }}>
            <IconButton
                sx={{
                    margin: "0px 15px 0px 15px",
                    borderRadius: "5px",
                    border: "none",
                    boxShadow: `${theme.palette.text.secondary} 0px 0px 0px 1px`,
                    width: "auto",
                    height: "70%",
                    padding: "10px",
                }}
            ><GitHubIcon sx={{ height: "100%", width: "auto" }} /></IconButton>
        </Link>
    )
}

const HeaderLink: React.FC<{item: HeaderEntry}> = ({item}) => {
    return (
        <Button component={Link} to={item.link} sx={{textDecoration: "none", color: "primary.main"}}>
            {item.label}
        </Button>
    )
}

const Header: React.FC<{
    setMode: (mode: 'light' | 'dark') => void
}> = ({setMode}) => {
    const theme = useTheme();

    function handleModeSwitch(e: SelectChangeEvent<'light' | 'dark'>){
        e.preventDefault();
        setMode(e.target.value);
    }

    if(theme.display === 'mobile'){
        return (
            <Box width="100%" height="10%" sx={{backgroundColor: theme.palette.background.secondary}}
                display="flex" justifyContent="space-between" alignItems="center"
            >
                <Select value="" IconComponent={FormatListBulletedIcon} sx={selectStyling}>
                    {headerItems.map((item: HeaderEntry, index: number) => {
                        return (
                            <MenuItem key={index}><HeaderLink item={item}/></MenuItem>
                        )
                    })}
                </Select>

                <Box display="flex" alignItems="center" gap={2} height="100%">
                    <Select onChange={handleModeSwitch} value="" IconComponent={LightModeIcon} sx={selectStyling}>
                        <MenuItem value="light">Light</MenuItem>
                        <MenuItem value="dark">Dark</MenuItem>
                    </Select>
                    <GithubButton/>                   
                </Box>
            </Box>
        )
    }

    return (
        <Box width="100%" height="10%" sx={{backgroundColor: theme.palette.background.secondary}}
            display="flex" justifyContent="space-between" alignItems="center"
        >
            <Stack direction="row" display="flex" justifyContent="space-evenly" margin={1} gap={1}>
                {headerItems.map((item: HeaderEntry, index: number) => {
                    return (
                        <HeaderLink key={index} item={item}/>
                    )
                })}
            </Stack>
            <Box display="flex" alignItems="center" gap={2} height="100%">
                <Select onChange={handleModeSwitch} value="" IconComponent={LightModeIcon} sx={selectStyling}>
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                </Select>
                <GithubButton/>        
            </Box>
        </Box>
    )
}

export default Header;