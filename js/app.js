
const CARD_DATA = [
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

CARD_DATA={id,name,rarity,image,description}.filter(price<30);










const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const findCard = (id) => CARD_DATA.find(card => card.id === parseInt(id));

const updateCartCount = () => {
    const cart = getStorage('cart');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCounter = document.getElementById('cart-counter'); 
    if (cartCounter) {
        cartCounter.textContent = totalItems > 0 ? `(${totalItems})` : '';
    }
};

const getCardHTML = (card, pageType = 'market') => {
    const rarityClass = card.rarity.toLowerCase(); 
    
    if (pageType === 'deck') {
        return `
            <div data-card-id="${card.id}" class="flex flex-col gap-2 rounded-xl border-4 border-${rarityClass}-400 bg-component-dark p-2 transition-transform duration-300 hover:scale-[1.02]">
                <div class="w-full overflow-hidden rounded-lg bg-center bg-no-repeat aspect-[3/4] bg-cover">
                    <img src="${card.image}" alt="${card.name}">
                </div>
                <div class="flex flex-col items-start p-1">
                    <p class="text-lg font-bold text-white">${card.name}</p>
                    <p class="text-sm font-medium text-${rarityClass}-400">${card.rarity}</p>
                </div>
            </div>
        `;
    }

  
    let actionButtons = `
        <button data-card-id="${card.id}" class="h-9 w-9 rounded-full bg-white/10 add-to-favorites-btn">❤️</button>
        <button data-card-id="${card.id}" class="h-9 rounded-full bg-[#DC143C] px-4 text-sm font-bold text-white add-to-cart-btn">Add to cart</button>
    `;
    if (pageType === 'favorites') {
        actionButtons = `
            <button data-card-id="${card.id}" class="h-9 w-9 rounded-full bg-yellow-500 remove-from-favorites-btn">❌</button>
            <button data-card-id="${card.id}" class="h-9 rounded-full bg-[#DC143C] px-4 text-sm font-bold text-white add-to-cart-btn">Add to cart</button>
        `;
    }

    return `
        <div id="card-${card.id}" class="flex flex-col gap-4 rounded-xl border border-${rarityClass}-400 bg-component-dark p-4 transition-transform duration-300 hover:-translate-y-2">
            <div class="w-full overflow-hidden rounded-lg bg-center bg-no-repeat aspect-[3/4] bg-cover">
                <img src="${card.image}" alt="${card.name}">
            </div>
            <p class="text-lg font-bold text-white">${card.name}</p>
            <p class="text-sm font-normal text-${rarityClass}-400">${card.rarity}</p>
            <p class="mt-1 text-xs text-white/50">${card.description.substring(0, 50)}...</p>
            
            <div class="flex items-center justify-between">
                <p class="text-xl font-bold text-white">$${card.price.toFixed(2)}</p>
                <div class="flex items-center gap-2">
                    ${actionButtons}
                </div>
            </div>
        </div>
    `;
};

const renderCards = (cards, containerId, pageType) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const html = cards.map(card => getCardHTML(card, pageType)).join('');
    container.innerHTML = html;
};


const addToCart = (cardId) => {
    let cart = getStorage('cart');
    let existingItem = cart.find(item => item.id === parseInt(cardId));

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: parseInt(cardId), quantity: 1 });
    }
    setStorage('cart', cart);
    updateCartCount(); 
    if (document.getElementById('cart-items-container')) {
        renderCart();
    }
};

const addToFavorites = (cardId) => {
    let favorites = getStorage('favorites');
    if (!favorites.includes(parseInt(cardId))) {
        favorites.push(parseInt(cardId));
        setStorage('favorites', favorites);
    }
};

const removeFromFavorites = (cardId) => {
    let favorites = getStorage('favorites');
    const newFavorites = favorites.filter(id => id !== parseInt(cardId));
    setStorage('favorites', newFavorites);
};




const initMarket = () => {
    const containerId = 'market-cards-container';
    const container = document.getElementById(containerId);
    if (!container) return;

    renderCards(CARD_DATA, containerId, 'market');

    document.querySelectorAll('.rarity-filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedRarity = e.currentTarget.dataset.rarity;

            if (selectedRarity === 'All') {
                renderCards(CARD_DATA, containerId, 'market');
                return;
            }

            const filteredCards = CARD_DATA.filter(card => card.rarity === selectedRarity);
            renderCards(filteredCards, containerId, 'market');
        });
    });

    container.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target || !target.dataset.cardId) return;
        const cardId = parseInt(target.dataset.cardId);

        if (target.classList.contains('add-to-cart-btn')) {
            addToCart(cardId);
        } else if (target.classList.contains('add-to-favorites-btn')) {
            addToFavorites(cardId);
        }
    });
};

const initFavorites = () => {
    const containerId = 'favorites-cards-container';
    const container = document.getElementById(containerId);
    const emptyMessage = document.getElementById('empty-favorites-message');
    if (!container) return;

    const favoriteIds = getStorage('favorites');
    
    if (favoriteIds.length === 0) {
        emptyMessage.classList.remove('hidden');
        container.innerHTML = '';
        return;
    } else {
        emptyMessage.classList.add('hidden');
    }

    const favoriteCards = CARD_DATA.filter(card => favoriteIds.includes(card.id));
    renderCards(favoriteCards, containerId, 'favorites');

    container.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target || !target.dataset.cardId) return;
        const cardId = parseInt(target.dataset.cardId);

        if (target.classList.contains('remove-from-favorites-btn')) {
             removeFromFavorites(cardId);
             initFavorites(); 
        } else if (target.classList.contains('add-to-cart-btn')) {
             addToCart(cardId);
        }
    });
};

