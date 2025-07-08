// ============ KONFIG SUPABASE ============
const SUPABASE_URL = 'https://scjhaagfrzrivnjomvfw.supabase.co'; // GANTI DENGAN PUNYAMU
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjamhhYWdmcnpyaXZuam9tdmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzAxMzEsImV4cCI6MjA2NzU0NjEzMX0.HvLwUa_G9KrE1Ot8OtIhAhAYX12thSuDNyMZWt9NE9w';       // GANTI DENGAN ANON KEY
const supabase = window.Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============ HANDLE REGISTER ============
async function handleRegister(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const form = document.querySelector(".login-form");

  if (!email || !password) {
    alert("Email dan password wajib diisi");
    return;
  }

  // Tampilkan loading view
  form.innerHTML = "<p>Mohon tunggu... sedang mendaftarkan akun kamu ⏳</p>";

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    form.innerHTML = `
      <p style="color:red;">Gagal daftar: ${error.message}</p>
      <button onclick="location.reload()">Coba Lagi</button>
    `;
    return;
  }

  // ✅ Jika sukses, tampilkan pesan & tombol kembali ke login
  form.innerHTML = `
    <h2>Pendaftaran Berhasil! 🎉</h2>
    <p>Silakan cek email kamu untuk verifikasi, lalu login ke akunmu</p>
    <button onclick="window.location.href='index.html'" class="login-btn">Menuju Halaman Login</button>
  `;
}
