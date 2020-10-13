var random = getRndInteger(2, 6236);
var url = `http://api.alquran.cloud/v1/ayah/${random}/ar.asad`;
var aya = document.createElement("p");
var ayaContainer = document.getElementById("aya");
getAya();
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function getAya() {
  await fetch(url)
    .then((data) => data.json())
    .then((data) => {
      if (data.data.text.length > 250) {
        getAya();
      } else {
        aya.textContent = data.data.text;
        document.getElementById("aya").appendChild(aya);
      }
    });
}
