// Credit
// https://markoskon.com/dark-mode-in-react/

import React, { useState, useContext, useCallback, createContext } from "react";
import { ThemeProvider as BaseThemeProvider } from "styled-components";

import { lightTheme, darkTheme } from "../../theme/Themes";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [themeString, setThemeString] = useState("dark");
  const themeObject = themeString === "dark" ? darkTheme : lightTheme;
  return (
    <ThemeContext.Provider value={{ themeString, setThemeString, themeObject }}>
      <BaseThemeProvider theme={themeObject}>{children}</BaseThemeProvider>
    </ThemeContext.Provider>
  );
};

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  const { themeString, setThemeString } = context;
  const themeToggle = useCallback(() => {
    if (themeString === "light") setThemeString("dark");
    else if (themeString === "dark") setThemeString("light");
  }, [themeString, setThemeString]);
  return {
    theme: themeString,
    themeToggle
  };
}

export { ThemeProvider, useTheme };
