
document.querySelector('#search').addEventListener('click',
function(){
    //console.log('click detected');
    const departure = 'Paris'
    const arrival = 'Lyon'
    const dateTrip = '2023-06-27T08:29:58.651+00:00'
    fetch(`http://localhost:3000/trips/${departure}/${arrival}/${dateTrip}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let trips = ''
        for (let obj of data.trips) {
            console.log(obj)
            const date = new Date (obj.date);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            trips += `<div class='trip'>${obj.departure} > ${obj.arrival} ${hours}:${minutes} ${obj.price} <button id=''>Book</button></div>`
        }

        document.querySelector('.second-column').innerHTML = trips
    });
});

