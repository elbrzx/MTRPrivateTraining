import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = 'https://uvwvnxysnyqnvchzzkjg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2d3ZueHlzbnlxbnZjaHp6a2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODQ3MTEsImV4cCI6MjA2NzU2MDcxMX0.jxyo6TOoJnnkuhtc-YGjO3cMSjIoR95IUznSDjEB_ko';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cek apakah user sedang login
const userEmailText = document.getElementById("user-email");

const checkSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    window.location.href = "index.html"; // redirect ke login
  } else {
    const email = session.user.email;
    userEmailText.textContent = `Selamat datang, ${email}!`;
  }
};

checkSession();

// Fungsi logout
window.logout = async () => {
  await supabase.auth.signOut();
  window.location.href = "index.html";
};
