
# 🤖 Google Form AI Auto-Responder using Gemini API + Apps Script

This project demonstrates how to automatically reply to Google Form submissions using Google Apps Script and the **Gemini 1.5 Flash API**. It was built as part of a real-world AI coding challenge to test skills in automation, LLM integration, and cloud scripting — **no backend server required**!

---

## 🚀 Overview

- 📬 **Auto-reply system** for Google Form submissions
- 💡 **LLM-powered answers** generated using Google’s Gemini API
- 🛠 Built entirely in **Google Apps Script**
- ⚡ Emails are sent **within seconds** of form submission

---

## 🧠 Use Case

This system is designed to reply to questions about **machine learning** submitted through a public form, instantly generating human-like answers and emailing them back.

---

## ✅ Requirements

| Tool/API             | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| **Google Account**    | Must be a personal account (not school/org)                                |
| **Google Apps Script**| Used to automate email sending and API calls                               |
| **Gemini API (Free)** | LLM API to generate answers from form-submitted questions ([Get Key](https://aistudio.google.com/app/apikey)) |

---

## 📝 Google Form Setup

| Field          | Type               |
|----------------|--------------------|
| `Email`        | Short answer (email format) |
| `Question`     | Paragraph or short answer   |

- Title: `Form_YourName` (e.g., `Form_Cherotich_Faith`)
- Must contain only **two fields** as above
- Ensure it's **publicly accessible** to receive responses
- Enable a **form submission trigger** in Apps Script

---

## 📤 Email Sending Logic

- ✅ Trigger: **Form Submit**
- ✅ Subject: `"Reply for your question"`
- ✅ Recipient: Value from `Email` field
- ✅ Content: Response from Gemini 1.5 Flash based on user question

---

## 🧩 Code (Apps Script)

```javascript
const GEMINI_API_KEY = "YOUR_API_KEY_HERE";  // Replace with your Gemini API key

function onFormSubmit(e) {
  const email = e.values[1];         // "Email" - second column
  const question = e.values[2];      // "Question" - third column

  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const payload = {
    contents: [{ parts: [{ text: question }] }]
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    Logger.log("Gemini API response: " + response.getContentText());

    let reply = "Sorry, we couldn't generate a response.";
    const parts = result?.candidates?.[0]?.content?.parts;
    if (parts?.[0]?.text) reply = parts[0].text;

    MailApp.sendEmail({
      to: email,
      subject: "Reply for your question",
      body: reply,
    });

    Logger.log("Reply sent to: " + email);
  } catch (err) {
    Logger.log("Error occurred: " + err.message);
  }
}
````

---

## 🛠 Setup Instructions

1. Create a [Google Form](https://docs.google.com/forms/)
2. Open the linked **Google Sheet**
3. Go to **Extensions → Apps Script**
4. Paste the code above into `Code.gs`
5. Replace `YOUR_API_KEY_HERE` with your [Gemini API key](https://aistudio.google.com/app/apikey)
6. Set up the **Trigger**:

   * Go to **Triggers → Add Trigger**
   * Choose: `onFormSubmit` → "From form" → "On form submit"
7. Test your form — an AI-powered email reply should arrive!

---

## 📈 Status & Performance

| Metric     | Value                               |
| ---------- | ----------------------------------- |
| Executions | 12+                                 |
| Users      | 1 (test)                            |
| Error Rate | 5–25% (debugging phase, now stable) |

---

## 📮 Example

[🔗 Try the live form here](https://forms.gle/hNACqmNuqD1t81VdA))
*Submit a question about machine learning and get an LLM-generated answer instantly!*

---

## 📌 Tags

`#AI` `#GeminiAPI` `#GoogleForms` `#AppsScript` `#LLM` `#PromptEngineering` `#WomenInTech` `#Automation`

```

Let me know if you want a separate `LICENSE`, `demo.gif`, or to turn this into a deployable Apps Script project structure.
```
