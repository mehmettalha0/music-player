const muzikIcerik = document.getElementById("muzik-icerik");
const oynatBtn = document.getElementById("oynat");
const oncekiBtn = document.getElementById("onceki");
const sonrakiBtn = document.getElementById("sonraki");
const ses = document.getElementById("ses");
const ilerlemeCubugu = document.getElementById("ilerleme-cubugu");
const ilerlemeCubuguIcerik = document.getElementById("ilerleme-cubugu-icerik");
const isim = document.getElementById("isim");
const resim = document.getElementById("resim");
const menuBtn = document.getElementById("menu");
const muziksiralama = document.getElementById("muziksiralama");
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");

//Şarkı isimleri
var sarkilar = [
  "no1-dunya-gul-bana",
  "sancak-gozumden",
  "saniser-ask-sarkisi",
  "hidra-31-ekran",
  "sagopa-kajmer-kotu-insanlari-tanima-serisi",
  "norm-ender-ciktik-yine-yollara",
  "kubilay-karca-kıskanc",
];
var sarkilarIsimleri = [
  "No.1 - Dünya Gül Bana",
  "Sancak - Gözümden Düştüğün An",
  "Şanışer - Aşk Şarkısı",
  "Hidra - 31 Ekran",
  "Sagopa Kajmer - Kötü İnsanları Tanıma Serisi",
  "Norm Ender - Çıktık Yine Yollara",
  "Kubilay Karça & Şehinşah - Kıskanç",
];

let sarkiIndex = 0;

loadSong(sarkilarIsimleri[sarkiIndex], sarkilar[sarkiIndex]);

function loadSong(sarkiIsimleri, sarki) {
  isim.innerText = sarkiIsimleri;
  ses.src = `./Muzikler/${sarki}.mp3`;
  resim.src = `./Resimler/${sarki}.jpg`;
}

function sarkiOynat() {
  muzikIcerik.classList.add("play");
  oynatBtn.querySelector("i.fa").classList.remove("fa-play");
  oynatBtn.querySelector("i.fa").classList.add("fa-pause");
  ses.play();
}

function sarkiDurdur() {
  muzikIcerik.classList.remove("play");
  oynatBtn.querySelector("i.fa").classList.add("fa-play");
  oynatBtn.querySelector("i.fa").classList.remove("fa-pause");
  ses.pause();
}

function oncekiSarki() {
  sarkiIndex--;
  menuac();
  menuac();
  if (sarkiIndex < 0) {
    sarkiIndex = sarkilar.length - 1;
    menuac();
    menuac();
  }
  loadSong(sarkilarIsimleri[sarkiIndex], sarkilar[sarkiIndex]);
  sarkiOynat();
}

function sonrakiSarki() {
  sarkiIndex++;
  menuac();
  menuac();
  if (sarkiIndex > sarkilar.length - 1) {
    sarkiIndex = 0;
    menuac();
    menuac();
  }
  loadSong(sarkilarIsimleri[sarkiIndex], sarkilar[sarkiIndex]);
  sarkiOynat();
}

function menuac() {
  const oynuyorDurum2 = muziksiralama.classList.contains("play");
  p1.innerHTML = "";
  p2.innerHTML = "";
  var bosdizi = [];
  var songName = [
    "No.1 - Dünya Gül Bana",
    "Sancak - Gözümden Düştüğün An",
    "Şanışer - Aşk Şarkısı",
    "Hidra - 31 Ekran",
    "Sagopa Kajmer - Kötü İnsanları Tanıma Serisi",
    "Norm Ender - Çıktık Yine Yollara",
    "Kubilay Karça & Şehinşah - Kıskanç",
  ];
  var songName2 = [
    "No.1 - Dünya Gül Bana",
    "Sancak - Gözümden Düştüğün An",
    "Şanışer - Aşk Şarkısı",
    "Hidra - 31 Ekran",
    "Sagopa Kajmer - Kötü İnsanları Tanıma Serisi",
    "Norm Ender - Çıktık Yine Yollara",
    "Kubilay Karça & Şehinşah - Kıskanç",
  ];
  if (oynuyorDurum2) {
    muziksiralama.classList.remove("play");
  } else {
    muziksiralama.classList.add("play");
    songName.splice(0, sarkiIndex + 1);
    if (songName.length > 0) {
      songName.forEach(function (e) {
        bosdizi.push(e);
      });
      bosdizi.toSorted();
      p1.innerHTML = bosdizi.join("<br/>");
    }
    songName2.splice(sarkiIndex, sarkilarIsimleri.length);
    songName2.toSorted();
    for (let i = 0; i < sarkiIndex; i++) {
      p2.innerHTML = songName2.join("<br/>");
    }
  }
}

function surecGuncelle(e) {
  const { duration, currentTime } = e.srcElement;
  const surecYuzdesi = (currentTime / duration) * 100;
  ilerlemeCubugu.style.width = `${surecYuzdesi}%`;
}

function surecAyarla(e) {
  const genislik = this.clientWidth;
  const clickX = e.offsetX;
  const sure = ses.duration;
  ses.currentTime = (clickX / genislik) * sure;
}
oynatBtn.addEventListener("click", () => {
  const oynuyorDurum = muzikIcerik.classList.contains("play");
  if (oynuyorDurum) {
    sarkiDurdur();
  } else {
    sarkiOynat();
  }
});

oncekiBtn.addEventListener("click", oncekiSarki);
sonrakiBtn.addEventListener("click", sonrakiSarki);
menuBtn.addEventListener("click", menuac);
ses.addEventListener("timeupdate", surecGuncelle);
ilerlemeCubuguIcerik.addEventListener("click", surecAyarla);
ses.addEventListener("ended", sonrakiSarki);
