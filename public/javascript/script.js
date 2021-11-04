let darkMode = localStorage.getItem("darkMode");
const darkModeBtn = document.querySelector(".darkModeBtn");
const darkModeHeader = document.querySelector('header')
const darkModeFooter = document.querySelector('footer')
const darkModeSearch = document.querySelector('.symbolSearch')


const enableDarkMode = () => {
  document.body.classList.add("darkmode");
  // toggle btn icon
  darkModeBtn.classList.add('fa-moon')
  darkModeBtn.classList.remove('fa-sun')

  darkModeHeader.classList.add("darkmodeHeader");
  darkModeFooter.classList.add("darkmodeFooter");
  darkModeSearch.classList.add("darkmodeSearch");
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
  // toggle btn icon
  darkModeBtn.classList.remove('fa-moon')
  darkModeBtn.classList.add('fa-sun')

  darkModeHeader.classList.remove("darkmodeHeader");
  darkModeFooter.classList.remove("darkmodeFooter");
  darkModeSearch.classList.remove("darkmodeSearch");
  localStorage.setItem("darkMode", null);
};

if (darkMode === 'enabled') {
  enableDarkMode()
}

darkModeBtn.addEventListener("click", () => {
  darkMode = localStorage.getItem('darkMode')
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
