
const url = "https://docs.google.com/spreadsheets/d/"
const ssid = "1oufGOijoO9u_xmxgxgx0ax24SZnrKoa8uf-jFULNaPE";
const query1 = `/gviz/tq?`; //visualization data
const query2 = 'tqx=out:json';


//output.innerHTML = endpoint1;

function showProducts(sheet, select, container){
//const select1 = `select A, C, F, I where I is not null and F != 'No disponible'`
const output = document.querySelector(container);
const query = encodeURIComponent(select);
const query3 = `sheet=${sheet}`;
var endpoint = `${url}${ssid}${query1}&${query2}&${query3}&tq=${query}`;
console.log(endpoint)
fetch(endpoint)
.then(res => res.text())
.then(data => {
    const temp = data.substring(47).slice(0, -2); 
    const json = JSON.parse(temp);
    const products = []
    var listProducts = []
    json.table.rows.forEach((row) => {
              products.push(row.c)
    });
    console.log(products.length)
    console.log(products[0].length)
    for (let i = 0; i < products.length; i++) {
        let product = {}
        product.name = products[i][0]
        product.precio = products[i][1]
        product.information = products[i][2]
        product.link = products[i][3]
        listProducts.push(product)   
    }
    console.log(listProducts)
    listProducts.forEach((prod)=>{
        const url = prod.link.v;
        let formatPrice = new Intl.NumberFormat('es-AR', {style:'currency', currency: 'ARS'});
        let precio = ((prod.precio.v * 30)/100) + prod.precio.v
        formatPrice.format(precio)
        var id = url.toString().replace('https://drive.google.com/file/d/', '').replace('/view?usp=sharing', '')
        //create div that show images
        output.insertAdjacentHTML('beforeend', 
        `<div class="col">
         <div class="card m-2">
         <img height="300" src="https://drive.google.com/thumbnail?id=${id}" class="card-img-top" alt="...">
         <div class="card-body text-center">
          <p class="fw-bold fs-4">${prod.information.v}</p>
          <p class="card-text">${prod.name.v}</p>
          <span class="badge text-bg-info" style="font-size:large">$ ${precio}</span>
        </div>
        </div></div>`)
           
    })
});
}


function makeCell(parent, html, classAdd, tagName){
 const ele = document.createElement(tagName);
 parent.append(ele); //create element to the parent
 ele.innerHTML = html;
 ele.classList.add(classAdd);
 return ele;

}