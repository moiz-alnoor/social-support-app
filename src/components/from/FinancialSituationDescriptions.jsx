import { useState } from "react";
import { TextField, Box, Button, Alert, Stack } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

import { useOpenAIChat } from "../../hooks/useOpenAIChat";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useFormContextData } from "../context/FormContext";
import { situationValidationRules } from "../../helpers/formValidation";

import CloseIcon from '@mui/icons-material/Close';
import FormDialog from "./DialogBox";
import Loader from "../loader";

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

const FinancialSituationDescriptions = () => {
  
  const { t } = useTranslation();
  const rules = situationValidationRules(t);
  const { control, setValue } = useFormContextData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [color, setColor] = useState("#2A76D2");
  const [label, setLabel] = useState("");
  const [open, setOpen] = useState(true);
  const [apiHasError, setApiHasError] = useState(false);
  const { generateResponse , loading, error} = useOpenAIChat();

  const handleHelpMeWrite = async (field) => {
    setActiveField(field.name);
    setApiHasError(false);
    const generated = await generateResponse(t(field.helpText));
    if (generated) {
      setSuggestion(generated);
      setLabel(field.label);
      setDialogOpen(true);
   
    } else {
      console.log(generated)
      setApiHasError(true);
      setOpen(true);
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
    <Box>
      <Loader color={color} loading={loading} size={50} />
      { apiHasError ? <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setApiHasError(false);
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {t(error)}
        </Alert>
      </Collapse>
      </Box> : null }

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
    </Box>
  );
};

export default FinancialSituationDescriptions;
