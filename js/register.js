const supabaseUrl = "https://scjhaagfrzrivnjomvfw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjamhhYWdmcnpyaXZuam9tdmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzAxMzEsImV4cCI6MjA2NzU0NjEzMX0.HvLwUa_G9KrE1Ot8OtIhAhAYX12thSuDNyMZWt9NE9w";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function handleRegister(event) {
  event.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const form = document.querySelector(".login-form");
  form.innerHTML = "<p>Mohon tunggu... sedang mendaftarkan akun kamu ⏳</p>";
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    form.innerHTML = `<p style="color:red;">Gagal daftar: ${error.message}</p><button onclick=\"location.reload()\">Coba Lagi</button>`;
    return;
  }
  form.innerHTML = `<h2>Pendaftaran Berhasil 🎉</h2><p>Silakan cek email kamu untuk verifikasi, lalu login ke akunmu</p><button onclick=\"window.location.href='index.html'\" class='login-btn'>Ke Login</button>`;
}
