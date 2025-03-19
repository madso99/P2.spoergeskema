document.addEventListener("DOMContentLoaded", () => {
  const fileSelect = document.getElementById("fileSelect");
  const downloadBtn = document.getElementById("downloadBtn");

  // Hent fil-listen fra serveren
  fetch("/admin/list-files")
    .then(response => response.json())
    .then(files => {
      files.forEach(file => {
        const option = document.createElement("option");
        option.value = file;
        option.textContent = file;
        fileSelect.appendChild(option);
      });
    })
    .catch(err => console.error("Fejl ved hentning af filer:", err));

  // Håndter download-knap klik
  downloadBtn.addEventListener("click", () => {
    const selectedFile = fileSelect.value;
    if (selectedFile) {
      window.location.href = `/admin/download/${selectedFile}`;
    } else {
      alert("❌ Vælg en fil først!");
    }
  });
});
