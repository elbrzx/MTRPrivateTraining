import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = 'https://uvwvnxysnyqnvchzzkjg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2d3ZueHlzbnlxbnZjaHp6a2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODQ3MTEsImV4cCI6MjA2NzU2MDcxMX0.jxyo6TOoJnnkuhtc-YGjO3cMSjIoR95IUznSDjEB_ko';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
