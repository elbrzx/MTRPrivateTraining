import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = 'https://uvwvnxysnyqnvchzzkjg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2d3ZueHlzbnlxbnZjaHp6a2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODQ3MTEsImV4cCI6MjA2NzU2MDcxMX0.jxyo6TOoJnnkuhtc-YGjO3cMSjIoR95IUznSDjEB_ko';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// DOM
const userEmailText = document.getElementById("user-email");
const userProfilePic = document.getElementById("profile-pic");
const totalWorkoutEl = document.getElementById("total-workout");
const weeklyTrainingEl = document.getElementById("weekly-training");
const trainingTasksEl = document.getElementById("training-tasks");
const calendarTitleEl = document.getElementById("calendar-title");
const calendarContainer = document.getElementById("calendar");

// Global
let currentDate = new Date();
let currentUserId = null;

// ✅ SESSION CHECK
const checkSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (!session || error) {
    window.location.href = "index.html";
    return;
  }

  const user = session.user;
  currentUserId = user.id;
  if (userEmailText) userEmailText.textContent = `Hai, ${user.email}! 👋`;

  loadDashboardData();
};

// 📦 LOAD DATA
const loadDashboardData = async (slideDirection = null) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).toISOString().slice(0, 10);
  const lastDay = new Date(year, month + 1, 0).toISOString().slice(0, 10);

  const { data: latihan } = await supabase
    .from("menu_latihan")
    .select("*, training_log!left(user_id, menu_id)")
    .eq("user_id", currentUserId)
    .gte("tanggal", firstDay)
    .lte("tanggal", lastDay);

  generateCalendar(latihan, slideDirection);
  renderTasks(latihan);

  const doneCount = latihan.filter((m) => m.training_log.length > 0).length;
  totalWorkoutEl.textContent = doneCount;
  weeklyTrainingEl.textContent = latihan.length;
};

// 📅 GENERATE CALENDAR
const generateCalendar = (latihan = [], direction = null) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  calendarTitleEl.textContent = `${monthNames[month]} ${year}`;

  const newGrid = document.createElement("div");
  newGrid.className = "calendar-grid calendar-slide";

  if (direction === "left") newGrid.classList.add("slide-left");
  else if (direction === "right") newGrid.classList.add("slide-right");

  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement("div");
    newGrid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement("div");
    cell.classList.add("calendar-day");
    cell.textContent = d;

    const isToday = today.getDate() === d &&
                    today.getMonth() === month &&
                    today.getFullYear() === year;
    if (isToday) cell.classList.add("today");

    const dataLatihan = latihan.find((m) => {
      const tanggal = new Date(m.tanggal);
      return tanggal.getDate() === d &&
             tanggal.getMonth() === month &&
             tanggal.getFullYear() === year;
    });

    if (dataLatihan && dataLatihan.training_log.length > 0) {
      cell.classList.add("green");
    } else if (dataLatihan) {
      cell.classList.add("orange");
    }

    newGrid.appendChild(cell);
  }

  // Ganti isi container dengan slide
  calendarContainer.innerHTML = "";
  calendarContainer.appendChild(newGrid);
};

// ✅ RENDER TASKS
const renderTasks = (latihan = []) => {
  trainingTasksEl.innerHTML = "";

  latihan.forEach((item) => {
    const done = item.training_log.length > 0;
    const div = document.createElement("div");
    div.className = `task-item ${done ? "done" : "missed"}`;
    div.innerHTML = `
      <span>${item.menu}</span>
      <a href="#">More Details ▶</a>
    `;
    trainingTasksEl.appendChild(div);
  });
};

// ⬅️➡️ NAVIGASI BULAN
document.getElementById("prev-month").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  loadDashboardData("right");
});

document.getElementById("next-month").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  loadDashboardData("left");
});

// 🚪 LOGOUT
window.logout = async () => {
  await supabase.auth.signOut();
  window.location.href = "index.html";
};

// 🚀 INIT
checkSession();

