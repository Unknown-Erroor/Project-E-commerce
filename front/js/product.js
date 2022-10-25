const params = new URLSearchParams(document.location.search);
const productId = params.get("id");
console.log(productId);
const picture = document.querySelector(".item__img");
const name = document.getElementById("title");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
const price = document.getElementById("price");
fetch(`http://localhost:3000/api/products/${productId}`)
  .then(response => response.json())
  .then(result => {
    picture.innerHTML = `<img src="${result.imageUrl}" alt="${result.altTxt}">`;
    name.innerHTML = result.name;
    description.innerHTML = result.description;
    price.innerHTML = result.price;
    result.colors.forEach(element => {
      const option = document.createElement("option");
      option.innerHTML = element;
      option.value = element;
      colors.appendChild(option);
    });
  })
  .catch((error) => console.log("error : " + error));

let data = localStorage.getItem("panier"); 
console.log(data);
const button = document.querySelector("#addToCart");
if (data == null) {
  data = [];
}
else {
  data = JSON.parse(data);
  console.log(data);
}
button.addEventListener("click", () => {
      const quantity = document.querySelector("#quantity");
      let product = {
        id: productId,
        couleur: colors.value,
        quantity: quantity.value
      }
      console.log(product);
      if (colors.value == null || colors.value === "" || quantity.value == null || quantity.value <= 0 || quantity.value > 100) {
        alert("Veuillez renseigner une couleur et une quantité maximum 100.");
      }
      else {
        const found = data.find(element => element.id == product.id && element.couleur == product.couleur);
        console.log(found);
        if(found != undefined){
          let newQuantity = parseInt(product.quantity) + parseInt(found.quantity);
          if(newQuantity > 100){
            alert("le produit ne peut pas etre superieur a 100");
          }else{
            found.quantity = newQuantity;
            localStorage.setItem("panier", JSON.stringify(data))
          }
        }else{
          console.log(product)
          console.log(data)
          data.push(product);
          localStorage.setItem("panier", JSON.stringify(data))
        }

      }

      

      
    });
  