
document.addEventListener("DOMContentLoaded", function () {
  // Start-knappen sender brugeren til første testside
  const startButton = document.getElementById("start");
  if (startButton) {
    startButton.addEventListener("click", function () {
      window.location.href = "/survey/design1";
    });
  }
});

////////////
document.addEventListener("DOMContentLoaded", function () {
  const surveyPanel = document.getElementById("surveyPanel");
  const toggleButton = document.getElementById("toggleSurvey");

  // Sikre at knappen starter med den korrekte tekst
  if (toggleButton && surveyPanel) {
    toggleButton.textContent = surveyPanel.classList.contains("active") 
      ? "Luk spørgeskema" 
      : "Vis spørgeskema";
  }

  // Event delegation til at toggle spørgeskema
  document.addEventListener("click", function (event) {
    const clickedToggle = event.target.closest("#toggleSurvey");
    const clickedClose = event.target.closest("#closeSurvey");

    if (clickedToggle && surveyPanel) {
      surveyPanel.classList.toggle("active");
      toggleButton.textContent = surveyPanel.classList.contains("active") 
        ? "Luk spørgeskema" 
        : "Vis spørgeskema";
    }

    if (clickedClose && surveyPanel) {
      surveyPanel.classList.remove("active");
      toggleButton.textContent = "Vis spørgeskema";
    }
  });
});

