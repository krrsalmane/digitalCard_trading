let drawBtn = document.getElementById("draw-card-btn");
let myDeck = JSON.parse(localStorage.getItem("userDeck")) || [];
let myHandContainer = document.getElementById("player-hand-container");

console.log(myDeck);
console.log("this is my deck");
drawBtn.addEventListener('click', () => {
    
    let currentHandCount = myHandContainer.children.length;
    
    myDeck.forEach((card, index) => {
        if (currentHandCount + index < 5) { 
            myHandContainer.innerHTML += `
                <div data-card-id="${card.id}" class="my_deck flex flex-col gap-2 rounded-xl border-4 border-${card.rarityClass}-400 bg-component-dark p-2 transition-transform duration-300 hover:scale-[1.02]">
                    <div class="w-full overflow-hidden rounded-lg bg-center bg-no-repeat aspect-[3/4] bg-cover">
                        <img src="${card.image}" alt="${card.name}">
                    </div>
                    <div class="flex flex-col items-start p-1">
                        <p class="text-lg font-bold text-white">${card.name}</p>
                        <p class="text-sm font-medium text-${card.rarityClass}-400">${card.rarity}</p>
                    </div>
                </div>
            `;
        }
    });
});


