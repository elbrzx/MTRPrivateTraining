function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Simulasi login - replace dengan Supabase Auth
  if (email && password) {
    localStorage.setItem("userEmail", email);
    window.location.href = "dashboard.html";
  } else {
    alert("Email dan password harus diisi!");
  }
}
