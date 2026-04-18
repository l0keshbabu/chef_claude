# 🍳 Chef Claude — AI Recipe Generator

Chef Claude is a smart web application that generates personalized recipes based on the ingredients you have, with optional cuisine selection for more tailored results.

---

## 🚀 Features

* 🥗 Add ingredients dynamically
* 🌍 Select preferred cuisine (Indian, Italian, Chinese, etc.)
* 🤖 AI-powered recipe generation using Groq API (LLaMA 3.1)
* 📜 Clean markdown-based recipe display
* ⚡ Smooth UI with auto-scroll to generated recipe
* 🎯 Smart prompt engineering for better recipe accuracy

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Styling:** CSS
* **AI Integration:** Groq API (LLaMA 3.1 model)
* **Markdown Rendering:** react-markdown

---

## 📂 Project Structure

```bash
CHEF CLAUDE/
│
├── public/
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── assets/
│   ├── ai.js
│   ├── Cheff.css
│   ├── Chef.js
│   ├── ClaudeRecipe.js
│   ├── IngredientsList.js
│   ├── App.test.js
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ How It Works

1. User enters ingredients
2. Optionally selects a cuisine
3. Ingredients + cuisine are sent to Groq API
4. AI generates a structured recipe in markdown
5. Recipe is rendered dynamically on the UI

---

## 🔑 Environment Setup

Create a `.env` file in the root directory and add:

```
REACT_APP_GROQ_API_KEY=your_api_key_here
```

---

## ▶️ Run the Project

```bash
npm install
npm start
```

---

## 💡 Example Use Case

* Input: `Eggs, Tomato, Onion`
* Cuisine: `Indian`
* Output: A structured Indian-style recipe with steps and ingredients

---

## 📈 Future Enhancements

* ⏳ Loading indicator during recipe generation
* ❌ Remove ingredient functionality
* 💾 Save recipe history
* 🎤 Voice input for adding ingredients
* 🧠 Smart cuisine suggestion based on ingredients

---

## 📌 Key Highlights

* Implemented prompt engineering to control AI output
* Integrated real-time API responses into UI
* Designed clean and responsive user interface
* Built modular and reusable React components

---

## 👨‍💻 Author

**Lokesh Babu**

---

## ⭐ Conclusion

Chef Claude demonstrates how AI can be integrated into real-world applications to enhance user experience by providing intelligent, dynamic, and personalized outputs.

---
