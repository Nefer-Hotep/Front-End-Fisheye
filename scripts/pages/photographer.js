// Récupère les données d'un photographe avec l'id de l'url
async function getPhotographer(urlId) {
  return fetch('data/photographers.json')
    .then((res) => res.json())
    .then((data) => {
      const photographer = data.photographers.find((obj) => obj.id == urlId)

      return photographer
    })
    .catch((err) => console.log('an error occurs' + err))
}

// Filtre dans les médias avec l'id de l'url
async function getMedia(urlId) {
  return fetch('data/photographers.json')
    .then((res) => res.json())
    .then((data) => {
      const media = data.media.filter((obj) => obj.photographerId == urlId)
      return media
    })
    .catch((err) => console.log('an error occurs' + err))
}

// Affiche les informations du photographe
function displayPhotographer(photographer) {
  const photographerHeader = document.querySelector('.photograph-header')

  const photographerModel = photographerFactory(photographer)
  const photographHeaderDOM = photographerModel.getPhotographHeaderDOM()
  photographerHeader.appendChild(photographHeaderDOM)
}

// Affiche les médias du photographe
function displayMedia(medias) {
  const mediaElement = document.getElementById('main')
  const card = document.createElement('div')

  // Select element DOM
  const selectEl = document.createElement('div')

  selectEl.innerHTML = `
    <label for="sort-menu">Trier par </label>
    <select id="sort-menu">
    <option value="popularity">Popularité</option>
    <option value="date">Date</option>
    <option value="title">Titre</option>
    </select>
    `

  selectEl.setAttribute('class', 'select-elem')
  mediaElement.appendChild(selectEl)

  const sortMenu = document.getElementById('sort-menu')

  function sortMedia() {
    const selectedValue = sortMenu.value

    if (selectedValue === 'popularity') {
      medias.sort((a, b) => b.likes - a.likes)
    } else if (selectedValue === 'date') {
      medias.sort((a, b) => a.date.localeCompare(b.date))
    } else if (selectedValue === 'title') {
      medias.sort((a, b) => a.title.localeCompare(b.title))
    }

    card.innerHTML = ''

    medias.forEach((media) => {
      const mediaModel = mediaFactory(media, updateTotalLikes)
      const mediaCardDOM = mediaModel.getMediaCardDOM()

      card.appendChild(mediaCardDOM)
    })

    lightbox()
  }

  card.setAttribute('id', 'card')
  mediaElement.appendChild(card)

  sortMenu.addEventListener('change', sortMedia)

  sortMedia()
}

// Gère l'affichage du total de likes
function displayTotalLikes(medias) {
  const stickyEl = document.querySelector('.total-likes')
  const totalLikesEl = document.createElement('p')
  const heartEl = document.createElement('i')

  heartEl.setAttribute('class', 'fa-solid fa-heart')
  // totalLikesEl.setAttribute('class', 'total-likes');

  stickyEl.appendChild(totalLikesEl)
  stickyEl.appendChild(heartEl)

  // Récupère le total de tous les likes du tableau medias
  const totalLikes = medias.reduce((total, media) => {
    return total + media.likes
  }, 0)

  totalLikesEl.textContent = totalLikes
}

// Met à jour le total de like
function updateTotalLikes(change) {
  const totalLikesElement = document.querySelector('.total-likes p')
  const currentTotalLikes = parseInt(totalLikesElement.textContent, 10) // transforme le total d'une string en un interger
  totalLikesElement.textContent = currentTotalLikes + change
}

// Récupère et initialise les données
async function init() {
  const urlSearchParams = new URL(document.location).searchParams
  const urlId = urlSearchParams.get('')

  const photographer = await getPhotographer(urlId)
  const media = await getMedia(urlId)

  displayPhotographer(photographer)
  displayMedia(media)
  displayTotalLikes(media)
}

init()
