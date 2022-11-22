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
            data.splice(i, 1);
            localStorage.setItem("panier", JSON.stringify(data))
            return location.reload();
          })
        })
        const itemQuantity = document.querySelectorAll('.itemQuantity');
        itemQuantity.forEach((btn, i) => {
          btn.addEventListener("change", () => {
            if (btn.value > 100) {
              alert("le produit ne peut pas etre superieur a 100")
            }
            else if (btn.value <= 0) {
              data.splice(i, 1);
              console.log(data)
              localStorage.setItem("panier", JSON.stringify(data))
              return location.reload();
            }
            else {
            console.log(btn.value)
            console.log(data[i].quantity)
            data[i].quantity = btn.value; 
            localStorage.setItem("panier", JSON.stringify(data))
            return location.reload(); 
          }
          })
        })
        let totalArticle = 0;
        data.forEach((data) => {
        totalArticle += parseInt(data.quantity);
        document.getElementById("totalQuantity").textContent = totalArticle;
        })
        let total = 0;
        data.forEach(element => {
          const found = result.find(dataFind => dataFind._id == element.id);
          totalPrix = element.quantity * found.price;
          total += totalPrix;
          
        }) 
        document.getElementById("totalPrice").textContent = total;




        let regValidEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        let regexString = /^([A-Za-z]+),\s+([A-Za-z]+)\s+([A-Za-z]+)?$/gm;
        let regexAdresse = /^([0-9]*) ?([a-zA-Z,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)/g;
        

          

    })
    .catch((error) => console.log("error : " + error));
