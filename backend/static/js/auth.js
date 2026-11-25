document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector("#login");
  const signupBtn = document.querySelector("#signup");

  loginBtn.addEventListener("click", () => handleOpenModa("login"));
  signupBtn.addEventListener("click", () => handleOpenSignup("signup"));
});

function handleOpenModa(mode = "login") {
  const modal = document.querySelector("#auth-modal");
  const closeBtn = document.querySelector("#close-btn");
  const loginForm = document.querySelector("#login-form");
  const signupForm = document.querySelector("#signup-form");

  closeBtn.addEventListener("click", () => handleCloseModal);

  modal.hidden = false;

  if (mode == "login") {
    loginForm.hidden = false;
  } else {
    signupForm.hidden = false;
  }
}

function handleCloseModal() {
  const modal = document.querySelector("#auth-modal");
  const loginForm = document.querySelector("#login-form");
  const signupForm = document.querySelector("#signup-form");
  modal.hidden = true;
  loginForm.hidden = true;
  signupForm.hidden = true;
}
