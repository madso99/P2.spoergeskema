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
  const surveyPanel = document.getElementById("surveyPanel");
  const closeSurveyButton = document.getElementById("closeSurvey");

  if (toggleButton && surveyPanel) {
    toggleButton.addEventListener("click", function () {
      if (surveyPanel.classList.contains("active")) {
        surveyPanel.classList.remove("active");
        toggleButton.textContent = "Vis spørgeskema";
      } else {
        surveyPanel.classList.add("active");
        toggleButton.textContent = "Luk spørgeskema";
      }
    });
  }

  if (closeSurveyButton) {
    closeSurveyButton.addEventListener("click", function () {
      surveyPanel.classList.remove("active");
      toggleButton.textContent = "Vis spørgeskema";
    });
  }
});