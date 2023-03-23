//Récupère les données d'un photographe avec l'id de l'url
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

// Filtre dans les médias avec l'id de l'url
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

// Affiche les informations du photographe
function displayPhotographer(photographer) {
    const photographerHeader = document.querySelector('.photograph-header');

    const photographerModel = photographerFactory(photographer);
    const photographHeaderDOM = photographerModel.getPhotographHeaderDOM();
    photographerHeader.appendChild(photographHeaderDOM);
}

// Affiche les médias du photographe
function displayMedia(medias) {
    const mediaElement = document.getElementById('main');
    const card = document.createElement('div');

    card.setAttribute('id', 'card');
    mediaElement.appendChild(card);

    medias.forEach((media) => {
        const mediaModel = mediaFactory(media, updateTotalLikes);
        const mediaCardDOM = mediaModel.getMediaCardDOM();

        card.appendChild(mediaCardDOM);
    });
}

// Gère l'affichage du total de likes
function displayTotalLikes(medias) {
    const stickyEl = document.querySelector('.sticky-text');
    const totalLikesEl = document.createElement('p');
    const heartEl = document.createElement('i');

    heartEl.setAttribute('class', 'fa-solid fa-heart');
    totalLikesEl.setAttribute('class', 'total-likes')

    stickyEl.appendChild(totalLikesEl);
    stickyEl.appendChild(heartEl);

    // Récupère le total de tous les likes du tableau medias 
    const totalLikes = medias.reduce((total, media) => {
        return total + media.likes;
    }, 0);

    totalLikesEl.textContent = totalLikes;
}

// Met à jour le total de like 
function updateTotalLikes(change) {
    const totalLikesElement = document.querySelector('.total-likes');
    const currentTotalLikes = parseInt(totalLikesElement.textContent, 10); // transforme le total d'une string à un interger
    totalLikesElement.textContent = currentTotalLikes + change;
}

// Récupère et initialise les données
async function init() {
    const urlSearchParams = new URL(document.location).searchParams;
    const urlId = urlSearchParams.get('');

    const photographer = await getPhotographer(urlId);
    const media = await getMedia(urlId);

    displayPhotographer(photographer);
    displayMedia(media);
    displayTotalLikes(media)
    lightbox(media)
}

init();
