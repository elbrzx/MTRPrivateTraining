import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = 'https://uvwvnxysnyqnvchzzkjg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2d3ZueHlzbnlxbnZjaHp6a2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODQ3MTEsImV4cCI6MjA2NzU2MDcxMX0.jxyo6TOoJnnkuhtc-YGjO3cMSjIoR95IUznSDjEB_ko';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const userEmailText = document.getElementById("user-email");
const greetingText = document.querySelector("h2");

// Cek sesi login
const checkSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    window.location.href = "index.html"; // redirect ke login
    return;
  }

  const user = session.user;
  const userId = user.id;

  // Ambil username dari tabel profiles
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", userId)
    .single();

  if (profileError || !profile) {
    userEmailText.textContent = `Login sebagai ${user.email}`;
    greetingText.textContent = `Hai, Runner! 👋`;
  } else {
    userEmailText.textContent = `Email: ${user.email}`;
    greetingText.textContent = `Hai, ${profile.username}! 👋`;
  }
};

checkSession();

// Fungsi logout
window.logout = async () => {
  await supabase.auth.signOut();
  window.location.href = "index.html";
};
