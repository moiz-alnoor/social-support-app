## 🏗️ Architecture & Design Notes

### 🎯 Project Overview

**Social Support App** is a multi-step form interface designed to collect structured user data across several categories such as personal info, family financial status, and situation descriptions. It uses React, React Context API, Material UI, and OpenAI API for enhanced UX support.

---

### 🧱 Architecture Breakdown

#### 1. **Component Layer**

Located in `src/component/`, this folder holds atomic and modular components used across form steps:

* `PersonalInformation.jsx` – Step 1: Collects user details.
* `FamilyFinancialInfo.jsx` – Step 2: Financial and family status.
* `SituationDescriptions.jsx` – Step 3: Descriptive input.
* `FormDialog.jsx` – Dialog/modal for AI writing help and user editing.
* `FormContext.jsx` – Shared context provider for form data and validation.
* `HorizontalStepper.jsx` – Orchestrates form steps and navigation.

#### 2. **Screen Layer**

Located in `src/screens/`, this folder is reserved for layout-level components that may control the app's navigation or wrap the stepper in the future.

#### 3. **State Management**

State is managed via `FormContext` using the React Context API, providing shared data access and validation methods across all steps without prop drilling.

#### 4. **Translation Layer**

Using `react-i18next` with translation files in `src/locales/`. This supports multilingual functionality (currently: `en`, `ar`).

#### 5. **AI Helper Integration**

OpenAI GPT is integrated to provide smart writing help for descriptive fields. This is handled via:

* `config/openaiConfig.js` – Central configuration for OpenAI.
* `hooks/useOpenAIChat.jsx` – Custom hook for interacting with OpenAI API.
* Triggered from form steps (optional logic you can expand).

#### 6. **Configuration & Utilities**

* `config/openaiConfig.js` – API endpoints, model, and header helpers for OpenAI.
* Utility functions and constants are documented with JSDoc for maintainability.

---

### 🔍 Key Design Decisions

| Decision Area | Choice            | Reason                                                             |
| ------------- | ----------------- | ------------------------------------------------------------------ |
| UI Library    | Material UI (MUI) | Robust components and theme support                                |
| Form State    | React Context     | Lightweight and ideal for multi-step form                          |
| Validation    | React Hook Form   | Efficient, scalable form validation                                |
| Translation   | i18next           | Industry standard, good React integration                          |
| AI Assistant  | GPT-3.5 via API   | Helps users fill descriptive fields                                |
| Routing       | React-Router      | App is single-page navigation                                      |

---

### ✅ Improvements for the Future

| Area                     | Suggestion                                                                  |
| ------------------------ | --------------------------------------------------------------------------- |
| Form Validation          | Use `React Hook Form` + `Yup` for better validation structure               |
| Better State Persistence | Store data in localStorage/sessionStorage to preserve state between reloads |
| User Authentication      | Add login and session logic if user-specific data is required               |
| Backend Integration      | Post submitted form to an API endpoint (e.g., Express or Firebase)          |
| Modular Step Definitions | Make steps dynamically configured from JSON or external config              |
| Mobile UX                | Improve mobile responsiveness with MUI's grid and responsive typography     |
| Error Handling           | Add user-friendly error messages and loading indicators                     |
| Testing                  | Add unit and integration tests for components and hooks                     |
| Documentation            | Expand JSDoc and in-code comments for custom hooks and context              |

---

### 📄 File & Folder Structure

```
src/
  component/           # Form steps, dialogs, context, stepper
  config/              # API and app configuration
  hooks/               # Custom React hooks (e.g., useOpenAIChat)
  locales/             # i18n translation files
  screens/             # (Reserved) Layout-level components
  App.jsx
  main.jsx
```

---

Let me know if you want this exported to a `.md` file or want help implementing any of the suggestions above!
