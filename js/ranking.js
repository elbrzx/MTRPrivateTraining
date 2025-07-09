const { data: rows } = await supabase
  .from("ranking_view")
  .select("user_id, username, total_workouts, total_km")
  .order("total_km", { ascending: false });
rows.forEach(u => {
  // append row to table
});
