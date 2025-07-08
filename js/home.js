import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = 'https://uvwvnxysnyqnvchzzkjg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...';

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
