import { useEffect, useState } from "react";
import HorizontalStepper from "./screens/HorizontalStepper";
import LanguageSwitcher from "./components/language/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CustomFormProvider } from "./components/context/FormContext";

// 👇 Helper function to create theme based on direction
const getTheme = (direction = "ltr") =>
  createTheme({
    direction,
    palette: {
      mode: "light",
    },
  });

// 👇 Helper function to create RTL/LTR Emotion cache
const createEmotionCache = (direction = "ltr") =>
  createCache({
    key: direction === "rtl" ? "muirtl" : "muiltr",
    stylisPlugins: direction === "rtl" ? [prefixer, rtlPlugin] : [],
  });

function App() {
  const { i18n } = useTranslation();
  const [direction, setDirection] = useState(i18n.dir());
  const [theme, setTheme] = useState(getTheme(direction));
  const [cache, setCache] = useState(createEmotionCache(direction));

  useEffect(() => {
    const dir = i18n.dir();
    document.body.dir = dir;
    setDirection(dir);
    setTheme(getTheme(dir));
    setCache(createEmotionCache(dir));
  }, [i18n.language]);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <LanguageSwitcher />
        <CustomFormProvider>
          <HorizontalStepper />
        </CustomFormProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
