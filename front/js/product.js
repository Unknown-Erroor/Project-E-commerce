const params = new URLSearchParams(document.location.search); // variable params récupère l'url de la page
const productId = params.get("id"); //  productId récupére la valeur du paramètre id
console.log(productId);
const picture = document.querySelector(".item__img");
const name = document.getElementById("title");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
const price = document.getElementById("price");
fetch(`http://localhost:3000/api/products/${productId}`) // Recuperation des produits puis affichage dans l'HTML.
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

let data = localStorage.getItem("panier"); // localStorage
console.log(data);
const button = document.querySelector("#addToCart");
if (data == null) { // si localStorage est nul 
    data = []; // creation d'un tableau vide
} else { // si localStorage n'est pas nul
    data = JSON.parse(data); // convertit string en JSON
    console.log(data);
}

function setPanier() { // met a jour le panier
    localStorage.setItem("panier", JSON.stringify(data));
}

button.addEventListener("click", () => { // ecoute ce qu'il se passe au click sur "quantity"
    const quantity = document.querySelector("#quantity");
    let product = { // creation tableau product
        id: productId,
        couleur: colors.value,
        quantity: quantity.value
    }
    console.log(product);
    if (colors.value == null || colors.value === "" || quantity.value == null || quantity.value <= 0 || quantity.value > 100) { // conditions pour pouvoir ajouter un produit dans le panier 
        alert("Veuillez renseigner une couleur et une quantité maximum 100.");
    } else {
        const found = data.find(element => element.id == product.id && element.couleur == product.couleur);
        console.log(found);
        if (found != undefined) {
            let newQuantity = parseInt(product.quantity) + parseInt(found.quantity);
            if (newQuantity > 100) {
                alert("le produit ne peut pas etre superieur a 100");
            } else {
                found.quantity = newQuantity;
                setPanier();
            }
        } else {
            console.log(product)
            console.log(data)
            data.push(product);
            setPanier();
        }
    }
});