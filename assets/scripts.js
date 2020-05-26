document.addEventListener("DOMContentLoaded", function() {
    //card options
    const originalCards = [
        {
            name : "giza",
            img  : "./assets/img/01-giza.svg"
        },
        {
            name : "crater",
            img  : "./assets/img/02-crater.svg"
        },
        {
            name : "virgo",
            img  : "./assets/img/03-virgo.svg"
        },
        {
            name : "bootes",
            img  : "./assets/img/04-bootes.svg"
        },
        {
            name : "centaurus",
            img  : "./assets/img/05-centaurus.svg"
        },
        {
            name : "libra",
            img  : "./assets/img/06-libra.svg"
        },
        {
            name : "serpens-caput",
            img  : "./assets/img/07-serpens-caput.svg"
        },
        {
            name : "norma",
            img  : "./assets/img/08-norma.svg"
        },
        {
            name : "scorpius",
            img  : "./assets/img/09-scorpius.svg"
        }
    ];

    //Duplicate Original Cards, and setup their pairs
    cardArray = Array.prototype.concat(originalCards, originalCards);
    // Randomize the cards
    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector(".grid");
    const resultDisplay = document.getElementById("result");
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];

    //Create Board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement("img");
            card.setAttribute("src", "./assets/img/sq-puddle.jpg");
            card.setAttribute("width", "100");
            card.setAttribute("height", "100");
            card.setAttribute("data-id", i);
            card.classList.add("card");

            card.addEventListener("click", flipCard);

            grid.appendChild(card);
        }

        resultDisplay.textContent = cardsWon.length;
    }
    createBoard();

    //Check for Matches
    function checkForMatch() {
        var cards = document.querySelectorAll("img.card");
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        // Check the name of the img
        if (cardsChosen[0] === cardsChosen[1]) {
            alert("You Found a Match!");
            removeCard(cards[optionOneId]);
            removeCard(cards[optionTwoId]);

            // Track Found Pairs
            cardsWon.push(cardsChosen);
        } else {
            resetCard(cards[optionOneId]);
            resetCard(cards[optionTwoId]);
            alert("Sorry, try again.");
        }

        // Reset Chosen Arrays
        cardsChosenId = [];
        cardsChosen = [];

        // Remove Flippped status
        cards[optionOneId].classList.remove("flipped");
        cards[optionTwoId].classList.remove("flipped");

        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = cardsWon.length + " Congratulations, you won!";
        }
    }

    // flip Card
    function flipCard() {
        // add conditional to prevent clicking the same card
        if (this.classList.contains("flipped")) return;

        var cardId = this.getAttribute("data-id");
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute("src", cardArray[cardId].img);
        this.classList.add("flipped");

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function resetCard(target) {
        target.setAttribute("src", "./assets/img/sq-puddle.jpg");
    }

    /**
     * set completed image, remove Event Listener when Card is removed from play
     * @param {HTMLElement} target 
     */
    function removeCard(target) {
        target.setAttribute("src", "./assets/img/sm-ring.jpg");
        target.removeEventListener("click", flipCard);
    }
}); // End DOM Content Loaded
