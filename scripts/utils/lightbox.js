function lightbox() {
    const lightboxLinks = document.querySelectorAll(
        "a[href$='.jpg'], a[href$='.mp4']"
    );
    const card = document.getElementById('card');
    const lightboxDom = document.createElement('div');

    function closeLightbox() {
        lightboxDom.remove();
    }

    function openLightbox(imageUrl, imageAlt) {
        lightboxDom.classList.add('lightbox');

        lightboxDom.innerHTML = `
            <button class="lightbox-close">Fermer</button>
            <button class="lightbox-next">Suivant</button>
            <button class="lightbox-prev">Précédent</button>
            <div class="lightbox-container">
                <img src="${imageUrl}" alt="${imageAlt}">
            </div>
        `;

        lightboxDom
            .querySelector('.lightbox-close')
            .addEventListener('click', closeLightbox);
        card.appendChild(lightboxDom);

        // Ferme la lightbox quand on appuie sur "Escape"
        document.addEventListener('keydown', (event) => {
            // Vérifie que l'event est bien sur le bouton "Escape" (Esc key)
            if (event.key === 'Escape') {
                closeLightbox();
            }
        });

        return lightboxDom;
    }

    // Attach event listeners to links and close button
    lightboxLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const imageUrl = link.getAttribute('href');
            const imageAlt = link.getAttribute('aria-label');

            openLightbox(imageUrl, imageAlt);
        });
    });
}
