import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function FormDialog({
  open,
  onClose,
  onSave,
  suggestedText,
  label,
}) {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);

  // Reset text and typing index when dialog opens or suggestion changes
  useEffect(() => {
    if (open && suggestedText) {
      setText("");
      setTypingIndex(0);
    }
  }, [open, suggestedText]);

  // Animate typing effect for suggestedText
  useEffect(() => {
    if (suggestedText && typingIndex < suggestedText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + suggestedText[typingIndex]);
        setTypingIndex((prev) => prev + 1);
      }, 25);
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, suggestedText]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(text);
  };

  const typingInProgress = typingIndex < (suggestedText?.length || 0);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      PaperProps={{
        sx: {
          width: { xs: "79.6%", sm: "79.6%" },
          height: { xs: "80%", sm: "47%" },
          maxWidth: "none",
        },
      }}
    >
      <DialogTitle>
        {typingInProgress ? t("typing") : t("feelFreeToEdit")}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          multiline
          rows={7}
          fullWidth
          label={label || t("yourText")}
          aria-label={t("yourText")}
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ width: "100%" }}
        />
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}
        >
          <Button type="submit" variant="contained" disabled={typingInProgress}>
            {t("Accept")}
          </Button>
          <Button onClick={onClose}>{t("Discard")}</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
