import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = 'https://uvwvnxysnyqnvchzzkjg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2d3ZueHlzbnlxbnZjaHp6a2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODQ3MTEsImV4cCI6MjA2NzU2MDcxMX0.jxyo6TOoJnnkuhtc-YGjO3cMSjIoR95IUznSDjEB_ko';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// === Elemen DOM ===
const usernameEl = document.getElementById("username");
const stravaLinkEl = document.getElementById("strava-link");
const trainingHistoryEl = document.getElementById("training-history");
const profileImgEl = document.getElementById("profile-image");
const uploadInput = document.getElementById("upload-profile-pic");

let userId = null;

// === Ambil Data User & History ===
async function loadProfile() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) {
    alert("Silakan login terlebih dahulu!");
    window.location.href = "index.html";
    return;
  }

  const user = session.user;
  userId = user.id;

  // Ambil profil user dari tabel "profiles"
  const { data: profileData } = await supabase
    .from("profiles")
    .select("nama, strava_url, profile_url")
    .eq("id", userId)
    .single();

  usernameEl.textContent = profileData?.nama || user.email;
  stravaLinkEl.href = profileData?.strava_url || "#";
  stravaLinkEl.textContent = profileData?.strava_url
    ? "🌐 Lihat Profil Strava"
    : "⚠️ Strava belum ditautkan";

  if (profileData?.profile_url) {
    profileImgEl.src = profileData.profile_url;
  }

  // Ambil data latihan user dari progress_latihan
  const { data: latihanList } = await supabase
    .from("progress_latihan")
    .select("*")
    .eq("user_id", userId)
    .order("tanggal", { ascending: false });

  renderTrainingHistory(latihanList);
}

// === Tampilkan Riwayat Latihan ===
function renderTrainingHistory(data = []) {
  if (!data.length) {
    trainingHistoryEl.innerHTML = "<p>Belum ada data latihan 🥲</p>";
    return;
  }

  trainingHistoryEl.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "training-card";
    card.innerHTML = `
      <div><span>${item.tanggal}</span> - ${item.menu_id}</div>
      <div>Jarak: ${item.jarak_km} km</div>
      ${item.link_strava ? `<a href="${item.link_strava}" target="_blank">📍 Lihat di Strava</a>` : ""}
    `;
    trainingHistoryEl.appendChild(card);
  });
}

// === Upload Foto Profil ===
uploadInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file || !userId) return;

  const filePath = `profile-pics/${userId}-${Date.now()}.${file.name.split('.').pop()}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { cacheControl: "3600", upsert: true });

  if (uploadError) {
    alert("Gagal upload foto 😢: " + uploadError.message);
    return;
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  const imageUrl = data.publicUrl;

  // Update ke tabel profiles
  await supabase
    .from("profiles")
    .update({ profile_url: imageUrl })
    .eq("id", userId);

  profileImgEl.src = imageUrl;
  alert("Foto profil berhasil diperbarui! ✨");
});

// Jalankan saat halaman dibuka
loadProfile();
