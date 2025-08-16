import { createTheme, type Theme } from "@mui/material/styles";
import "@mui/material/styles";

export const LightTheme = (displayType: 'desktop' | 'mobile' = 'desktop'): Theme => createTheme({
    palette : {
        primary: {
            main: "#0070c0",
            contrastText: "#1f1414"
        },
        secondary: {
            main: "#e2ee15",
            contrastText: "#000000"
        },
        mode: 'light',
        background : {
            primary: "white",
            secondary: "whitesmoke",
            accent: "grey"
        },
        text: {
            primary: "#000000",
            secondary: "#3d3d3d"
        }
    },
    display: displayType
});

export const DarkTheme = (displayType: 'desktop' | 'mobile' = 'desktop'): Theme => createTheme({
    palette : {
        primary: {
            main: "#0070c0",
            contrastText: "#ffffff"
        },
        secondary: {
            main: "#e2ee15",
            contrastText: "#797979ff"
        },
        mode: 'dark',
        background : {
            primary: "#0d1117",
            secondary: "#151b23",
            accent: "#2e2e2e"
        },
        text: {
            primary: "#ffffff",
            secondary: "#858585"
        }
    },
    display: displayType
});