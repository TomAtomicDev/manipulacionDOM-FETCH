/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseURL = "https://platzi-avo.vercel.app"; 
const appNode= document.querySelector('#app');

//Usando la API de internacionalización
const formatPrice = price => {

  const newPrice = new window.Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
  }).format(price)

  return newPrice;
}

//Conectando con el servidor de la API
window.fetch(baseURL + '/api/avo')
//Precesando la respuesta
.then( respuesta=>respuesta.json())
//Visualizando la data del JSON
.then((responseJson)=>{
    const allItems = [];

    responseJson.data.forEach((item) => {
        // create image
        const image = document.createElement("img");
        image.src=`${baseURL}${item.image}`;
        image.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";
        
        // create title
        const title = document.createElement("h2");
        title.className = "text-lg";
        title.textContent = item.name;
        
        // create price
        const price = document.createElement("div");
        price.textContent=item.name;
        price.className = "text-gray-600"
        price.textContent = formatPrice(item.price);
        
        // Creamos un contenedor el título y el precio
        const priceAndTitle = document.createElement("div")
        priceAndTitle.className = "text-center md:text-left";
        priceAndTitle.appendChild(title);
        priceAndTitle.appendChild(price);

        // Metemos todo dentro de una tarjeta contenedora
        const card = document.createElement("div");
        card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
        card.append(image, priceAndTitle);

        // Metemos todo dentro del contenedor principal
        const contenedor = document.createElement("div");
        contenedor.appendChild(card);
        
        
        // adding the container to an array
        allItems.push(contenedor);
    });
    // adding the array of container nodes to the document
  appNode.append(...allItems);
  appNode.className= 'mt-10 grid grid-cols-2 gap-2';
});

