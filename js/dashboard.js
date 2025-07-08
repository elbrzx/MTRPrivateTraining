document.addEventListener("DOMContentLoaded", () => {
  const userEmail = localStorage.getItem("userEmail");
  if (!userEmail) {
    window.location.href = "index.html";
  } else {
    document.getElementById("user-name").innerText = userEmail;
    loadTrainingData(); // nanti connect ke Supabase
  }
});

function logout() {
  localStorage.removeItem("userEmail");
  window.location.href = "index.html";
}

function loadTrainingData() {
  // Dummy data - nanti ganti pakai Supabase
  const data = [
    { tanggal: "2025-07-05", menu: "Long Run", jarak: "10", catatan: "Mantap!" },
    { tanggal: "2025-07-06", menu: "Interval", jarak: "5", catatan: "Lelah" },
  ];

  const list = document.getElementById("training-list");
  list.innerHTML = "";
  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<strong>${item.menu}</strong><br>${item.tanggal} - ${item.jarak} KM<br><em>${item.catatan}</em>`;
    list.appendChild(card);
  });
}
