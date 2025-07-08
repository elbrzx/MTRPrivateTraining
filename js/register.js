const supabase = createClient(
  'https://uvwvnxysnyqnvchzzkjg.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2d3ZueHlzbnlxbnZjaHp6a2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODQ3MTEsImV4cCI6MjA2NzU2MDcxMX0.jxyo6TOoJnnkuhtc-YGjO3cMSjIoR95IUznSDjEB_ko'
);

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
