let drawBtn = document.getElementById("draw-card-btn");
let myDeckId = JSON.parse(localStorage.getItem("userDeck")) || [];
let myHandContainer = document.getElementById("player-hand-container");

const CARDS = [
    { id: 1, name: "Aetherius, Sky Weaver", rarity: "Legendary", price: 99.99, image: "images/sky.png", description: "A being of pure starlight, able to bend constellations to its will." },
    { id: 2, name: "Gravemaw the Devourer", rarity: "Mythic", price: 149.99, image: "images/graveman.png", description: "It is said that entire worlds have vanished into its endless maw." },
    { id: 3, name: "Celestial Guardian", rarity: "Epic", price: 49.99, image: "images/angel.png", description: "An eternal sentinel sworn to protect the celestial gates." },
    { id: 4, name: "Shadowfen Ambusher", rarity: "Rare", price: 19.99, image: "images/shadowman.png", description: "Strikes from the shadows with poison-tipped blades." },
    { id: 5, name: "Sunstone Paladin", rarity: "Epic", price: 55.00, image: "images/hammer.png", description: "Wields the power of the sun to smite his foes." },
    { id: 6, name: "Riftwalker Mage", rarity: "Legendary", price: 89.99, image: "images/rifwalker.png", description: "Steps between dimensions as easily as one might walk across a room." },
    { id: 7, name: "Ironclad Golem", rarity: "Common", price: 5.99, image: "images/ironclad.png", description: "Animated by simple enchantment, it is a stalwart defender." },
    { id: 8, name: "Forest Whisperer", rarity: "Rare", price: 22.50, image: "images/forestwhisper.png", description: "Can hear the ancient secrets carried on the wind." },
    { id: 9, name: "Goblin Spark-Flinger", rarity: "Common", price: 4.50, image: "images/goblin.png", description: "Loves anything that goes 'boom'. Usually from a safe distance." },
    { id:10, name: "Sunfire Phoenix", rarity: "Mythic", price:35.5 ,image : "images/phenix.png", description: "It is said that entire worlds have vanished into its endless maw."},
    { id:11, name: "Ancient Dragon", rarity: "Epic", price:22.3 ,image : "images/AcientDragon.png",description: "An acient dragon leaved for a long time"},
    { id:12, name: "Ice Man", rarity: "Rare", price:72.5 , image :"images/iceman.png" ,description:"Strikes with ice man changes the weather to be colder"},
    { id:13, name: "Super Sneak", rarity: "Mythic" ,price:45.2 , image : "images/sneak.png" , description:"It is said that entire wold hass been eaten by this sneak"},
    { id:14, name: "White Angel", rarity:"common" ,price:71.6 , image : "images/whitewomen.png" ,description:"Loves anything to help guide people"},
    { id:15, name: "Dark shadow", rarity:"Legendary" ,price:95 , image: "images/darkman.png" , description:"Steps between dimensions takes souls"}
];

let deck = [];

myDeckId.forEach(id => {
    deck.push(CARDS.find(card => card.id === id))
})

console.log("deck: ", deck)

console.log("this is my deck");
drawBtn.addEventListener('click', () => {
    
    let currentHandCount = myHandContainer.children.length;
    
    deck.forEach((card, index) => {
        console.log(card)
        if (currentHandCount + index < 5) { 
           myHandContainer.innerHTML += `
    <div data-card-id="${card.id}" 
        class="my_deck w-44 flex flex-col gap-2 rounded-xl border-4 border-${card.rarityClass}-400 bg-component-dark p-2 transition-transform duration-300 hover:scale-[1.02]">
        
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


