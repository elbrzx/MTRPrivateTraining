import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = 'https://uvwvnxysnyqnvchzzkjg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2d3ZueHlzbnlxbnZjaHp6a2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODQ3MTEsImV4cCI6MjA2NzU2MDcxMX0.jxyo6TOoJnnkuhtc-YGjO3cMSjIoR95IUznSDjEB_ko';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fungsi submit form
async function handleForm(event) {
  event.preventDefault();

  // Ambil session Supabase untuk dapetin user_id
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session) {
    alert("Sesi tidak ditemukan, silakan login ulang.");
    window.location.href = "index.html";
    return;
  }

  const user_id = session.user.id;

  // Ambil nilai dari form
  const tanggal = document.getElementById("tanggal").value;
  const menu_id = document.getElementById("menu").value;
  const jarak_km = document.getElementById("jarak").value;
  const link_strava = document.getElementById("link_strava").value;

  // Simpan ke Supabase
  const { error } = await supabase.from("progress_latihan").insert({
    user_id,
    menu_id,
    tanggal,
    jarak_km,
    link_strava,
  });

  // Cek hasil simpan
  if (error) {
    alert("Gagal simpan data: " + error.message);
  } else {
    alert("Data latihan berhasil disimpan! 🏁");
    window.location.href = "home.html";
  }
}

// Supaya bisa dipanggil dari onsubmit di form.html
window.handleForm = handleForm;
