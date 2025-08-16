import { createTheme, type Theme } from "@mui/material/styles";
import "@mui/material/styles";

export const LightTheme = (displayType: 'desktop' | 'mobile' = 'desktop'): Theme => createTheme({
    palette : {
        mode: 'light',
        background : {
            primary: "white",
            secondary: "whitesmoke",
            accent: "grey"
        }
    },
    display: displayType
});

export const DarkTheme = (displayType: 'desktop' | 'mobile' = 'desktop'): Theme => createTheme({
    palette : {
        mode: 'dark',
        background : {
            primary: "#0d1117",
            secondary: "#151b23",
            accent: "grey"
        }
    },
    display: displayType
});