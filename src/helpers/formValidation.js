// src/helpers/formValidation.js

export const personalInfoValidationRules = (t) => ({
  name: {
    required: t("requiredName"),
  },
  ID: {
    required: t("requiredID"),
    pattern: {
      value: /^784-\d{4}-\d{7}-\d{1}$/,
      message: t("invalidID"),
    },
  },
  gender: {
    required: t("requiredGender"),
  },
  dateOfBirth: {
    required: t("requiredDateOfBirth"),
  },
  email: {
    required: t("requiredEmail"),
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: t("invalidEmail"),
    },
  },
  phone: {
    required: t("requiredPhone"),
    pattern: {
      value: /^05\d{8}$/,
      message: t("invalidPhone"),
    },
  },
  address: {
    required: t("requiredAddress"),
  },
  city: {
    required: t("requiredCity"),
  },
  state: {
    required: t("requiredState"),
  },
  country: {
    required: t("requiredCountry"),
  },
});
export const familyFinancialValidationRules = (t) => ({
  maritalStatus: { required: t("requiredMaritalStatus") },
  employmentStatus: { required: t("requiredEmploymentStatus") },
  housingStatus: { required: t("requiredHousingStatus") },
  dependents: {
    required: t("requiredDependents"),
    min: { value: 0, message: t("invalidDependents") }, 
  },
  monthlyIncome: {
    required: t("requiredMonthlyIncome"),
    min: { value: 0, message: t("invalidMonthlyIncome") }, 
  },
});
export const situationValidationRules = (t) => ({
  currentFinancialSituation: { required: t("requiredCurrentFinancialSituation") },
  employmentCircumstances: { required: t("requiredEmploymentCircumstances") },
  reasonForApplying: { required: t("requiredReasonForApplying") },
});


