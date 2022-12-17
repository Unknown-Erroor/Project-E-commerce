const items = document.getElementById('items'); //pointe l'id 'items' dans l'HTML
fetch("http://localhost:3000/api/products") //Recuperer les produits de l'Api
    .then(response => response.json()) //Donne le resultat en JSON
    .then(result => {  
        for (let product of result) { // parcourt le resultat et les affiche dynamiquement dans l'HTML      
            items.innerHTML += `<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a> `;
        }
    })
    .catch((error) => console.log("error : " + error)); // dans le cas d'une erreur, renvoit dans la console error + l'erreur.