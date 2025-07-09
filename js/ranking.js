import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = 'https://uvwvnxysnyqnvchzzkjg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2d3ZueHlzbnlxbnZjaHp6a2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODQ3MTEsImV4cCI6MjA2NzU2MDcxMX0.jxyo6TOoJnnkuhtc-YGjO3cMSjIoR95IUznSDjEB_ko';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Target elemen ranking
const rankingList = document.getElementById("ranking-list");

// Load data dari ranking_view
async function loadRanking() {
  const { data, error } = await supabase
    .from("ranking_view")
    .select("*")
    .order("total_training", { ascending: false });

  if (error) {
    rankingList.innerHTML = "<p>Gagal memuat data ranking 😢</p>";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    rankingList.innerHTML = "<p>Belum ada data ranking.</p>";
    return;
  }

  let rank = 1;
  data.forEach(user => {
    const card = document.createElement("div");
    card.className = "ranking-card";
    card.innerHTML = `
      <div class="rank">#${rank++}</div>
      <div class="info">
        <strong>${user.username}</strong>
        <p>🏃‍♂️ ${user.total_training} latihan · 📏 ${user.total_jarak_km.toFixed(2)} km</p>
      </div>
    `;
    rankingList.appendChild(card);
  });
}

// Jalanin saat halaman dibuka
loadRanking();
