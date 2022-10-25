let contenedorDetails = document.getElementById("details_js")

let eventsData = amazingEvents.events
let id = location.search.slice(4)
let eventDetails = eventsData.filter(event => id == event._id)
eventDetails = eventDetails[0]

createCardDetail(eventDetails)

function createCardDetail(event){
    contenedorDetails.innerHTML = `
    <div class="card d-flex flex-column justify-content-center align-items-center card-details">
<img src="${event.image}" class="card-img-top" alt="...">
<div class="card-body">
    <h5 class="card-title">${event.name}</h5>
    <p class="card-text">${event.description}</p>
    <p class="card-text">Category : ${event.category}</p>
    <p class="card-text">Place : ${event.place}</p>
    <p class="card-text">Capacity : ${event.capacity}</p>
    <p class="card-text">Assistance : ${event.assistance}</p>
    <p class="card-text">Price : $${event.price}</p>
</div>
</div>
    `

}

