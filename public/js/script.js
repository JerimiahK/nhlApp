const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = $("#userLoginEmail").val();
  const password = $("#userLoginPassword").val();
  if (email && password) {
    const response = await fetch("/pages/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/home");
    } else {
      console.log(response.statusText);
    }
  }
};

const logout = async () => {
  const response = await fetch("/pages/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/home");
  } else {
    alert(response.statusText);
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  const email = $("#userSignUpEmail").val();
  const password = $("#userSignUpPassword").val();
  if (email && password) {
    const response = await fetch("/pages/users", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/home");
    } else {
      alert(response.statusText);
    }
  }
};

$("#loginForm").on("submit", loginFormHandler);
$("#logoutBtn").on("click", logout);
$("#signUpForm").on("submit", signupFormHandler);
