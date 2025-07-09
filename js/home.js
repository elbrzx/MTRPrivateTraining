import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = 'https://uvwvnxysnyqnvchzzkjg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2d3ZueHlzbnlxbnZjaHp6a2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODQ3MTEsImV4cCI6MjA2NzU2MDcxMX0.jxyo6TOoJnnkuhtc-YGjO3cMSjIoR95IUznSDjEB_ko';
const supabase = createClient(supabaseUrl, supabaseAnonKey);


// DOM Elements
const userEmailText = document.getElementById("user-email");
const userProfilePic = document.getElementById("profile-pic");
const totalWorkoutEl = document.getElementById("total-workout");
const weeklyTrainingEl = document.getElementById("weekly-training");
const trainingTasksEl = document.getElementById("training-tasks");

let currentUserId = null;

// Session check
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

// Load dashboard data
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

// 🗓 Generate calendar
const generateCalendar = (latihan = [], today = new Date()) => {
  const calendarContainer = document.getElementById("calendar");
  const year = 2025;
  const month = 6; // July = 6 (0-based index)
  const daysInMonth = 31;
  const startDay = new Date(year, month, 1).getDay(); // 0 = Sunday

  if (!calendarContainer) return;
  calendarContainer.innerHTML = "";

  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement("div");
    calendarContainer.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const day = document.createElement("div");
    day.classList.add("calendar-day");

    const isToday = today.getFullYear() === year &&
                    today.getMonth() === month &&
                    today.getDate() === d;
    if (isToday) day.classList.add("today");

    // Cek latihan untuk tanggal ini
    const latihanData = latihan.find((m) => new Date(m.tanggal).getDate() === d);

    if (latihanData && latihanData.training_log?.length > 0) {
      day.classList.add("green");
    } else if (latihanData) {
      day.classList.add("orange");
    }

    day.textContent = d;
    calendarContainer.appendChild(day);
  }
};

// Render tasks
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

// Logout
window.logout = async () => {
  await supabase.auth.signOut();
  window.location.href = "index.html";
};

// Init
checkSession();
