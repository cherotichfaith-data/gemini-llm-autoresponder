const GEMINI_API_KEY = "INSERT YOUR GEMINI API HERE";

function onFormSubmit(e) {
  const email = e.values[1];
  const question = e.values[2];

  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: question
          }
        ]
      }
    ]
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const responseText = response.getContentText();
    Logger.log("Gemini API response: " + responseText);

    const result = JSON.parse(responseText);
    let reply = "Sorry, we couldn't generate a response.";

    if (result && result.candidates && result.candidates.length > 0) {
      const parts = result.candidates[0].content.parts;
      if (parts && parts.length > 0 && parts[0].text) {
        reply = parts[0].text;
      }
    }

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
