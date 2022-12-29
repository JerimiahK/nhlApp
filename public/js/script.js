const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log("hello");
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

$("#loginForm").on("submit", loginFormHandler);
