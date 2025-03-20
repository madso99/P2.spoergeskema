document.addEventListener("DOMContentLoaded", function () {
  // Start-knappen sender brugeren til første testside
  const startButton = document.getElementById("start");
  if (startButton) {
    startButton.addEventListener("click", function () {
      window.location.href = "/survey/design1";
    });
  }

  // Spørgeskema toggle-knap
  const toggleButton = document.getElementById("toggleSurvey");
  const survey = document.getElementById("survey");

  if (toggleButton && survey) {
    toggleButton.addEventListener("click", function () {
      if (survey.classList.contains("hidden")) {
        survey.classList.remove("hidden");
        toggleButton.textContent = "Skjul spørgeskema";
      } else {
        survey.classList.add("hidden");
        toggleButton.textContent = "Vis spørgeskema";
      }
    });
  }
});
