const items = document.getElementById('items');
fetch("http://localhost:3000/api/products") //Recuperer les produits de l'Api
    .then(response => response.json())      //Donne le resultat en JSON
    .then(result =>{
        console.table(result);
        for(let product of result){
            console.log(product.name);         
            items.innerHTML += `<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a> `;
        }
    })
    .catch((error) => console.log("error : " + error));