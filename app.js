const TIME = new Date();
const URL = `https://api.aladhan.com/v1/calendarByCity?city=Cairo&country=Egypt&method=2&month=${
  TIME.getMonth() + 1
}&year=${TIME.getFullYear()}`;
var arabicP = ["الفجر", "الشروق", "الظهر", "العصر", "المغرب", "العشاء"];
var prayers;
var prayersA = [];
var div = document.getElementById("hello");
var month = document.getElementById("month");
var HG = document.getElementById("HG");
var gregorian = document.createElement("p");
var hijri = document.createElement("p");
var hijriMonth = document.createElement("p");
var btn = document.getElementById("theme");
var lang = document.getElementById("lang");
var times = document.getElementsByClassName("times");
var theme = true;
var currentLang = true;
happen("ar");
lang.addEventListener("click", () => {
  if (currentLang) {
    lang.textContent = "ع";
    div.textContent = "";
    if (window.matchMedia("(max-width: 600px)").matches) {
      div.style = "flex-direction: column;";
    } else {
      div.style = "flex-direction: row;";
    }
    happen("en");
    currentLang = !currentLang;
  } else {
    lang.textContent = "EN";
    div.textContent = "";
    if (matchMedia("(max-width: 600px)").matches) {
      div.style = "flex-direction: column-reverse;";
    } else {
      div.style = "flex-direction: row-reverse;";
    }
    happen("ar");
    currentLang = !currentLang;
  }
});

btn.addEventListener("click", () => {
  if (theme) {
    document.querySelector("body").style =
      "background-color: black; color: white;";
    document.getElementById("icon").src = "./sun.svg";
    document.getElementById("icon").style = "filter: invert(100%);";
    document.getElementById("aladhan").style = "color: white;";
    theme = false;
  } else {
    document.querySelector("body").style =
      "background-color: white; color: black;";
    document.getElementById("icon").style = "filter: invert(0%);";
    document.getElementById("icon").src = "./moon.svg";
    document.getElementById("aladhan").style = "color: black;";
    theme = true;
  }
});

async function happen(lang) {
  var m;
  if (lang == "ar") {
    var hijriT = "هجري";
    var monthT = "الشهر";
    var gregorianT = "ميلادي";
    var type = true;
  } else if (lang == "en") {
    var hijriT = "Hijri";
    var monthT = "Month";
    var gregorianT = "Gregoriant";
    var type = false;
  }
  await fetch(URL)
    .then((data) => data.json())
    .then((data) => {
      m = data.data[TIME.getDate() + 1].date.hijri.month;
      prayers = data.data[TIME.getDate() - 1].timings;
      hijri.textContent = `${hijriT}: ${
        data.data[TIME.getDate() - 1].date.hijri.date
      }`;
      if (type) {
        hijriMonth.textContent = `${monthT}: ${m.ar}`;
      } else {
        hijriMonth.textContent = `${monthT}: ${m.en}`;
      }
      gregorian.textContent = `${gregorianT}: ${
        data.data[TIME.getDate() - 1].date.gregorian.date
      }`;
    })
    .catch((error) => console.error(error));
  delete prayers.Sunset;
  div.textContent = "";
  for (var i = 0; i < Object.keys(prayers).length - 2; i++) {
    prayersA[i] = document.createElement("p");
    if (lang == "en") {
      prayersA[i].textContent = `${Object.keys(prayers)[i]} : ${prayers[
        Object.keys(prayers)[i]
      ].slice(0, -5)}`;
    } else {
      prayersA[i].textContent = `${arabicP[i]} : ${prayers[
        Object.keys(prayers)[i]
      ].slice(0, -5)}`;
    }
    if (lang == "en") {
      prayersA[i].className = "times";
    } else if (lang == "ar") {
      prayersA[i].className = "awqat";
    }
  }
  if (lang == "ar") {
    for (var i = prayersA.length - 1; i > -1; i--) {
      div.appendChild(prayersA[i]);
    }
  } else {
    for (var i = 0; i < prayersA.length; i++) {
      div.appendChild(prayersA[i]);
    }
  }
  hijri.className = "date";
  hijriMonth.className = "date";
  gregorian.className = "date";
  HG.appendChild(hijri);
  month.appendChild(hijriMonth);
  HG.appendChild(gregorian);
}
