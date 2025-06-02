/**
 * FormContext - Provides state management for multi-step form.
 *
 * Contains personal, financial, and situational form data
 * shared across all stepper components.
 */

import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";

const CustomFormContext = createContext();
export const CustomFormProvider = ({ children }) => {
  const methods = useForm({
    defaultValues: {
      name: "",
      ID: "",
      gender: "",
      dateOfBirth: null,
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      country: "",
      maritalStatus: "",
      employmentStatus: "",
      housingStatus: "",
      dependents: "",
      monthlyIncome: "",
      currentFinancialSituation: "",
      employmentCircumstances: "",
      reasonForApplying: "",
    },
  });

  return (
    <CustomFormContext.Provider value={methods}>
      {children}
    </CustomFormContext.Provider>
  );
};

export const useFormContextData = () => useContext(CustomFormContext);
