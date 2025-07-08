const supabaseUrl = "https://scjhaagfrzrivnjomvfw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjamhhYWdmcnpyaXZuam9tdmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzAxMzEsImV4cCI6MjA2NzU0NjEzMX0.HvLwUa_G9KrE1Ot8OtIhAhAYX12thSuDNyMZWt9NE9w";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

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
    window.location.href = "dashboard.html";
  }
}
