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

    // Change de média selon la direction donnée (1 || -1)
    function changeMedia(mediaUrl, direction) {
        const currentLink = Array.from(lightboxLinks).findIndex(
            (link) => link.href === mediaUrl
        );
        const newLink =
            lightboxLinks[
                (currentLink + direction + lightboxLinks.length) %
                    lightboxLinks.length
            ];
        const newMediaUrl = newLink.href;
        const newMediaAlt = newLink.getAttribute('aria-label');
        createLightbox(newMediaUrl, newMediaAlt);
    }

    function createLightbox(mediaUrl, mediaAlt) {
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
            .addEventListener('click', () =>
                changeMedia(getCurrentMediaUrl(), 1)
            );
        lightboxDom
            .querySelector('.lightbox-prev')
            .addEventListener('click', () =>
                changeMedia(getCurrentMediaUrl(), -1)
            );
        lightboxDom
            .querySelector('.lightbox-close')
            .addEventListener('click', closeLightbox);
        card.appendChild(lightboxDom);
    }

    function getCurrentMediaUrl() {
        const currentMediaElement = lightboxDom.querySelector('img, video');
        return (
            currentMediaElement.src ||
            currentMediaElement.querySelector('source').src
        );
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            changeMedia(getCurrentMediaUrl(), 1);
        } else if (e.key === 'ArrowLeft') {
            changeMedia(getCurrentMediaUrl(), -1);
        }
    });

    lightboxLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            createLightbox(
                link.getAttribute('href'),
                link.getAttribute('aria-label')
            );
        });
    });
}
