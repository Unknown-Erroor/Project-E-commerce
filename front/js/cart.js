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
fetch("http://localhost:3000/api/products") 
    .then(response => response.json())      
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
    })
    .catch((error) => console.log("error : " + error));


let regValidEmail = /[a-zA-Z0-9.-_]+@{1}[a-zA-Z0-9.-_]+\.{1}[a-z]{1,10}/;
let regexString = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
let regexAdresse = /((^[0-9]*).?((BIS)|(TER)|(QUATER))?)?((\W+)|(^))(([a-z]+.)*)([0-9]{5})?.(([a-z\'']+.)*)$/;  
 
const firstName = document.getElementById('firstName')
const firstNameErrorMsg = document.getElementById('firstNameErrorMsg')
let firstNameState = false;
firstName.addEventListener('keyup', (regexTest) => {
  regexTest = regexString.test(firstName.value)
  firstNameErrorMsg.innerHTML = regexTest ? "" : "Veuillez renseigner votre prenom valid"
  firstNameState = regexTest ? true : false
  console.log(regexTest)
})

const lastName = document.getElementById('lastName')
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg')
let lastNameState = false;
lastName.addEventListener('keyup', (regexTest) => {
  regexTest = regexString.test(lastName.value)
  lastNameErrorMsg.innerHTML = regexTest ? "" : "Veuillez renseigner votre nom valid"
  lastNameState = regexTest ? true : false
  console.log(regexTest)
})

const address = document.getElementById('address')
const addressErrorMsg = document.getElementById('addressErrorMsg')
let addressState = false;
address.addEventListener('keyup', (regexTest) => {
  regexTest = regexAdresse.test(address.value)
  addressErrorMsg.innerHTML = regexTest ? "" : "Veuillez renseigner votre adresse valid"
  addressState = regexTest ? true : false
  console.log(regexTest)
})

const city = document.getElementById('city')
const cityErrorMsg = document.getElementById('cityErrorMsg')
let cityState = false;
city.addEventListener('keyup', (regexTest) => {
  regexTest = regexString.test(city.value)
  cityErrorMsg.innerHTML = regexTest ? "" : "Veuillez renseigner votre ville valid"
  cityState = regexTest ? true : false
  console.log(regexTest)
})

const email = document.getElementById('email')
const emailErrorMsg = document.getElementById('emailErrorMsg')
let emailState = false;
email.addEventListener('keyup', (regexTest) => {
  regexTest = regValidEmail.test(email.value)
  emailErrorMsg.innerHTML = regexTest ? "" : "Veuillez renseigner votre Email valid"
  emailState = regexTest ? true : false
  console.log(regexTest)
})
    
const envoyer = document.querySelector('.cart__order__form');
envoyer.addEventListener('submit', (e) => {
  e.preventDefault()
  if (data.length === 0) {
    alert("Vous n'avez pas de produit dans votre panier")
  }
  else if (data.length >= 1) {
    if (!firstNameState) {
      firstNameErrorMsg.innerHTML = "Veuillez renseigner votre prenom"
    }
    if (!lastNameState) {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner votre nom"
    }
    if (!addressState) {
      addressErrorMsg.innerHTML = "Veuillez renseigner votre adresse"
    }
    if (!cityState) {
      cityErrorMsg.innerHTML = "Veuillez renseigner votre ville"
    }
    if (!emailState) {
      emailErrorMsg.innerHTML = "Veuillez renseigner votre email"
    }
    if (firstNameState && lastNameState && addressState && cityState && emailState === true) { /*ajouter && lastNameState && adresseState && cityState && emailState*/
      let contact = {
        /* values de chaque input */
        firstName : firstName.value,
        lastName : lastName.value,
        address : address.value,
        city : city.value,
        email: email.value,
      }
      let products = []
      /* pousser dans products toutes les id du localStorage */
      if (data && data.length > 0) {
        for (let i of data) {
          products.push(i.id);
        } 
      }
      const sendData = {contact, products}
      /* fetch POST Pour envoyer sendData */
      fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData)
    })
      .then((res) => res.json())
      .then((response) => {
        let confirmationPage = "./confirmation.html?id=" + response.orderId;
        window.location.href = confirmationPage; 
        localStorage.clear();
      })
      .catch((error) => console.log("error : " + error));
    }
  }
})