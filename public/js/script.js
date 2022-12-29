const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = $("#userLoginEmail").val();
  const password = $("#userLoginPassword").val();
  if (email && password) {
    const response = await fetch("/pages/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      document.location.replace("/home");
    } else {
      console.log(response.statusText);
    }
  }
};

$("#loginForm").on("submit", loginFormHandler);
