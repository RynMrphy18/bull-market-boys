let darkMode = localStorage.getItem("darkMode");
const darkModeBtn = document.querySelector(".darkModeBtn");
const darkModeHeader = document.querySelector("header");
const darkModeFooter = document.querySelector("footer");
const darkModeSearch = document.querySelector(".symbolSearch");

let route = window.location.pathname;

const enableDarkMode = () => {
  if (route === "/dashboard") {
    document.body.classList.add("darkmode");
    // toggle btn icon
    darkModeBtn.classList.add("fa-moon");
    darkModeBtn.classList.remove("fa-sun");

    darkModeHeader.classList.add("darkmodeHeader");
    darkModeFooter.classList.add("darkmodeFooter");
    darkModeSearch.classList.add("darkmodeSearch");
    localStorage.setItem("darkMode", "enabled");
  } else {
    document.body.classList.add("darkmode");
    // toggle btn icon
    darkModeBtn.classList.add("fa-moon");
    darkModeBtn.classList.remove("fa-sun");

    darkModeHeader.classList.add("darkmodeHeader");
    darkModeFooter.classList.add("darkmodeFooter");
    localStorage.setItem("darkMode", "enabled");
  }
};

const disableDarkMode = () => {
  if (route === "/dashboard") {
    document.body.classList.remove("darkmode");
    // toggle btn icon
    darkModeBtn.classList.remove("fa-moon");
    darkModeBtn.classList.add("fa-sun");

    darkModeHeader.classList.remove("darkmodeHeader");
    darkModeFooter.classList.remove("darkmodeFooter");
    darkModeSearch.classList.remove("darkmodeSearch");
    localStorage.setItem("darkMode", null);
  } else {
    document.body.classList.remove("darkmode");
    // toggle btn icon
    darkModeBtn.classList.remove("fa-moon");
    darkModeBtn.classList.add("fa-sun");

    darkModeHeader.classList.remove("darkmodeHeader");
    darkModeFooter.classList.remove("darkmodeFooter");
    localStorage.setItem("darkMode", null);
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
