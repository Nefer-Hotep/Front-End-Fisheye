//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographer(urlId) {
    return fetch('data/photographers.json')
        .then((res) => res.json())
        .then((data) => {
            const photographer = data.photographers.find(obj => obj.id == urlId);

            return photographer;
        })
        .catch((err) => console.log('an error occurs' + err));
}


async function displayPhotographer(photographer) {
    const photographerHeader = document.querySelector(".photograph-header")
    
    const photographerModel = photographerFactory(photographer);
    const photographHeaderDOM =
        photographerModel.getPhotographHeaderDOM();
    photographerHeader.appendChild(photographHeaderDOM)
}

async function init() {
    const urlSearchParams = new URL(document.location).searchParams;
    const urlId = urlSearchParams.get('');

    const  photographer = await getPhotographer(urlId);
    displayPhotographer(photographer)
}

init();
