function handleFormSubmit(event) {
  event.preventDefault();
  const latihan = {
    tanggal: document.getElementById("tanggal").value,
    menu: document.getElementById("menu").value,
    jarak: document.getElementById("jarak").value,
    catatan: document.getElementById("catatan").value,
    link: document.getElementById("link").value,
  };

  console.log("Data dikirim:", latihan);
  alert("Data latihan berhasil disimpan! (simulasi)");
  document.getElementById("form-latihan").reset();
}
