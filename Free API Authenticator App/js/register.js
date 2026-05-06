import { BASE_URL } from "./config.js";

const registerForm = document.getElementById("registerForm");

const message = document.getElementById("message");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(registerForm);

  const userData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    message.innerText = "Registration successful";
  } catch (error) {
    message.innerText = error.message;
  }
});
