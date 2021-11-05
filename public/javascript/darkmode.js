let darkMode = localStorage.getItem("darkMode");
const darkModeBtn = document.querySelector(".darkModeBtn");
const darkModeHeader = document.querySelector("header");
const darkModeFooter = document.querySelector("footer");
const darkModeTable = document.querySelector(".table");
const darkmodeInput = document.querySelectorAll(".form-control");

let route = window.location.pathname;

const enableDarkMode = () => {
  document.body.classList.add("darkmode");
  // toggle btn icon
  darkModeBtn.classList.remove("fa-moon");
  darkModeBtn.classList.add("fa-sun");

  darkModeHeader.classList.add("darkmodeHeader");
  darkModeFooter.classList.add("darkmodeFooter");
  localStorage.setItem("darkMode", "enabled");

  if (route === "/dashboard" || route === "/login" || route === "/signup" || route === "/search") {
    for (let i = 0; i < darkmodeInput.length; i++) {
      darkmodeInput[i].classList.add('darkmodeInput')
    }
  }

  if (darkModeTable) {
    darkModeTable.classList.add('darkModeTable')
  }
};

const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
    // toggle btn icon
    darkModeBtn.classList.add("fa-moon");
    darkModeBtn.classList.remove("fa-sun");

    darkModeHeader.classList.remove("darkmodeHeader");
    darkModeFooter.classList.remove("darkmodeFooter");
    localStorage.setItem("darkMode", null);

    if (route === "/dashboard" || route === "/login" || route === "/signup" || route === "/search") {
      for (let i = 0; i < darkmodeInput.length; i++) {
        darkmodeInput[i].classList.remove('darkmodeInput')
      }
    }

    if (darkModeTable) {
      darkModeTable.classList.remove('darkModeTable')
    }
};

if (darkMode === "enabled") {
  enableDarkMode();
} else {
  disableDarkMode();
}

darkModeBtn.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
