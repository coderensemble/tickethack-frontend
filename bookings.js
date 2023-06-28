//document.querySelector("#bookings").remove();
fetch(`http://localhost:3000/users/bookings/Adriena`)
  .then((response) => response.json())
  .then((data) => {
    //console.log(data)
    if (data.result) {
      for (let obj of data.tickets) {
        //console.log(obj.trip);
        const date = new Date(obj.trip.date);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        document.querySelector("#bookings").innerHTML = `${obj.trip.departure} > ${obj.trip.arrival}${hours}:${minutes}${obj.trip.price}€`
      }
    } else {
      document.querySelector("#bookings").innerHTML = `<div class='noTickets'>No tickets in your cart.</div>`;
    }
  });
// if (data.users) {
//     for (let i = 0; i < data.weather.length; i++) {
//         document.querySelector('#cityList').innerHTML += `
//         <div class="cityContainer">
//         <p class="name">${data.weather[i].cityName}</p>
//         <p class="description">${data.weather[i].description}</p>
//         <img class="weatherIcon" src="images/${data.weather[i].main}.png"/>
//         <div class="temperature">
//             <p class="tempMin">${data.weather[i].tempMin}°C</p>
//             <span>-</span>
//             <p class="tempMax">${data.weather[i].tempMax}°C</p>
//         </div>
//         <button class="deleteCity" id="${data.weather[i].cityName}">Delete</button>
//     </div>
//     `;
//     }
// updateDeleteCityEventListener();
