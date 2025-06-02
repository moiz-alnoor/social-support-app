import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  FormHelperText,
} from "@mui/material";
import { useFormContextData } from "../context/FormContext";
import { familyFinancialValidationRules } from "../../helpers/formValidation";

const selectFields = [
  {
    name: "maritalStatus",
    labelKey: "maritalStatus",
    requiredKey: "requiredMaritalStatus",
    options: [
      { value: "", labelKey: "none" },
      { value: "single", labelKey: "single" },
      { value: "married", labelKey: "married" },
      { value: "divorced", labelKey: "divorced" },
    ],
  },
  {
    name: "employmentStatus",
    labelKey: "employmentStatus",
    requiredKey: "requiredEmploymentStatus",
    options: [
      { value: "", labelKey: "none" },
      { value: "employed", labelKey: "employed" },
      { value: "unemployed", labelKey: "unemployed" },
      { value: "student", labelKey: "student" },
    ],
  },
  {
    name: "housingStatus",
    labelKey: "housingStatus",
    requiredKey: "requiredHousingStatus",
    options: [
      { value: "", labelKey: "none" },
      { value: "owned", labelKey: "owned" },
      { value: "rented", labelKey: "rented" },
      { value: "family", labelKey: "family" },
    ],
  },
];

const FamilyAndFinancialInfo = () => {
  const { control } = useFormContextData();
  const { t } = useTranslation();
  const rules = familyFinancialValidationRules(t);

  // Helper for rendering select fields
  const renderSelect = ({ name, labelKey, requiredKey, options }) => (
    <Controller
      key={name}
      name={name}
      control={control}
      defaultValue=""
      rules={rules[name]}
      render={({ field, fieldState }) => (
        <FormControl error={!!fieldState.error} sx={{ m: 1, width: 245 }}>
          <InputLabel id={`${name}-label`}>{t(labelKey)}</InputLabel>
          <Select
            labelId={`${name}-label`}
            id={`${name}-select`}
            label={t(labelKey)}
            aria-label={t(labelKey)}
            {...field}
          >
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                <em>{t(opt.labelKey)}</em>
              </MenuItem>
            ))}
          </Select>
          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {/* Select fields */}
      {selectFields.map(renderSelect)}
      <Controller
        name="dependents"
        control={control}
        rules={rules.dependents}
        render={({ field, fieldState }) => (
          <TextField
            label={t("dependents")}
            aria-label={t("dependents")}
            type="number"
            {...field}
            sx={{ m: 1, width: 245 }}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="monthlyIncome"
        control={control}
        rules={rules.monthlyIncome}
        render={({ field, fieldState }) => (
          <TextField
            label={t("monthlyIncome")}
            aria-label={t("monthlyIncome")}
            type="number"
            {...field}
            sx={{ m: 1, width: 245 }}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
    </Box>
  );
};

export default FamilyAndFinancialInfo;
