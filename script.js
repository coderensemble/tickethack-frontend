// JS du fichier index.html
const user = 'Adrien';

document.querySelector("#search").addEventListener("click", function () {
    const departure = document.querySelector("#departure").value;
    const arrival = document.querySelector("#arrival").value;
    const dateTrip = document.querySelector("#date").value;
    fetch(`http://localhost:3000/trips/${departure}/${arrival}/${dateTrip}`)
    .then((response) => response.json())
    .then((data) => {
        let trips = '';
        if (data.result) {
            for (let obj of data.trips) {
                const date = new Date(obj.date);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const dateScreen = `${hours}:${minutes}`;
                trips += `<div class='trip'><span>${obj.departure} > ${obj.arrival}</span><span>${dateScreen}</span><span>${obj.price}€</span><button id='id-${obj._id}' class='add-trip'>Book</button></div>`;
            }
        }
        else trips = 'No trip'
        document.querySelector("#trips-container").innerHTML = trips;
    })
    .then( () => {
        document.querySelectorAll('.add-trip').forEach(element => {
            const trip = element.id.substring(3);
            document.querySelector('#'+element.id).addEventListener("click", () => {
                fetch('http://localhost:3000/trips/', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ trip, user }),
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.result) {
                        window.location.href = "./cart.htm";
                    }
                    else console.log(data);
                });
            });
        });
    });
});
