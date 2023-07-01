//Fetch API
const getPerso = () => {
  fetch("https://hp-api.onrender.com/api/characters")
    .then((res) => res.json())
    .then((data) => {
      perso(data);
      console.log(data);

      // makeScore(data.status);
    });
};

getPerso();

// Fonction main
function perso(data) {
  let score = 0;
  const counter = document.querySelector(".score");
  counter.textContent = "Your score : " + score;

  let status = 0;
  const target = document.querySelector(".target");
  target.textContent = "Kills : " + status;

  for (let curr of data) {
    const container = document.querySelector(".cards-container");
    const cardGrid = document.createElement("div");
    const cardProfil = document.createElement("div");
    cardProfil.classList.add("cards-profil");
    cardGrid.classList.add("cards-grid");

    console.log(curr.alive);

    if (curr.alive !== true) {
      status++;
      target.textContent = "Kills : " + status;
    } else {
    }

    cardProfil.addEventListener(
      "click",
      function onclick(e) {
        if (curr.alive === true) {
          makeBadRes(cardProfil);
          score--;
          counter.textContent = "Your score : " + score;
        } else {
          makeGoodRes(cardProfil);
          score++;
          counter.textContent = "Your score : " + score;
          status--;
          target.textContent = "Kills : " + status;
          console.log(status);
          if (status === 25) {
            Swal.fire({
              background: "black",
              // confirmButtonColor: "black",
              // confirmButtonText: "OK",
              color: "white",
              icon: "success",
              iconColor: "white",
              title: "Bravo",
              text: "ton score est de : " + score,
              textSize: "2rem",
              footer: '<a href="">On recommence ?</a>',
            });
          }
        }
      },
      { once: true }
    );

    container.appendChild(cardGrid);
    cardGrid.appendChild(cardProfil);
    cardProfil.appendChild(makeName(curr.name));
    cardProfil.appendChild(makeNickName(curr.nickname));
    cardProfil.appendChild(makeImage(curr.image));
  }
}

// CREATION DES CARDS

// Création des noms des personnages
function makeName(name) {
  const title = document.createElement("h2");
  title.textContent = name;
  title.classList.add("title");
  return title;
}

// Création des surnoms des personnages
function makeNickName(name) {
  const nickName = document.createElement("p");
  nickName.textContent = name;
  nickName.classList.add("nickname");
  return nickName;
}

// Création des images des personnages
function makeImage(image) {
  const photo = document.createElement("img");
  photo.src = image;
  photo.classList.add("image");
  return photo;
}

// FONCTIONS DU JEU

// Div mauvaise réponse
function makeBadRes(cardProfil) {
  const res = document.createElement("div");
  res.classList.add("answer-bad");
  res.textContent = "Perdu";
  cardProfil.appendChild(res);
  return res;
}

// Div bonne réponse
function makeGoodRes(cardProfil) {
  const res = document.createElement("div");
  res.textContent = "Gagné";
  res.classList.add("answer-good");
  cardProfil.appendChild(res);
  return res;
}
