const items = document.getElementById('cart__items');
let data = localStorage.getItem("panier"); 
const button = document.querySelector("#addToCart");
if (data == null) {
  const emptyBasket = document.getElementById("cartAndFormContainer")
  emptyBasket.innerHTML = `<h1> Votre panier est vide </h1>`;
}
else {
  data = JSON.parse(data);
}
fetch("http://localhost:3000/api/products") //Recuperer les produits de l'Api
    .then(response => response.json())      //Donne le resultat en JSON
    .then(result =>{
        data.forEach(element => {
            const found = result.find(dataFind => dataFind._id == element.id);
            items.innerHTML += `<article class="cart__item" data-id="${found._id}" data-color="${found.colors}">
            <div class="cart__item__img">
              <img src="${found.imageUrl}" alt="${found.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${found.name}</h2>
                <p>${element.couleur}</p>
                <p>${found.price}€</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`;
        });
        const deleteBtn = document.querySelectorAll('.deleteItem');
        deleteBtn.forEach((btn, i) => {
          btn.addEventListener("click", () => {
            console.log(btn);
            console.log(i);
          })
        })
    })
    .catch((error) => console.log("error : " + error));

