document.querySelector("#search").addEventListener("click", function () {
  //console.log('click detected');
  const departure = "Paris";
  const arrival = "Lyon";
  const dateTrip = "2023-06-27T08:29:58.651+00:00";
  fetch(`http://localhost:3000/trips/${departure}/${arrival}/${dateTrip}`)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data)
      document.querySelector("#trips-container").innerHTML = "";
      for (let obj of data.trips) {
        //console.log(obj);
        const date = new Date(obj.date);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const trip = `<div class='trip'><span>${obj.departure} > ${obj.arrival}</span><span>${hours}:${minutes}</span><span>${obj.price}€</span><button id='${obj._id}' class='add-trip'>Book</button></div>`;
        document.querySelector("#trips-container").innerHTML += trip;
      }
    });
});

// document.querySelectorAll(`.add-trip`).addEventListener("click", function (addCart) {
//     console.log("fghb");
//     const tripId = document.querySelector(`.add-trip`).value;
//     console.log(tripId)
//     fetch(`http://localhost:3000/trips/${departure}/${arrival}/${dateTrip}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ trip: tripId, user: "adrien" }),
//     }).then((window.location.href = "./cart.htm"));
//   });