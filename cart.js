// JS du fichier cart.htm
const user = 'Adrien';

// Fonction qui fetch la liste des billets de l'utilisateur au chargement de la page et qui ajoute un event listener à chaque billet
function listTrip() {
    fetch('http://localhost:3000/users/cart/'+user)
    .then((response) => response.json())
    .then((data) => {
        let sum = 0;
        let trip = '';
        if (data.result) {
            for(let obj of data.tickets) {
                const { departure, arrival, price } = obj.trip;

                const id = obj._id;
                const date = new Date(obj.trip.date);
                const year = date.getFullYear();
                const month = date.getMonth().toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const dateScreen = `${year}-${month}-${day} ${hours}:${minutes}`;
                trip += `<div class="trip"><span>${departure} > ${arrival}</span><span>${dateScreen}</span><span>${price}€</span><button id="id-${id}" class='delete-trip'>X</button></div>`;
                sum += price;
            }
        }
        else {
            trip = 'Your cart is empty';
            document.querySelector('#purchase').style.visibility = 'hidden';
        }
        document.querySelector('#cart').innerHTML = trip;
        document.querySelector('#sum').innerHTML = sum;
    })
    .then( () => {
        document.querySelectorAll('.delete-trip').forEach(element => {
            const trip = element.id.substring(3);
            document.querySelector('#'+element.id).addEventListener("click", () => {
                fetch('http://localhost:3000/users/delete/'+trip, {
                    method: "DELETE",
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.result) {
                        listTrip();
                    }
                    else console.log(data);
                });
            });
        });
    });
}

// Appel de la fonction au chargement de la page
listTrip();


document.querySelector('#purchase').addEventListener('click', () => {
    fetch('http://localhost:3000/users/buy/'+user, {
        method: "PUT",
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.result) {
            window.location.href = "./bookings.htm";
        }
        else console.log(data);
    });
});