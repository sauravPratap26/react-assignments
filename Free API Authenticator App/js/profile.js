import { BASE_URL } from "./config.js";

const profile = document.getElementById("profile");

const logoutBtn = document.getElementById("logoutBtn");

const accessToken = localStorage.getItem("accessToken");

async function getCurrentUser() {
  try {
    const response = await fetch(`${BASE_URL}/current-user`, {
      method: "GET",

      headers: {
        accept: "application/json",

        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      window.location.href = "./login.html";
      return;
    }

    profile.innerHTML = `
      <h2>${data.data.username}</h2>
      <p>${data.data.email}</p>
      <p>${data.data.role}</p>
    `;
  } catch (error) {
    console.log(error);
  }
}

getCurrentUser();

logoutBtn.addEventListener("click", async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  await fetch(`${BASE_URL}/logout`, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // clear tokens
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  window.location.href = "./login.html";
});
