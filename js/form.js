import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = 'https://uvwvnxysnyqnvchzzkjg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2d3ZueHlzbnlxbnZjaHp6a2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODQ3MTEsImV4cCI6MjA2NzU2MDcxMX0.jxyo6TOoJnnkuhtc-YGjO3cMSjIoR95IUznSDjEB_ko';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function handleForm(event) {
  event.preventDefault();
  const email = localStorage.getItem("userEmail");
  const tanggal = document.getElementById("tanggal").value;
  const menu = document.getElementById("menu").value;
  const jarak = document.getElementById("jarak").value;
  const catatan = document.getElementById("catatan").value;

  const { error } = await supabase.from("progress_latihan").insert({
    email,
    tanggal,
    menu,
    jarak,
    catatan
  });

  if (error) {
    alert("Gagal simpan data: " + error.message);
  } else {
    alert("Data latihan berhasil disimpan!");
    window.location.href = "home.html";
  }
}
