function lightbox() {
    const header = document.getElementById('header');
    const mainWrapper = document.getElementById('main');
    const lightboxLinks = document.querySelectorAll(
        "a[href$='.jpg'], a[href$='.png'], a[href$='.mp4']"
    );
    const card = document.getElementById('card');
    const lightboxDom = document.createElement('div');
    lightboxDom.classList.add('lightbox');

    function closeLightbox() {
        lightboxDom.remove();
    }

    function nextMedia(indexMedia) {
        const currentLink = Array.from(lightboxLinks).findIndex(
            (index) => index === indexMedia
        );
        // console.log('index', index);
        console.log('currentLink', currentLink);

        const nextLink =
            lightboxLinks[(currentLink + 1) % lightboxLinks.length];
        const nextMediaUrl = nextLink.href;
        const nextMediaAlt = nextLink.getAttribute('aria-label');
        createLightbox(nextMediaUrl, nextMediaAlt);
    }

    function prevMedia(mediaUrl) {
        const currentLink = Array.from(lightboxLinks).findIndex(
            (link) => link.href === mediaUrl
        );
        const prevLink =
            lightboxLinks[
                (currentLink - 1 + lightboxLinks.length) % lightboxLinks.length
            ];
        const prevMediaUrl = prevLink.href;
        const prevMediaAlt = prevLink.getAttribute('aria-label');
        createLightbox(prevMediaUrl, prevMediaAlt);
    }

    function createLightbox(mediaUrl, mediaAlt, index) {
        mainWrapper.setAttribute('aria-hidden', true);
        header.setAttribute('aria-hidden', true);

        const mediaElement = mediaUrl.endsWith('.mp4')
            ? `<video controls><source src="${mediaUrl}" type="video/mp4"></video>`
            : `<img src="${mediaUrl}" alt="${mediaAlt}">`;

        lightboxDom.innerHTML = `
        <button class="lightbox-close">Fermer</button>
        <button class="lightbox-next">Suivant</button>
        <button class="lightbox-prev">Précédent</button>
        <div class="lightbox-container">
            ${mediaElement}
        </div>
        `;

        lightboxDom
            .querySelector('.lightbox-next')
            .addEventListener('click', () => {
                nextMedia(index);
            });

        lightboxDom
            .querySelector('.lightbox-prev')
            .addEventListener('click', () => {
                prevMedia(index);
            });

        lightboxDom
            .querySelector('.lightbox-close')
            .addEventListener('click', () => {
                closeLightbox();
            });

        card.appendChild(lightboxDom);

        return lightboxDom;
    }

    // Ferme la lightbox quand on appuie sur "Escape"
    document.addEventListener('keydown', (e) => {
        // Vérifie que l'event est bien sur le bouton "Escape" (Esc key)
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // Attach event listeners to links and close button
    lightboxLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const mediaUrl = link.getAttribute('href');
            const mediaAlt = link.getAttribute('aria-label');
            const mediaTitle = link.getAttribute('alt');

            createLightbox(mediaUrl, mediaAlt, index);
        });
    });
}
