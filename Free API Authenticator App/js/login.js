import { BASE_URL } from "./config.js";

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);

  const userData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(userData),
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      throw new Error(data.message);
    }

    // save tokens
    localStorage.setItem("accessToken", data.data.accessToken);

    localStorage.setItem("refreshToken", data.data.refreshToken);

    message.innerText = "Login successful";

    window.location.href = "./profile.html";
  } catch (error) {
    message.innerText = error.message;
  }
});
