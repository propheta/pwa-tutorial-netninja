db.enablePersistence().catch(error => {
        if(error.code == 'failed-precondition'){
            console.log('Persistance failed');
        } else if(error.code =='unimplemented'){
            console.log('Perisistance is not available')
        }
    })

db.collection('cars').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        if(change.type === 'added'){
            renderCar(change.doc.data(), change.doc.id);
        }
        if(change.type === 'removed'){
            removeCar(change.doc.id);
        }
    });
})

//add new car
const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();

    const car = {
        vin: form.vin.value,
        deck: form.deck.value,
        hold: form.hold.value
    };

    db.collection('cars').add(car).catch(error => {
        console.log(error);
    })

    form.vin.value = '';
    form.deck.value = '';
    form.hold.value = '';

})

//delete car
const carContainer = document.querySelector('.cars');
carContainer.addEventListener('click', event => {
    if(event.target.tagName === 'I'){
        const id = event.target.getAttribute('data-id');
        db.collection('cars').doc(id).delete();
    }
})