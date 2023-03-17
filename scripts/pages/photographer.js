//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographer(urlId) {
    return fetch('data/photographers.json')
        .then((res) => res.json())
        .then((data) => {
            const photographer = data.photographers.find(
                (obj) => obj.id == urlId
            );

            return photographer;
        })
        .catch((err) => console.log('an error occurs' + err));
}

async function getMedia(urlId) {
    return fetch('data/photographers.json')
        .then((res) => res.json())
        .then((data) => {
            const media = data.media.filter(
                (obj) => obj.photographerId == urlId
            );
            return media;
        })
        .catch((err) => console.log('an error occurs' + err));
}

async function displayPhotographer(photographer) {
    const photographerHeader = document.querySelector('.photograph-header');

    const photographerModel = photographerFactory(photographer);
    const photographHeaderDOM = photographerModel.getPhotographHeaderDOM();
    photographerHeader.appendChild(photographHeaderDOM);
}

async function displayMedia(medias) {
    
    const mediaElement = document.getElementById('main');
    const card = document.createElement('div')

    card.setAttribute('id', 'card')
    mediaElement.appendChild(card)

    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM()
        
        card.appendChild(mediaCardDOM)
    })

    const stickyElement = document.querySelector('.sticky-bar')
    const totalLikesElement = document.createElement('p')
    stickyElement.appendChild(totalLikesElement)


    const reducer = (accumulator, curr) => accumulator + curr;
    // totalLikesElement.textContent = medias.likes.reduce(reducer)
}

async function init() {
    const urlSearchParams = new URL(document.location).searchParams;
    const urlId = urlSearchParams.get('');

    const photographer = await getPhotographer(urlId);
    const media = await getMedia(urlId);

    displayPhotographer(photographer);
    displayMedia(media);
}

init();
