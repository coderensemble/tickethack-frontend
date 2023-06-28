//document.querySelector("#bookings").remove();
fetch(`http://localhost:3000/users/bookings/Adrien`)
  .then((response) => response.json())
  .then((data) => {
    //console.log(data)
    let ticket = "";
    if (data.result) {
      for (let obj of data.tickets) {
        //console.log(obj.trip);
        const date = new Date(obj.trip.date);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        ticket += `<div class="trip"><span>${obj.trip.departure} &gt; ${obj.trip.arrival}</span><span>${hours}:${minutes}</span><span>${obj.trip.price}€</span><span>departure in 3 hours</span></div>`

      }
    } else ticket = "No tickets in your cart.";

    document.querySelector("#bookings").innerHTML = ticket;
  });

