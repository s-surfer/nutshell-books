document.addEventListener('DOMContentLoaded', () => {
    
    /* number of different decks of card */
    const decks = document.querySelectorAll('.slider_deck');
    const cards = document.querySelectorAll(".slider_card");
    let noOfCardsPerDeck = cards.length / decks.length;
    let currentIndex = 0;
    let firstTimeIndex = 0;

    function showNextCard() {
        /* loop through the decks advancing the active state */
        for (ci=0 ; ci < decks.length; ci++) {
            cards[currentIndex + (ci * noOfCardsPerDeck)].classList.remove('active');
        };
        currentIndex = (currentIndex + 1) % noOfCardsPerDeck;
        for (ci=0 ; ci < decks.length; ci++) {
            cards[currentIndex + (ci * noOfCardsPerDeck)].classList.add('active');
        };
    };

    // Show the first element initially of each card deck
    while (firstTimeIndex < cards.length) {
        cards[firstTimeIndex].classList.add('active');
        firstTimeIndex = firstTimeIndex + noOfCardsPerDeck;
    };
    
    // Set an interval to rotate the cards every 3 seconds
    setInterval(showNextCard, 5000);

});
