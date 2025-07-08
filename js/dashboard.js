// ============ KONFIG SUPABASE =============
const SUPABASE_URL = 'https://scjhaagfrzrivnjomvfw.supabase.co'; // GANTI DENGAN PUNYAMU
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjamhhYWdmcnpyaXZuam9tdmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzAxMzEsImV4cCI6MjA2NzU0NjEzMX0.HvLwUa_G9KrE1Ot8OtIhAhAYX12thSuDNyMZWt9NE9w';       // GANTI DENGAN ANON KEY
const supabase = window.Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
document.addEventListener("DOMContentLoaded", async () => {
  const userEmail = localStorage.getItem("userEmail");
  if (!userEmail) {
    window.location.href = "index.html";
    return;
  }
  document.getElementById("user-name").innerText = userEmail;
  loadTrainingData(userEmail);
});

function logout() {
  localStorage.removeItem("userEmail");
  window.location.href = "index.html";
}

async function loadTrainingData(userEmail) {
  const { data, error } = await supabase.from("progress_latihan").select("*").eq("email", userEmail);
  const list = document.getElementById("training-list");
  list.innerHTML = "";
  if (error) {
    list.innerHTML = `<p style='color:red;'>Gagal load data: ${error.message}</p>`;
    return;
  }
  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<strong>${item.menu}</strong><br>${item.tanggal} - ${item.jarak} KM<br><em>${item.catatan}</em>`;
    list.appendChild(card);
  });
}
