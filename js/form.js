// ====== KONFIGURASI SUPABASE ======
const SUPABASE_URL = 'https://scjhaagfrzrivnjomvfw.supabase.co'; // Ganti dengan punyamu
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjamhhYWdmcnpyaXZuam9tdmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzAxMzEsImV4cCI6MjA2NzU0NjEzMX0.HvLwUa_G9KrE1Ot8OtIhAhAYX12thSuDNyMZWt9NE9w';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ====== CEK LOGIN SAAT LOAD ======
let currentUser = null;

document.addEventListener("DOMContentLoaded", async () => {
  const { data: sessionData, error } = await supabase.auth.getSession();
  if (!sessionData?.session) {
    alert("Kamu harus login dulu yaaa~");
    window.location.href = "index.html";
    return;
  }

  currentUser = sessionData.session.user;
});

// ====== HANDLE SUBMIT FORM ======
async function handleFormSubmit(event) {
  event.preventDefault();

  if (!currentUser) {
    alert("User belum login!");
    return;
  }

  const tanggal = document.getElementById("tanggal").value;
  const menu = document.getElementById("menu").value.trim();
  const jarak = parseFloat(document.getElementById("jarak").value);
  const catatan = document.getElementById("catatan").value.trim();
  const link = document.getElementById("link").value.trim();

  const { data, error } = await supabase
    .from("progress_latihan")
    .insert([{
      user_id: currentUser.id,
      tanggal: tanggal,
      menu_latihan: menu,
      jarak_km: jarak,
      catatan: catatan,
      link_strava: link
    }]);

  if (error) {
    alert("Gagal menyimpan data: " + error.message);
  } else {
    alert("Berhasil disimpan 🥳");
    document.getElementById("form-latihan").reset();
  }
}
