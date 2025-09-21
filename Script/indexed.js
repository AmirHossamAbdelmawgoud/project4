document.addEventListener("DOMContentLoaded", function() {
    let but2 = document.querySelector(".span_2");
    let full_name = document.querySelector(".form_Full_Name");
    let getfull_name = localStorage.getItem("full_name");
    
    if (full_name !== "" && getfull_name) {
        but2.innerHTML = getfull_name;
    }

    var number = 0;

    let allpridect = document.querySelector(".card-decks");
let prodect = [
        { id: 1, Type: "iphone 12", price: 6500, catgore: "watched" , image:"image/iphone 12.jpg"},
        { id: 2, Type: "iphone 16", price: 8000, catgore: "yelloe" , image:"image/iphone 16.jpg"},
        { id: 3, Type: "samsung galaxy z", price: 9000, catgore: "watched" , image:"image/samsung galaxy z.jpg"},
        { id: 4, Type: "poco 3", price: 9000, catgore: "watched" , image:"image/poco 3.jpg"},
        { id: 5, Type: "Redmi Note11", price: 12000, catgore: "watched" , image:"image/Redmi Note11.jpg"},
        { id: 6, Type: "Reno 5", price: 12000, catgore: "watched" , image:"image/Reno 5.webp"},
        { id: 7, Type: "Reno 7", price: 12000, catgore: "watched" , image:"image/Reno 7.webp"},
        { id: 8, Type: "samsung a16", price: 24000, catgore: "watched" , image:"image/samsung a16.jpg"},
        { id: 9, Type: "Valu16", price: 12000, catgore: "watched" , image:"image/Valu16.jpg"},
    ];

   function draw() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    let y = prodect.map((item) => {
        const isFavorite = favorites.some(fav => fav.type === item.Type);
        const inCart = cart.some(cartItem => cartItem.type === item.Type);
        
        return `<div class="card">
            <img src="${item.image}" class="card-img-top" alt="${item.Type}">
            <div class="card-body">
                <h5 class="card-title">${item.Type}</h5>
                <p class="card-text">${item.price}.</p>
                <p class="card-text"><small class="text-muted">${item.catgore}</small></p>
                <i class="fas fa-heart icon_2" style="${isFavorite ? 'color: red;' : ''}"></i>
                <button type="button" class="btn btn-primary btn-sm button_1" 
                    ids="${item.Type}" 
                    pp="${item.price}"
                    catgore="${item.catgore}"
                    data-image="${item.image}"
                    style="${inCart ? 'background-color: red;' : ''}"> 
                    ${inCart ? 'Added to cart' : 'Small button'}
                </button>
            </div>
        </div>`;
    });
    allpridect.innerHTML = y.join('');
    
    addHeartEventListeners();
    addCartEventListeners();
}
    draw();

    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        number = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        bb.innerHTML = number;
        
        u.innerHTML = '';
        
        cart.forEach(item => {
            u.innerHTML += `
                <div class="div_prodect">
                    <div>
                        <span>${item.type}</span>
                        <span class="a1" data-price="${item.price}">price: ${item.price * (item.quantity || 1)}</span> 
                        <button class="icon_11"><i class="fas fa-minus"></i></button>
                        <button class="icon_12"><i class="fas fa-plus"></i></button>
                        <span class="spa">${item.quantity || 1}</span>
                    </div>
                </div>`;
        });
    }

    let buttons = document.querySelectorAll(".button_1");
    let bb = document.querySelector(".icon_1");
    let u = document.querySelector(".div_view");
    
    if (bb && u) {
        loadCart();
    }

    function addHeartEventListeners() {
        let e = document.querySelectorAll(".icon_2");
        e.forEach(function(icon) {
            icon.dataset.originalColor = window.getComputedStyle(icon).color;
            
            icon.addEventListener("click", function(f) {
                f.preventDefault();
                
                if (this.style.color === "red") {
                    this.style.color = this.dataset.originalColor;
                    removeFromFavorites(this.closest('.card').querySelector('.card-title').textContent);
                } else {
                    this.style.color = "red";
                    addToFavorites(this);
                }
            });
        });
    }
    
    function addCartEventListeners() {
        let buttons = document.querySelectorAll(".button_1");
        
        buttons.forEach(function(button) {
            button.addEventListener("click", function(p) {
                p.preventDefault();
                number++;
                
                const productId = this.getAttribute("ids");
                const productprice = this.getAttribute("pp");
                const productCatgore = this.getAttribute("catgore");
                const productImage = this.getAttribute("data-image");

                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                
                const existingProductIndex = cart.findIndex(item => item.type === productId);
                
                if (existingProductIndex !== -1) {
                    cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
                } else {
                    cart.push({
                        type: productId,
                        price: productprice,
                        catgore: productCatgore,
                        image: productImage,
                        quantity: 1
                    });
                }
                
                localStorage.setItem("cart", JSON.stringify(cart));
                
                this.style.backgroundColor = "red";
                this.textContent = "Added to cart";
                
                if (u) {
                    u.innerHTML += `
                        <div class="div_prodect">
                            <div>
                                <span>${productId}</span>
                                <span class="a1" data-price="${productprice}">price: ${productprice}</span> 
                                <button class="icon_11"><i class="fas fa-minus"></i></button>
                                <button class="icon_12"><i class="fas fa-plus"></i></button>
                                <span class="spa">1</span>
                            </div>
                        </div>`;
                }
                
                if (bb) {
                    bb.innerHTML = number;
                }
            });
        });
    }

    function addToFavorites(icon) {
        const card = icon.closest('.card');
        const productName = card.querySelector('.card-title').textContent;
        const productPrice = card.querySelector('.card-text').textContent.replace('.', '');
        const productCategory = card.querySelector('.text-muted').textContent;
        const productImage = card.querySelector('.card-img-top').src;
        
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        
        const existingProductIndex = favorites.findIndex(item => item.type === productName);
        
        if (existingProductIndex === -1) {
            favorites.push({
                type: productName,
                price: productPrice,
                catgore: productCategory,
                image: productImage,
                isFavorite: true
            });
            
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }

    function removeFromFavorites(productName) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favorites = favorites.filter(item => item.type !== productName);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    let viewshow = document.querySelector(".div_1"); 
    let veder = document.querySelector(".icon_1"); 

    if (veder && viewshow) {
        veder.addEventListener("click", function(e) {
            e.preventDefault();
            viewshow.style.display = viewshow.style.display === "none" ? "block" : "none";
        });
    }

    if (u) {
        u.addEventListener("click", function(e) {
            if (e.target.closest(".icon_12")) {
                let btn = e.target.closest(".icon_12");
                let ter = btn.parentElement.querySelector(".spa");
                let number1 = parseInt(ter.innerHTML) || 0;
                number1++;
                ter.innerHTML = number1;

                let priceSpan = btn.parentElement.querySelector(".a1");
                let productPrice = parseInt(priceSpan.getAttribute("data-price")) || 0;
                priceSpan.innerHTML = "price: " + (productPrice * number1);
                
                updateLocalStorageQuantity(btn, number1);
            }

            if (e.target.closest(".icon_11")) {
                let btn = e.target.closest(".icon_11");
                let ter = btn.parentElement.querySelector(".spa");
                let number1 = parseInt(ter.innerHTML) || 0;

                if (number1 > 1) {
                    number1--;
                    ter.innerHTML = number1;

                    let priceSpan = btn.parentElement.querySelector(".a1");
                    let productPrice = parseInt(priceSpan.getAttribute("data-price")) || 0;
                    priceSpan.innerHTML = "price: " + (productPrice * number1);
                    
                    updateLocalStorageQuantity(btn, number1);
                } else {
                    let parentDiv = btn.closest(".div_prodect");
                    if (parentDiv) {
                        let productName = parentDiv.querySelector("span").textContent;
                        removeFromLocalStorage(productName);
                        
                        parentDiv.remove();
                    }
                    if (number > 0) {
                        number--;
                        if (bb) {
                            bb.innerHTML = number;
                        }
                    }
                    
                    buttons.forEach(btn => {
                        if (btn.style.backgroundColor === "red") {  
                            btn.style.backgroundColor = "blue";
                        }
                    });
                }
            }
        });
    }

    function updateLocalStorageQuantity(btn, newQuantity) {
        let productName = btn.closest(".div_prodect").querySelector("span").textContent;
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        const productIndex = cart.findIndex(item => item.type === productName);
        if (productIndex !== -1) {
            cart[productIndex].quantity = newQuantity;
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }

    function removeFromLocalStorage(productName) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart = cart.filter(item => item.type !== productName);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    let searchMode = "title";
    let searchInput = document.getElementById("searchInput");
    let dropdownItems = document.querySelectorAll(".dropdown-item");
    let btn3 = document.querySelector(".btn_3");
    
    if (dropdownItems && btn3) {
        dropdownItems.forEach(item => {
            item.addEventListener("click", function() {
                searchMode = this.getAttribute("data-search");
                btn3.textContent = this.textContent;
            });
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener("keyup", function() {
            let filter = this.value.toLowerCase();
            let cards = document.querySelectorAll(".card-decks .card");

            cards.forEach(card => {
                let textToSearch = "";
                if (searchMode === "title") {
                    textToSearch = card.querySelector(".card-title").textContent.toLowerCase();
                } else {
                    textToSearch = card.querySelector(".text-muted").textContent.toLowerCase();
                }

                card.style.display = textToSearch.indexOf(filter) > -1 ? "" : "none";
            });
        });
    }
});