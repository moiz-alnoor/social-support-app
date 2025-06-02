import { useState } from "react";
import { TextField, Box, Button, Stack } from "@mui/material";
import { useOpenAIChat } from "../../hooks/useOpenAIChat";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useFormContextData } from "../context/FormContext";
import FormDialog from "./DialogBox";
import Loader from "../loader";
import { situationValidationRules } from "../../helpers/formValidation";

const fields = [
  {
    name: "currentFinancialSituation",
    label: "currentFinancialSituation",
    helpText: "helpText.currentFinancialSituation",
    helpButton: "helpMeWriteFinancialSituation",
  },
  {
    name: "employmentCircumstances",
    label: "employmentCircumstances",
    helpText: "helpText.employmentCircumstances",
    helpButton: "helpMeWriteCricumstances",
  },
  {
    name: "reasonForApplying",
    label: "reasonForApplying",
    helpText: "helpText.reasonForApplying",
    helpButton: "helpMeWriteReason",
  },
];

const SituationDescriptions = () => {
  const { t } = useTranslation();
  const rules = situationValidationRules(t);
  const { control, setValue } = useFormContextData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#2A76D2");
  const [label, setLabel] = useState("");
  const { generateResponse } = useOpenAIChat();

  const handleHelpMeWrite = async (field) => {
    setLoading(true);
    setActiveField(field.name);
    const generated = await generateResponse(t(field.helpText));
    if (generated) {
      setSuggestion(generated);
      setLabel(field.label);
      setDialogOpen(true);
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setActiveField(null);
  };

  const handleSaveDialog = (text) => {
    if (activeField) {
      setValue(activeField, text || "");
    }
    handleCloseDialog();
  };

  // Helper to render each field
  const renderField = (field) => (
    <Controller
      key={field.name}
      name={field.name}
      control={control}
      rules={rules[field.name]}
      render={({ field: ctrlField, fieldState }) => (
        <Stack spacing={1}>
          <TextField
            {...ctrlField}
            multiline
            rows={5}
            label={t(field.label)}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            sx={{ m: 1 }}
            focused={!!ctrlField.value}
          />
          <Box>
            <Button
              size="small"
              variant="contained"
              onClick={() => handleHelpMeWrite(field)}
            >
              {t(field.helpButton)}
            </Button>
          </Box>
        </Stack>
      )}
    />
  );

  return (
    <>
      <Loader color={color} loading={loading} size={50} />
      <FormDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveDialog}
        suggestedText={suggestion}
        label={t(label)}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {fields.map(renderField)}
      </Box>
    </>
  );
};

export default SituationDescriptions;
