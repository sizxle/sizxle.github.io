window.onload = () => {
    let testEntityAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", e => {
        if(!testEntityAdded) {
            alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
            // Add a box to the north of the initial GPS position
            const entity = document.createElement("a-box");
            entity.setAttribute("scale", {
                x: 20, 
                y: 20,
                z: 20
            });
            entity.setAttribute('material', { color: 'red' } );
            entity.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude + 0.001,
                longitude: e.detail.position.longitude
            });
            document.querySelector("a-scene").appendChild(entity);
        }
        testEntityAdded = true;
    });
};

// window.onload = () => {
//     let downloaded = false;

//     const el = document.querySelector("[gps-new-camera]");

//     el.addEventListener("gps-camera-update-position", async(e) => {
//         if(!downloaded) {
//             alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
//             const west = e.detail.position.longitude - 0.01,
//                   east = e.detail.position.longitude + 0.01,
//                   south = e.detail.position.latitude - 0.01,
//                   north = e.detail.position.latitude + 0.01;
//             const response = await fetch(`https://hikar.org/webapp/map?bbox=${west},${south},${east},${north}&layers=poi&outProj=4326`);
//             const pois = await response.json();
//             pois.features.forEach ( feature => {
//                 const entity = document.createElement("a-box");
//                 entity.setAttribute("scale", {
//                     x: 20, 
//                     y: 20,
//                     z: 20
//                 });
//                 entity.setAttribute('material', { color: 'red' } );
//                 entity.setAttribute('gps-new-entity-place', {
//                     latitude: feature.geometry.coordinates[1],
//                     longitude: feature.geometry.coordinates[0]
//                 }); 
//                 document.querySelector("a-scene").appendChild(entity);
//             });
//         }
//         downloaded = true;
//     });
// };