const renderCart = () => {
    const containerId = 'cart-items-container';
    const container = document.getElementById(containerId);
    const totalDisplay = document.getElementById('cart-total-price');
    const emptyMessage = document.getElementById('empty-cart-message');
    if (!container) return;

    const cartItems = getStorage('cart');
    
    if (cartItems.length === 0) {
        container.innerHTML = '';
        emptyMessage.classList.remove('hidden');
        totalDisplay.textContent = '$0.00';
        return;
    } else {
        emptyMessage.classList.add('hidden');
    }
    
    const total = cartItems.reduce((sum, item) => {
        const card = findCard(item.id);
        return card ? sum + (card.price * item.quantity) : sum;
    }, 0);
    
    totalDisplay.textContent = `$${total.toFixed(2)}`;

    const cartHTML = cartItems.map(item => {
        const card = findCard(item.id);
        if (!card) return '';
        
        return `
            <div data-card-id="${card.id}" class="cart-item flex items-center justify-between bg-[#221b3d] p-4 rounded-lg mb-3">
                <img src="${card.image}" alt="${card.name}" class="w-14 h-14 rounded object-cover">
                <div class="flex flex-col flex-grow px-3">
                    <h3 class="text-sm font-semibold">${card.name}</h3>
                    <p class="text-gray-400 text-xs">$${card.price.toFixed(2)}</p>
                </div>
                
                <div class="flex items-center space-x-3">
                    <button class="bg-[#2a254d] rounded-full w-6 h-6 flex items-center justify-center text-sm quantity-btn" data-action="decrement" data-card-id="${card.id}">-</button>
                    <span class="text-sm cart-item-quantity">${item.quantity}</span>
                    <button class="bg-[#2a254d] rounded-full w-6 h-6 flex items-center justify-center text-sm quantity-btn" data-action="increment" data-card-id="${card.id}">+</button>
                </div>
                
                <button class="ml-4 text-gray-400 hover:text-red-400 text-lg remove-cart-item-btn" data-card-id="${card.id}">✕</button>
            </div>
        `;
    }).join('');

    container.innerHTML = cartHTML;
};

const initCart = () => {
    if (!document.getElementById('cart-items-container')) return;
    
    renderCart();

    document.getElementById('cart-items-container').addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target || !target.dataset.cardId) return;

        const cardId = parseInt(target.dataset.cardId);
        let cart = getStorage('cart');
        let itemIndex = cart.findIndex(item => item.id === cardId);

        if (itemIndex === -1) return;

        if (target.classList.contains('quantity-btn')) {
            const action = target.dataset.action;
            
            if (action === 'increment') {
                cart[itemIndex].quantity += 1;
            } else if (action === 'decrement') {
                cart[itemIndex].quantity -= 1;
            }
        } else if (target.classList.contains('remove-cart-item-btn')) {
            cart[itemIndex].quantity = 0; 
        }

        const updatedCart = cart.filter(item => item.quantity > 0);
        
        setStorage('cart', updatedCart);
        renderCart();
        updateCartCount();
    });

    document.getElementById('clear-cart-button')?.addEventListener('click', () => {
        setStorage('cart', []);
        renderCart();
        updateCartCount();
    });

    document.getElementById('checkout-button')?.addEventListener('click', () => {
        let cart = getStorage('cart');
        if (cart.length === 0) {
            return;
        }

        let deck = getStorage('userDeck');
        cart.forEach(item => {
            for(let i = 0; i < item.quantity; i++) {
                deck.push(item.id);
            }
        });

        setStorage('userDeck', deck);
        setStorage('cart', []);
        renderCart();
        updateCartCount();
        
    });
};

const initMyDeck = () => {
    const containerId = 'deck-cards-container';
    const container = document.getElementById(containerId);
    if (!container) return;

    const renderDeck = (deckIds) => {
        const deckCards = CARD_DATA.filter(card => deckIds.includes(card.id));
        renderCards(deckCards, containerId, 'deck');
    };

    const initialDeckIds = getStorage('userDeck');
    renderDeck(initialDeckIds);

    document.querySelectorAll('.deck-rarity-filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedRarity = e.currentTarget.dataset.rarity;
            const currentDeckIds = getStorage('userDeck');
            
            if (selectedRarity === 'All') {
                renderDeck(currentDeckIds);
                return;
            }

            const filteredCards = CARD_DATA.filter(card => card.rarity === selectedRarity);
            const filteredDeckIds = currentDeckIds.filter(id => filteredCards.some(card => card.id === id));
            
            renderDeck(filteredDeckIds);
        });
    });
    

};


document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('Market.html')) {
        initMarket();
    } else if (path.includes('favorites.html')) {
        initFavorites(); 
    } else if (path.includes('Panier.html')) {
        initCart(); 
    } else if (path.includes('my_Deck.html')) {
        initMyDeck(); 
    }
    
    updateCartCount(); 
});


// --- MOBILE MENU TOGGLE FUNCTIONALITY ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}



function morethan(){
const cardsprice = document.querySelector('div')
console.log(cardsprice+"cardprice");
cardsprice.filteredCards


}

morethan();
