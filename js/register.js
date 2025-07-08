import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = 'https://uvwvnxysnyqnvchzzkjg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2d3ZueHlzbnlxbnZjaHp6a2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODQ3MTEsImV4cCI6MjA2NzU2MDcxMX0.jxyo6TOoJnnkuhtc-YGjO3cMSjIoR95IUznSDjEB_ko';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fungsi Daftar
window.handleRegister = async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();
  const username = document.getElementById("username").value.trim();
  const errorBox = document.getElementById("error");
  errorBox.textContent = "";

  // Validasi password cocok
  if (password !== confirmPassword) {
    errorBox.textContent = "Password dan konfirmasi password tidak sama.";
    return;
  }

  // Sign up ke Supabase Auth
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    errorBox.textContent = "Gagal daftar: " + signUpError.message;
    return;
  }

  // Ambil ID user dari hasil signup
  const userId = signUpData.user?.id;
  if (!userId) {
    errorBox.textContent = "Gagal mendapatkan ID user.";
    return;
  }

  // Simpan username ke tabel profiles
  const { error: insertError } = await supabase.from("profiles").insert([
    {
      id: userId,
      username: username,
      created_at: new Date().toISOString(),
    },
  ]);

  if (insertError) {
    errorBox.textContent = "Gagal menyimpan data profil: " + insertError.message;
    return;
  }

  alert("Berhasil daftar! Silakan cek email untuk konfirmasi.");
  window.location.href = "index.html";
};
