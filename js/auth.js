// ======================================
// KONFIGURASI SUPABASE
// ======================================
const SUPABASE_URL = 'https://scjhaagfrzrivnjomvfw.supabase.co'; // GANTI DENGAN PUNYAMU
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjamhhYWdmcnpyaXZuam9tdmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzAxMzEsImV4cCI6MjA2NzU0NjEzMX0.HvLwUa_G9KrE1Ot8OtIhAhAYX12thSuDNyMZWt9NE9w';       // GANTI DENGAN ANON KEY
const supabase = window.Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ======================================
// HANDLE LOGIN
// ======================================
async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Email dan password wajib diisi!");
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Login gagal: " + error.message);
  } else {
    localStorage.setItem("userEmail", email); // Simpan untuk ditampilkan
    window.location.href = "dashboard.html"; // Arahkan ke dashboard
  }
}

// ======================================
// CEK LOGIN SAAT LOADING PAGE
// ======================================
async function checkAuthAndRedirect() {
  const { data, error } = await supabase.auth.getSession();
  if (!data.session) {
    window.location.href = "index.html"; // Paksa login ulang
  }
}

// ======================================
// LOGOUT USER
// ======================================
async function logout() {
  await supabase.auth.signOut();
  localStorage.removeItem("userEmail");
  window.location.href = "index.html";
}

// ======================================
// (OPSIONAL) HANDLE REGISTER
// ======================================
async function handleRegister(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert("Gagal daftar: " + error.message);
  } else {
    alert("Pendaftaran berhasil! Silakan login.");
    window.location.href = "index.html";
  }
}
