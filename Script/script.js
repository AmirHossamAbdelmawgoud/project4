document.addEventListener("DOMContentLoaded", function() {

let allpridect=document.querySelector(".card-decks")
let prodect = [
          { id: 1, Type: "iphone 12", price: 6500, catgore: "watched" , image:"image/iphone 12.jpg"},
        { id: 2, Type: "iphone 16", price: 8000, catgore: "yelloe" , image:"image/iphone 16.jpg"},
        { id: 3, Type: "samsung galaxy z", price: 9000, catgore: "watched" , image:"image/samsung galaxy z.jpg"},
        { id: 4, Type: "poco 3", price: 9000, catgore: "watched" , image:"image/poco 3.jpg"},
        { id: 5, Type: "Redmi Note11", price: 12000, catgore: "watched" , image:"image/Redmi Note11.jpg"},
        { id: 6, Type: "Reno 5", price: 12000, catgore: "watched" , image:"image/Reno 5.webp"},
        { id: 7, Type: "Reno 7", price: 12000, catgore: "watched" , image:"image/Reno 7.webp"},
        { id: 8, Type: "samsung a16", price: 24000, catgore: "watched" , image:"image/samsung a16.jpg"},
        { id: 9, Type: "Valu16", price: 12000, catgore: "watched" , image:"image/Valu16.jpg"},    ];
function draw(){
    let y=prodect.map((item)=>{
        return` <div class="card">
            <img src="${item.image}" class="card-img-top" alt="${item.Type}">
    <div class="card-body">
      <h5 class="card-title">${item.Type}</h5>
      <p class="card-text">${item.price}.</p>
      <p class="card-text"><small class="text-muted">${item.catgore}</small></p>
      <i class="fas fa-heart icon_2"></i>
      <button type="button" class="btn btn-primary btn-sm button_1">Small button</button>
    </div>
  </div>
  `
  
    })
    allpridect.innerHTML = y.join("");

}
draw()



let e = document.querySelectorAll(".icon_2");
let f = document.querySelectorAll(".button_1");


e.forEach(function(e) {
        e.addEventListener("click", function(f) {
        f.preventDefault();
        
    setTimeout(
()=>{
    window.location="sign_in.html"  
},100
)
    });
});


f.forEach(function(f) {    
    f.addEventListener("click", function(f) {
        f.preventDefault();
        
    setTimeout(
()=>{
    window.location="sign_in.html"  
},100
)
    });
});





let searchMode = "title";   

  document.querySelectorAll(".dropdown-item").forEach(item => {          
    item.addEventListener("click", function() {
      searchMode = this.getAttribute("data-search");        
      document.querySelector(".btn_3").textContent = this.textContent; 



    });
  });
  document.getElementById("searchInput").addEventListener("keyup", function() {  
    let filter = this.value.toLowerCase();     
    let cards = document.querySelectorAll(".card-decks .card");   

    cards.forEach(card => {
      let textToSearch = "";
      if (searchMode === "title") {           
        textToSearch = card.querySelector(".card-title").textContent.toLowerCase();
      } else { 
        textToSearch = card.querySelector(".text-muted").textContent.toLowerCase();
      }

      if (textToSearch.indexOf(filter) > -1) { 
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
  });