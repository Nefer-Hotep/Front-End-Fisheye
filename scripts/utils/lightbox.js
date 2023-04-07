// Renvoi la la gestion de la lightbox
//
function lightbox() {
  //
  // DOM
  //
  const header = document.getElementById('header')
  const mainWrapper = document.getElementById('main')
  const lightboxLinks = document.querySelectorAll(
    "a[href$='.jpg'], a[href$='.png'], a[href$='.mp4']"
  )
  const card = document.getElementById('card')

  const lightboxDom = document.createElement('div')
  lightboxDom.classList.add('lightbox')

  //
  // FUNCTION
  //

  function removeListeners() {
    lightboxDom.removeEventListener('keydown', handleKeydown)
  }

  // Gère la logique des interactions clavier
  function handleKeydown(e) {
    if (e.key === 'Escape') {
      closeLightbox()
      e.preventDefault()
    } else if (e.key === 'ArrowRight') {
      changeMedia(getCurrentMediaUrl(), 1)
      e.preventDefault()
    } else if (e.key === 'ArrowLeft') {
      changeMedia(getCurrentMediaUrl(), -1)
      e.preventDefault()
    }
  }

  // Change de média selon la direction donnée (1 || -1)
  function changeMedia(currentMediaUrl, direction) {
    const currentLink = Array.from(lightboxLinks).findIndex(
      (link) => link.href === currentMediaUrl
    )
    const newLink =
      lightboxLinks[
        (currentLink + direction + lightboxLinks.length) % lightboxLinks.length
      ]
    const newMediaUrl = newLink.href
    const newMediaAlt = newLink.getAttribute('aria-label')
    const newMediaTitle = newLink.getAttribute('data-title')

    createLightbox(newMediaUrl, newMediaAlt, newMediaTitle)
  }

  // Créer une lightbox selon le média reçu en paramètre
  function createLightbox(mediaUrl, mediaAlt, mediaTitle) {
    mainWrapper.setAttribute('aria-hidden', true)
    header.setAttribute('aria-hidden', true)

    // Vérifie le type de média et renvoi un element
    const mediaElement = mediaUrl.endsWith('.mp4')
      ? `<video controls autoplay muted><source src="${mediaUrl}" type="video/mp4"></video>`
      : `<img src="${mediaUrl}" alt="${mediaAlt}">`

    lightboxDom.innerHTML = `
        <button class="lightbox-close" aria-label="Close dialog"></button>
        <button class="lightbox-next" aria-label="Next image"></button>
        <button class="lightbox-prev" aria-label="Previous image"></button>
        <div class="lightbox-container">
            ${mediaElement}
            <p>${mediaTitle}</p>
        </div>
        `

    // Ecoute le bouton NEXT
    lightboxDom.querySelector('.lightbox-next').addEventListener(
      'click',
      // Récupère le currentMédiaUrl et la direction
      () => changeMedia(getCurrentMediaUrl(), 1)
    )
    
    // Ecoute le bouton PREV
    lightboxDom.querySelector('.lightbox-prev').addEventListener(
      'click',
      // Récupère le currentMédiaUrl et la direction
      () => changeMedia(getCurrentMediaUrl(), -1)
    )

    // Ecoute le bouton CLOSE
    lightboxDom
      .querySelector('.lightbox-close')
      .addEventListener('click', closeLightbox)
    card.appendChild(lightboxDom)

    // Place le focus sur le bouton next
    const lightboxClose = document.querySelector('.lightbox-next')
    lightboxClose.focus()

    // Ajout d'un listener sur les touches du clavier
    lightboxDom.addEventListener('keydown', handleKeydown)
  }

  function closeLightbox() {
    lightboxDom.remove()
    mainWrapper.setAttribute('aria-hidden', false)
    header.setAttribute('aria-hidden', false)
    removeListeners()
  }

  // Récupère le média a l'intéraction de la lightbox
  function getCurrentMediaUrl() {
    const currentMediaElement = lightboxDom.querySelector('img, video')

    // Renvoi la source selon le média img OU vidéo
    return (
      currentMediaElement.src || currentMediaElement.querySelector('source').src
    )
  }

  // Gère les interactions des ancres
  lightboxLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      createLightbox(
        link.getAttribute('href'),
        link.getAttribute('aria-label'),
        link.getAttribute('data-title')
      )
    })
  })
}
