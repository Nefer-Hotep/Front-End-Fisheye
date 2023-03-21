function mediaFactory(mediaData) {
    const { id, title, image, video, date, likes, price, photographerId } =
        mediaData;

    const mediaPic = `/assets/media/${photographerId}/${image}`;
    const mediaVid = `/assets/media/${photographerId}/${video}`;

    function getMediaCardDOM() {
        const mediaCard = document.createElement('div');
        mediaCard.setAttribute('class', 'card-body');

        if (image) {
            mediaCard.innerHTML = `
                <a href='${mediaPic}' class='lightbox-link' aria-label='${title}, closeup view'>
                    <img src='${mediaPic}' alt='${title}'>
                </a>
                <div class='media-text'>
                    <p>${title}</p>
                    <div class='media-likes'>
                        <p>${likes}</p>
                        <i class="fa-solid fa-heart"></i>
                    </div>
                </div>
            `;
        } else {
            mediaCard.innerHTML = `
                <a href='${mediaVid}' class='lightbox-link' aria-label='${title}, closeup view'>
                    <video src='${mediaVid}' title='${title}'></video>
                </a>    
                <div class='media-text'>
                    <p>${title}</p>
                    <div class='media-likes'>
                        <p>${likes}</p>
                        <i class="fa-solid fa-heart"></i>
                    </div>
                </div>
            `;
        }

        return mediaCard;
    }
    
    return { getMediaCardDOM };
}
