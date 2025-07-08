// ============ KONFIG SUPABASE =============
const SUPABASE_URL = 'https://scjhaagfrzrivnjomvfw.supabase.co'; // GANTI DENGAN PUNYAMU
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjamhhYWdmcnpyaXZuam9tdmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzAxMzEsImV4cCI6MjA2NzU0NjEzMX0.HvLwUa_G9KrE1Ot8OtIhAhAYX12thSuDNyMZWt9NE9w';       // GANTI DENGAN ANON KEY
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============ SAAT LOAD PAGE =============
document.addEventListener("DOMContentLoaded", async () => {
  const { data: sessionData, error } = await supabase.auth.getSession();
  const session = sessionData?.session;

  if (!session) {
    window.location.href = "index.html"; // belum login
    return;
  }

  const user = session.user;
  document.getElementById("user-name").innerText = user.email;

  loadTrainingData(user.id); // Ambil data berdasarkan user id
});

// ============ AMBIL DATA LATIHAN DARI SUPABASE ============
async function loadTrainingData(userId) {
  const { data, error } = await supabase
    .from("latihan_progress")
    .select("*")
    .eq("user_id", userId)
    .order("tanggal", { ascending: false });

  const list = document.getElementById("training-list");
  list.innerHTML = "";

  if (error) {
    list.innerHTML = `<p style="color: red;">Gagal mengambil data: ${error.message}</p>`;
    return;
  }

  if (data.length === 0) {
    list.innerHTML = "<p>Belum ada data latihan</p>";
    return;
  }

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <strong>${item.menu_latihan}</strong><br>
      ${item.tanggal} - ${item.jarak_km} KM<br>
      <em>${item.catatan || "Tanpa catatan"}</em><br>
      ${item.link_strava ? `<a href="${item.link_strava}" target="_blank">Lihat Strava</a>` : ""}
    `;
    list.appendChild(card);
  });
}

// ============ LOGOUT ============
async function logout() {
  await supabase.auth.signOut();
  localStorage.removeItem("userEmail");
  window.location.href = "index.html";
}
