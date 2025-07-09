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
const editIcon = document.querySelector('.edit-icon');

let userId = null;

// === Ambil data user & profile ===
async function loadProfile() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) {
    alert("Silakan login dulu yaa!");
    window.location.href = "index.html";
    return;
  }

  const user = session.user;
  userId = user.id;

  const { data: profileData } = await supabase
    .from("profiles")
    .select("username, strava_url, profile_url")
    .eq("id", userId)
    .single();

  usernameEl.textContent = profileData?.username || user.email;
  stravaLinkEl.href = profileData?.strava_url || "#";
  stravaLinkEl.textContent = profileData?.strava_url
    ? "🌐 Lihat Profil Strava"
    : "⚠️ Strava belum ditautkan";

  // Tampilkan avatar default jika belum upload
  if (profileData?.profile_url) {
    profileImgEl.src = profileData.profile_url;
  } else {
    profileImgEl.src = "assets/default-avatar.png";
  }

  // History latihan
  const { data: latihanList } = await supabase
    .from("progress_latihan")
    .select("*")
    .eq("user_id", userId)
    .order("tanggal", { ascending: false });

  renderTrainingHistory(latihanList);
}

// === Upload Foto Profil ===
uploadInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file || !userId) return;

  const ext = file.name.split('.').pop();
  const filePath = `profile-pics/${userId}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    alert("Gagal upload 😢: " + uploadError.message);
    return;
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  const publicUrl = data.publicUrl;

  await supabase
    .from("profiles")
    .update({ profile_url: publicUrl })
    .eq("id", userId);

  profileImgEl.src = publicUrl;
  alert("Foto berhasil diperbarui! ✨");
});

// Trigger file input saat klik icon
editIcon.addEventListener("click", () => {
  uploadInput.click();
});

loadProfile();
