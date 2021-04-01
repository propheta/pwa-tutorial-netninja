db.collection('cars').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        if(change.type === 'added'){
            renderCar(change.doc.data(), change.doc.id)
        }
        if(change.type === 'removed'){
            
        }
    });
})