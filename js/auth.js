// ======================================
// KONFIGURASI SUPABASE
// ======================================
const SUPABASE_URL = 'https://scjhaagfrzrivnjomvfw.supabase.co'; // GANTI DENGAN PUNYAMU
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjamhhYWdmcnpyaXZuam9tdmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzAxMzEsImV4cCI6MjA2NzU0NjEzMX0.HvLwUa_G9KrE1Ot8OtIhAhAYX12thSuDNyMZWt9NE9w';       // GANTI DENGAN ANON KEY
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert("Gagal login: " + error.message);
  } else {
    localStorage.setItem("userEmail", email);
    window.location.href = "dashboard.html";
  }
}
