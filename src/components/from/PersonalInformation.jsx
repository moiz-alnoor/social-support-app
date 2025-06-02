import {
  TextField,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Select,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { personalInfoValidationRules } from "../../helpers/formValidation";
import { useFormContextData } from "../context/FormContext";

const PersonalInformation = () => {
  const { t, i18n } = useTranslation();
  const { control } = useFormContextData();
  const validationRules = personalInfoValidationRules(t);

  // Helper for rendering TextField controllers
  const renderTextField = (name, label, rules, type = "text") => (
    <Controller
      key={name}
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          label={t(label)}
          aria-label={t(label)}
          type={type}
          {...field}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          sx={{ m: 1, width: 245 }}
        />
      )}
    />
  );

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& .MuiTextField-root": { m: 1, width: 245 },
      }}
      noValidate
      autoComplete="off"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      {renderTextField("name", "name", validationRules.name)}
      {renderTextField("ID", "ID", validationRules.ID)}
      <Controller
        name="gender"
        control={control}
        defaultValue=""
        rules={validationRules.gender}
        render={({ field, fieldState }) => (
          <FormControl error={!!fieldState.error} sx={{ m: 1, width: 245 }}>
            <InputLabel id="gender-label">{t("gender")}</InputLabel>
            <Select
              labelId="gender-label"
              id="gender-select"
              label={t("gender")}
              aria-label={t("gender")}
              {...field}
            >
              <MenuItem value="">
                <em>{t("none")}</em>
              </MenuItem>
              <MenuItem value={0}>{t("male")}</MenuItem>
              <MenuItem value={1}>{t("female")}</MenuItem>
            </Select>
            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name="dateOfBirth"
          control={control}
          rules={validationRules.dateOfBirth}
          render={({ field, fieldState }) => (
            <DatePicker
              label={t("dateOfBirth")}
                 aria-label={t("dateOfBirth")}
              value={field.value}
              onChange={field.onChange}
              slotProps={{
                textField: {
                  sx: { m: 1, width: 245 },
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message,
                },
              }}
            />
          )}
        />
      </LocalizationProvider>
      {renderTextField("email", "email", validationRules.email)}
      {renderTextField("phone", "phone", validationRules.phone)}
      {renderTextField("address", "address", validationRules.address)}
      {renderTextField("city", "city", validationRules.city)}
      {renderTextField("state", "state", validationRules.state)}
      {renderTextField("country", "country", validationRules.country)}
    </Box>
  );
};

export default PersonalInformation;
