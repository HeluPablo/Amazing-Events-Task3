let $check_conteiner = document.getElementById("check-conteiner");
let $button = document.getElementById("button-sub");
let $bar = document.getElementById("input-bar")
let $cards = document.getElementById("cards")

async function datosExternos() {
    try {
        let data = await fetch('https://mh-amazing.herokuapp.com/amazing')
      evento = await data.json()
      evento = evento.events
      /* CHECKBOX*/
      crearCheckbox(evento, $check_conteiner)
      printCards(evento, $cards)
      $bar.addEventListener('keyup', filtrar)
      $check_conteiner.addEventListener('change', filtrar)
    } catch (err) {
        console.log("no se puede mostrar el contenido debido a un error")
    }
}
datosExternos()

function crearCheckbox(array, contenedor) {
    let funcionCategorias = array => array.category
    let categorias = new Set(array.filter(funcionCategorias).map(funcionCategorias))
    categorias.forEach(categoria => {
        contenedor.innerHTML +=
        `
 <label> ${categoria}</label>
            <div class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                value="${categoria}"
                id="defaultCheck1"
            />
        </div> 
`
    })
}
function print(array) {
    let card = document.createElement("div")//crea un div
    card.className = "card"//le da una clase al div 
    card.innerHTML = `
    <div class=" card p-1" style="width: 25rem; ">
    <img src="${array.image}" class="card-img-top" alt="imagen1">
    <div class="card-body">
        <h5 class="card-title">${array.name}</h5>
        <p class="card-text">${array.description}</p>    
        <div class="d-flex justify-content-between">
            <h6>Price: ${array.price}</h6>
            <a href="../details.html?id=${array._id}" class="btn btn-primary" >Details</a>

        </div>
    </div>
</div>
`
    return card
}

function filtrar() {
    let checked = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(ele => ele.value)
    let filtrarCategory = evento.filter(e => checked.includes(e.category) || checked.length === 0)
    let filtrarSearch = filtrarCategory.filter(e => e.name.toLowerCase().includes($bar.value.toLowerCase()))
    printCards(filtrarSearch, $cards)
}
function printCards(array, contenedor) {
    contenedor.innerHTML = ''
    if (array.length > 0) {
        let fragment = document.createDocumentFragment()
        array.forEach(array => fragment.appendChild(print(array)))
        contenedor.appendChild(fragment)
    } else {
        contenedor.innerHTML = '<h2 class="altura"> No existen eventos que coincidan con su busqueda </h2>'
    }
}