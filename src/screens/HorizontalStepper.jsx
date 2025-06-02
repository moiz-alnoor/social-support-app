/**
 * HorizontalStepper - Main controller for multi-step form.
 *
 * Responsibilities:
 * - Displays step-wise form using MUI Stepper
 * - Controls next/back navigation
 * - Renders each step component based on `activeStep`
 * - Shows a summary or completion message at the end
 *
 * Dependencies:
 * - PersonalInformation
 * - FamilyAndFinancialInfo
 * - FinancialSituationDescriptions
 * - FormContext (for shared state)
 */

import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonalInformation from "../components/from/PersonalInformation";
import FamilyAndFinancialInfo from "../components/from/FamilyAndFinancialInformation";
import FinancialSituationDescriptions from "../components/from/FinancialSituationDescriptions";
import { useTranslation } from "react-i18next";
import { useFormContextData } from "../components/context/FormContext";
import certificationImg from "/assets/certificate.png";

const steps = [
  "personal_information",
  "family_financial_info",
  "situation_descriptions",
];

const personalInfoFields = [
  "name",
  "ID",
  "gender",
  "dateOfBirth",
  "email",
  "phone",
  "address",
  "city",
  "state",
  "country",
];

const familyFinancialFields = [
  "maritalStatus",
  "employmentStatus",
  "housingStatus",
  "dependents",
  "monthlyIncome",
];

const situationFields = [
  "currentFinancialSituation",
  "employmentCircumstances",
  "reasonForApplying",
];

const HorizontalStepper = () => {
  const { t } = useTranslation();
  const { handleSubmit, trigger, getValues } = useFormContextData();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let isValid = true;
    switch (activeStep) {
      case 0:
        isValid = await trigger(personalInfoFields);
        break;
      case 1:
        isValid = await trigger(familyFinancialFields);
        break;
      case 2:
        isValid = await trigger(situationFields);
        break;
      default:
        isValid = true;
    }

    if (!isValid) return;

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    activeStep === steps.length - 1 &&
      handleSubmit(() => {
        /**
         * handleSubmit callback:
         * This method will be called on the final step to submit the form.
         * Place your API call here to send the collected form data to your backend.
         * Example:
         *   await api.submitForm(values);
         * You can also handle success/error notifications here.
         */
        const payLoad = getValues();
        console.log("Form data", payLoad);
      })();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalInformation />;
      case 1:
        return <FamilyAndFinancialInfo />;
      case 2:
        return <FinancialSituationDescriptions />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        width: "80%",
        justifyContent: "center",
        marginInline: "auto",
        marginTop: 5,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{t(label)}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Box sx={{ mt: 11, textAlign: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={certificationImg}
                alt="Certification"
                style={{ width: "210px", height: "250px" }}
              />
            </Box>
            <Typography variant="h6" sx={{ mt: 2 }}>
              {t("finished!")}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>{t("back")}</Button>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ mt: 5 }}>{renderStepContent(activeStep)}</Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              justifyContent: "center",
            }}
          >
            <Button
              color="inherit"
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              {t("back")}
            </Button>
            <Box />
            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? t("finish") : t("next")}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
export default HorizontalStepper;
