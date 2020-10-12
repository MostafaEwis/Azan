const TIME = new Date();
const URL = `https://api.aladhan.com/v1/calendarByCity?city=Cairo&country=Egypt&method=5&month=${
  TIME.getMonth() + 1
}&year=${TIME.getFullYear()}`;
var arabicTimings = ["الفجر", "الشروق", "الظهر", "العصر", "المغرب", "العشاء"];
var prayers;
var m;
var prayersA = [];
var hijriT = "هجري";
var monthT = "الشهر";
var gregorianT = "ميلادي";
var type = true;
var timingsContainer = document.getElementById("times");
var month = document.getElementById("month");
var hijriGreg = document.getElementById("date");
var gregorian = document.createElement("p");
var hijri = document.createElement("p");
var loading = document.createElement("p");
var hijriMonth = document.createElement("p");
var theme = document.getElementById("theme");
var lang = document.getElementById("lang");
var currentTheme = true;
var currentLang = true;

happen("ar");

lang.addEventListener("click", () => {
  document.querySelector("footer").style.textAlign = "center";
  if (currentLang) {
    timingsContainer.style.textAlign = "left";
    lang.textContent = "ع";
    timingsContainer.textContent = "";
    if (window.matchMedia("(max-width: 600px)").matches) {
      timingsContainer.style = "flex-direction: column;";
    } else {
      timingsContainer.style = "flex-direction: row;";
    }
    happen("en");
    currentLang = !currentLang;
  } else {
    timingsContainer.style.textAlign = "right";
    lang.textContent = "EN";
    timingsContainer.textContent = "";
    if (matchMedia("(max-width: 600px)").matches) {
      timingsContainer.style = "flex-direction: column-reverse;";
    } else {
      timingsContainer.style = "flex-direction: row;";
    }
    happen("ar");
    currentLang = !currentLang;
  }
});

theme.addEventListener("click", () => {
  if (currentTheme) {
    document.querySelector("body").style =
      "background-color: black; color: white;";
    document.getElementById("icon").src = "./sun.svg";
    document.getElementById("icon").style = "filter: invert(100%);";
    document.getElementById("aladhan").style = "color: white;";
    currentTheme = false;
  } else {
    document.querySelector("body").style =
      "background-color: white; color: black;";
    document.getElementById("icon").style = "filter: invert(0%);";
    document.getElementById("icon").src = "./moon.svg";
    document.getElementById("aladhan").style = "color: black;";
    currentTheme = true;
  }
});

async function happen(lang) {
  //making loading placeholder
  if (lang == "ar") {
    loading.textContent = "... جاري التحميل";
  } else {
    loading.textContent = "Loading ...";
  }
  timingsContainer.appendChild(loading);
  //cheking if the language is English so it makes the month and date in English
  if (lang == "ar") {
    hijriT = "هجري";
    monthT = "الشهر";
    gregorianT = "ميلادي";
    type = true;
  } else {
    hijriT = "Hijri";
    monthT = "Month";
    gregorianT = "Gregorian";
    type = false;
  }
  // fetching data from azan API and assiging it to variables and DOM elements
  await fetch(URL)
    .then((data) => data.json())
    .then((data) => {
      m = data.data[TIME.getDate() + 1].date.hijri.month;
      prayers = data.data[TIME.getDate() - 1].timings;
      //cheking the language to use month in AR or EN
      if (type) {
        hijriMonth.textContent = `${monthT}: ${m.ar}`;
      } else {
        hijriMonth.textContent = `${monthT}: ${m.en}`;
      }
      //assinging date values
      hijri.textContent = `${hijriT}: ${
        data.data[TIME.getDate() - 1].date.hijri.date
      }`;

      gregorian.textContent = `${gregorianT}: ${
        data.data[TIME.getDate() - 1].date.gregorian.date
      }`;
    })
    .catch((error) => console.error(error));

  if (lang == "en") {
    hijri.className = "date";
    hijriMonth.className = "date";
    gregorian.className = "date";
  } else {
    hijri.className = "tarekh";
    hijriMonth.className = "tarekh";
    gregorian.className = "tarekh";
  }
  hijriGreg.appendChild(hijri);
  month.appendChild(hijriMonth);
  hijriGreg.appendChild(gregorian);
  //removing the sunset timing
  delete prayers.Sunset;
  //removing the loading...
  timingsContainer.textContent = "";
  //storing DOM elements in  an array
  for (var i = 0; i < Object.keys(prayers).length - 2; i++) {
    prayersA[i] = document.createElement("p");
    // assinging the values of timings depending on the language and removing the last 5 chars as it's not needed
    if (lang == "en") {
      prayersA[i].textContent = `${Object.keys(prayers)[i]} : ${prayers[
        Object.keys(prayers)[i]
      ].slice(0, -5)}`;
    } else {
      prayersA[i].textContent = `${arabicTimings[i]} : ${prayers[
        Object.keys(prayers)[i]
      ].slice(0, -5)}`;
    }
    if (lang == "en") {
      prayersA[i].className = "times";
    } else {
      prayersA[i].className = "awqat";
    }
  }

  //appending childs from start to the end of the array or reverse depending on the language
  if (lang == "ar") {
    for (var i = prayersA.length - 1; i > -1; i--) {
      timingsContainer.appendChild(prayersA[i]);
    }
  } else {
    for (var i = 0; i < prayersA.length; i++) {
      timingsContainer.appendChild(prayersA[i]);
    }
  }
}
