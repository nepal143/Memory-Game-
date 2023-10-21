


const images = [...Array(15).keys()].map(i => `assets/${i + 1}.png`);

const imagePairs = [...images, ...images];


shuffle(imagePairs);

let score = 0;
let firstCard = null;
let timer = 100;
let isComparing = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function startGame() {
    const gameBoard = document.getElementById("game-board");

    for (let i = 0; i < imagePairs.length; i++) {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");
        const card = document.createElement("div");
        card.classList.add("card", "face-down");
        card.dataset.index = i;
        const image = document.createElement("img");
        image.src = imagePairs[i];
        card.appendChild(image);
        cardContainer.appendChild(card);
        cardContainer.addEventListener("click", handleCardClick);
        gameBoard.appendChild(cardContainer);
    }

    const timerInterval = setInterval(() => {
        timer--;
        document.getElementById("timer").textContent = timer + " seconds";

        if (timer <= 0) {
            clearInterval(timerInterval);
            document.getElementById("you-lose").style.display = "block";
        } else if (score === imagePairs.length) {
            clearInterval(timerInterval);
            document.getElementById("you-win").style.display = "block";
        }
    }, 1000);
}

function handleCardClick(event) {
    if (timer > 0) {

        const cardContainer = event.currentTarget;
        const card = cardContainer.querySelector(".card");
        const index = card.dataset.index;

        if (isComparing || card.classList.contains('disabled') || card.classList.contains('face-up')) {
            return;
        }

        card.classList.add('face-up');
        card.firstElementChild.style.display = "block";

        if (firstCard === null) {
            firstCard = card;
        } else {
            isComparing = true;
            if (firstCard.firstElementChild.src === card.firstElementChild.src) {

                score += 2;
                document.getElementById("score").textContent = score;
                firstCard.classList.add('disabled');
                card.classList.add('disabled');
                firstCard = null;
                isComparing = false;
            } else {

                setTimeout(() => {
                    firstCard.classList.remove('face-up');
                    firstCard.firstElementChild.style.display = "none";
                    card.classList.remove('face-up');
                    card.firstElementChild.style.display = "none";
                    firstCard = null;
                    isComparing = false;
                }, 1000);
            }
        }
    }
}

startGame();