import React from "react";

interface Theme {
    name: string;
    value: string;
};

const LIGHT: Theme = {
    name: "בהיר",
    value: "light",
};

const DARK: Theme = {
    name: "כהה",
    value: "dark",
};

const SYSTEM: Theme = {
    name: "ברירת המחדל של המערכת",
    value: null,
};

export const Theme = { LIGHT, DARK, SYSTEM };

export const ThemeContext = React.createContext({
    theme: SYSTEM,
    changeTheme: (nextTheme: Theme) => {},
});