import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = 'https://uvwvnxysnyqnvchzzkjg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2d3ZueHlzbnlxbnZjaHp6a2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODQ3MTEsImV4cCI6MjA2NzU2MDcxMX0.jxyo6TOoJnnkuhtc-YGjO3cMSjIoR95IUznSDjEB_ko';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Target ke elemen teks sapaan
const userEmailText = document.getElementById("user-email");

// Cek apakah user sudah login
const checkSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session || !session.user) {
    // Jika tidak ada session, balikin ke login
    window.location.href = "index.html";
    return;
  }

  const user = session.user;

  // Coba ambil username dari tabel profiles berdasarkan id user
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  if (profile && profile.username) {
    userEmailText.textContent = `Hai, ${profile.username}! 👋`;
  } else {
    userEmailText.textContent = `Hai, ${user.email}!`;
  }
};

checkSession();

// Fungsi Logout
window.logout = async () => {
  await supabase.auth.signOut();
  window.location.href = "index.html";
};
🧩 Koneksi dengan HTML (home.html)
Pastikan kamu punya ini:

html
Copy
Edit
<p id="user-email">Memuat data...</p>
<button onclick="logout()" class="login-btn">Logout</button>
