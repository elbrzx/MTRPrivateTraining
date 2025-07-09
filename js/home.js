import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = 'https://uvwvnxysnyqnvchzzkjg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2d3ZueHlzbnlxbnZjaHp6a2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODQ3MTEsImV4cCI6MjA2NzU2MDcxMX0.jxyo6TOoJnnkuhtc-YGjO3cMSjIoR95IUznSDjEB_ko';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const sidebar = document.getElementById("sidebar");
document.getElementById("menu-toggle").onclick = () => {
  sidebar.classList.toggle("active");
};

const userEmailText = document.getElementById("user-email");
const userProfilePic = document.getElementById("profile-pic");
const calendarContainer = document.getElementById("calendar");
const totalWorkoutEl = document.getElementById("total-workout");
const weeklyTrainingEl = document.getElementById("weekly-training");
const trainingTasksEl = document.getElementById("training-tasks");

let currentUserId = null;

const checkSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (!session || error) {
    window.location.href = "index.html";
    return;
  }

  const user = session.user;
  currentUserId = user.id;
  userEmailText.textContent = `Hai, ${user.email}! 👋`;

  loadDashboardData();
};

const loadDashboardData = async () => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const { data: latihan } = await supabase
    .from("menu_latihan")
    .select("*, training_log!left(user_id, menu_id)")
    .eq("user_id", currentUserId)
    .gte("tanggal", firstDay.toISOString().slice(0, 10))
    .lte("tanggal", lastDay.toISOString().slice(0, 10));

  generateCalendar(latihan);

  const doneCount = latihan.filter((m) => m.training_log.length > 0).length;
  const totalMenu = latihan.length;

  totalWorkoutEl.textContent = doneCount;
  weeklyTrainingEl.textContent = totalMenu;

  renderTasks(latihan);
};

const generateCalendar = (latihan) => {
  const daysInMonth = 31;
  const today = new Date().getDate();
  let html = '<div class="calendar-grid">';
  for (let i = 1; i <= daysInMonth; i++) {
    const dayData = latihan.find((m) => new Date(m.tanggal).getDate() === i);
    let className = "calendar-day";
    if (i === today) className += " today";
    if (dayData && dayData.training_log.length > 0) className += " green";
    else if (dayData) className += " orange";
    html += `<div class="${className}">${i}</div>`;
  }
  html += "</div>";
  calendarContainer.innerHTML = html;
};

const renderTasks = (latihan) => {
  trainingTasksEl.innerHTML = "";
  latihan.forEach((item) => {
    const done = item.training_log.length > 0;
    const className = done ? "done" : "missed";
    const div = document.createElement("div");
    div.className = `task-item ${className}`;
    div.innerHTML = `
      <span>${item.menu}</span>
      <a href="#">More Details ▶</a>
    `;
    trainingTasksEl.appendChild(div);
  });
};

window.logout = async () => {
  await supabase.auth.signOut();
  window.location.href = "index.html";
};

checkSession();
