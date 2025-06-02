# Social Support App

A multi-step React form app built with Vite, Material UI, and OpenAI integration for smart writing assistance.

---

## 📖 Architecture

For a detailed overview of the project structure, design decisions, and suggestions for future improvements, please read the [ARCHITECTURE.md](ARCHITECTURE.md) file in the project root.

---

## 🚀 How to Run the Project

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Add your OpenAI API Key:**

   - In a `.env` file in the project root.
   - Add  `YOUR_OPENAI_API_KEY` at YOUR-OPENAI-API-KEY
     
     REACT_APP_OPENAI_API_KEY=YOUR-OPENAI-API-KEY     
     ⚠️ Note: .env files should typically not be pushed to version control because they may contain sensitive information.
     However, for testing purposes, I pushed .env file (with no secrets included)**
     

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**

   ```
   http://localhost:5173
   ```

---

## 🔑 Setting Up the OpenAI API Key

- You need an OpenAI API key to use the AI writing assistant features.
- Get your API key from [OpenAI Dashboard](https://platform.openai.com/account/api-keys).
- Place your key in the `.env` file as shown above.
- **Never commit your API key to version control.**

---

## 🧪 How to Run Tests

If you have tests set up in this project, you can run them with:

```bash
npm test
```

or

```bash
npx jest
```

If you haven't set up tests yet, you can add Jest as a testing framework. See their documentation for setup instructions for React-Vite.

---

## 📝 Features

- Multi-step form for personal, financial, and situational data.
- AI-powered writing help for descriptive fields.
- Multilingual support (English & Arabic).
- Responsive Material UI design.

---

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [react-hook-form](https://react-hook-form.com/)
- [react-i18next](https://react.i18next.com/)
- [OpenAI API](https://platform.openai.com/docs/api-reference)

---

## 📂 Project Structure

```
src/
  component/      # Form steps, dialogs, context, stepper
  config/         # API and app configuration
  hooks/          # Custom React hooks (e.g., useOpenAIChat)
  locales/        # i18n translation files
  screens/        # Layout-level components
  App.jsx
  main.jsx
```

---

## 📢 Notes

- For production, secure your API key and consider using a backend proxy.
- Contributions and suggestions are welcome!
