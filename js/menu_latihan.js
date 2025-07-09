const { data: menus } = await supabase
  .from("menu_latihan")
  .select("id, menu")
  .eq("user_id", userId)
  .order("tanggal", { ascending: true });
menus.forEach(m => {
  const opt = document.createElement("option");
  opt.value = m.id;
  opt.textContent = `${m.menu}`;
  menuSelect.appendChild(opt);
});
