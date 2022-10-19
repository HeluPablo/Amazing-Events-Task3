let check_conteiner = document.getElementById("check-conteiner");
let button = document.getElementById("button-sub");
let bar = document.getElementById("input-bar")
let cards = document.getElementById("cards")
let fecha = Date.parse(amazingEvents.currentDate)
let data = amazingEvents.events
let eventos_colection = data

function filtrarEventosFuturo(data, fecha) {
    let filtrado = data.filter(function (item) { return Date.parse(item.date) < fecha })
    return filtrado
}

let arrayFiltrado = filtrarEventosFuturo(data, fecha)



function imprimirEventos(array, contenedor) {
    for (let i = 0; i < array.length; i++)
        cards.innerHTML +=

            `<div class=" card p-1" style="width: 18rem; ">
                   <img src="${array[i].image}" class="card-img-top" alt="imagen1">
                   <div class="card-body">
                       <h5 class="card-title">${array[i].name}</h5>
                       <p class="card-text">${array[i].description}</p>    
                       <div class="d-flex justify-content-between">
                           <h6>Price: ${array[i].price}</h6>
                           <a href="../details.html?id=${array[i]._id}" id="${array[i].value}" class="btn btn-primary">Details</a>
   
                       </div>
                   </div>
               </div>`

}
imprimirEventos(arrayFiltrado, cards)

imprimirCheckbox(data, check_conteiner);/// genera cechbox


function imprimirCheckbox(array, contenedor) {/// Genera los chexbox segun categoria
    categorias = [];
    array.forEach(element => {
        if (!categorias.some(e => e == element.category)) {
            categorias.push(element.category)
        }
    });

    for (let i = 0; i < categorias.length; i++) {

        contenedor.innerHTML += `
        <label> ${categorias[i]}</label>
            <div class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                value="${categorias[i]}"
                id="defaultCheck1"
            />
        </div> 

        `
    }

}


check_conteiner.addEventListener("click", checkSearch);
let check_boxes = document.querySelectorAll('.form-check-input');

function checkSearch() {
    let b_active = [];

    check_boxes.forEach(e => {
        if (e.checked == true) { /// si el checkbox esta seleccionado hace lo siguiente
            b_active.push(e.value); /// agrega un valor seleccionado al contador de "seleccionados"

            if (!eventos_colection.some(element => element.category === e.value)) { /// verifica si  eventos_seleccion tiene o no la categoria seleccionada asi no se agregan duplicados
                cards.innerHTML = ''
                eventos_colection = [...eventos_colection, ...(data.filter(element => element.category === e.value))]; /// ...para que el array no quede dentro de otro array se agregan los nuevos eventos

                console.log("colection")
                console.dir(eventos_colection)
                imprimirEventos(eventos_colection, cards)

                return;
            }
        }
    });
    console.dir(b_active);
    if (b_active.length == 0) {  /// si  no hay eventos seleccionados  se vuelven a imprimir las cartas como en el principio
        imprimirEventos(data, cards)
        return;
    }
    if (b_active.length !== (eventos_colection.length / 2)) { /// si la cantidad de checkbox seleccionados no es igual a la de coleccion de eventos  entonces se eliminan los sobrantes
        cards.innerHTML = ' ' // eventos coleccion esta divido en dos porq cada categoria tiene dos eventos
        b_active.forEach(e => {
            imprimirEventos(eventos_colection.filter(element => element.category === e), cards) /// se reimprimen los eventos
        })

    }
    console.dir(b_active);

}

/// agrega un evento para buscar  buscar al boton de la barra 
bar.addEventListener("keyup", search);

/// funcion que busca lo que se ingreso en el buscador
function search() {
    console.log("yolo")
    console.dir(eventos_colection);
    cards.innerHTML = ''
    imprimirEventos(eventos_colection.filter(e => e.name.toLowerCase().trim().includes(bar.value.toLowerCase())), cards)
}