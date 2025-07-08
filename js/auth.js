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
  // GANTI dengan info kamu dari Supabase
const SUPABASE_URL = 'https://scjhaagfrzrivnjomvfw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjamhhYWdmcnpyaXZuam9tdmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzAxMzEsImV4cCI6MjA2NzU0NjEzMX0.HvLwUa_G9KrE1Ot8OtIhAhAYX12thSuDNyMZWt9NE9w';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

}
