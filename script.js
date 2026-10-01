const searchBox = document.getElementById("search");
const cards = document.querySelectorAll(".magazine-card");

searchBox.addEventListener("input", function() {

    const searchText = searchBox.value.toLowerCase();

    cards.forEach(function(card) {

        const cardText = card.textContent.toLowerCase();

        if (cardText.includes(searchText)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

});
