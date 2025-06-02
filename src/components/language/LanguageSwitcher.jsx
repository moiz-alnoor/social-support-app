import { useTranslation } from "react-i18next";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
      <ButtonGroup
        size="medium"
        disableElevation
        variant="outlined"
        aria-label="Disabled button group"
      >
        <Button sx={{ width: 120 }} onClick={() => changeLanguage("en")}>
          English
        </Button>
        <Button sx={{ width: 120 }} onClick={() => changeLanguage("ar")}>
          عربي
        </Button>
      </ButtonGroup>
    </Box>
  );
};
export default LanguageSwitcher;
