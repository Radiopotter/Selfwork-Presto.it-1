let annunci = [];


let cardWrapper = document.querySelector("#card-wrapper");

let searchInput = document.querySelector("#searchInput");

let categoryFilter = document.querySelector("#categoryFilter");




fetch("./annunci.json")


.then(response => response.json())


.then(data => {


    annunci = data;


    creaCategorie();


    mostraAnnunci(annunci);


})

.catch(error => {

console.log(error);

});







function creaCategorie(){


let categorie = [];



annunci.forEach(annuncio => {


if(!categorie.includes(annuncio.category)){


categorie.push(annuncio.category);


}


});





categorie.forEach(categoria => {


let option = document.createElement("option");


option.value = categoria;


option.innerHTML = categoria;


categoryFilter.appendChild(option);



});


}









function mostraAnnunci(lista){


cardWrapper.innerHTML = "";



lista.forEach(annuncio => {



let card = document.createElement("div");


card.classList.add(
"col-12",
"col-md-4"
);



card.innerHTML = `


<div class="card h-100">


<div class="card-body bg-black">


<h5 class="text-yellow">

${annuncio.name}

</h5>



<p class="text-white">

${annuncio.category}

</p>



<p class="text-red fw-bold">

${annuncio.price} €

</p>


</div>


</div>


`;



cardWrapper.appendChild(card);



});



}









function filtra(){



let testo = searchInput.value.toLowerCase();



let categoria = categoryFilter.value;




let risultati = annunci.filter(annuncio => {



let nome = annuncio.name
.toLowerCase()
.includes(testo);



let cat = categoria === "all" ||
annuncio.category === categoria;



return nome && cat;



});



mostraAnnunci(risultati);



}







searchInput.addEventListener(
"input",
filtra
);



categoryFilter.addEventListener(
"change",
filtra
);