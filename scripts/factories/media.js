function mediaFactory(mediaData, updateTotalLikes) {
    const { id, title, image, video, date, likes, price, photographerId } =
        mediaData;

    const mediaPic = `/assets/media/${photographerId}/${image}`;
    const mediaVid = `/assets/media/${photographerId}/${video}`;

    let currentLikes = likes;
    let isLiked = false;

    function listenForLikes(event) {
        event.preventDefault();

        isLiked = !isLiked; // Inverse le statut booléen de isLiked true/false
        currentLikes = isLiked ? currentLikes + 1 : currentLikes - 1; // Si isLiked est true ajoute +1 sinon -1 aux likes

        const likeBtn = event.currentTarget;
        const mediaLikes = likeBtn.parentElement;
        const likeCountElement = mediaLikes.querySelector('p');
        likeCountElement.textContent = currentLikes;

        const heartIcon = likeBtn.querySelector('i');
        heartIcon.classList.toggle('fa-regular');
        heartIcon.classList.toggle('fa-solid');

        updateTotalLikes(isLiked ? 1 : -1)


        return currentLikes;
    }

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
                        <p>${currentLikes}</p>
                        <button class='like-btn'>
                            <i class="unchecked fa-regular fa-heart fa-lg"></i>
                        </button>
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
                        <p>${currentLikes}</p>
                        <button class='like-btn'>
                            <i class="unchecked fa-regular fa-heart fa-lg"></i>
                        </button>
                    </div>
                </div>
            `;
        }

        const likeBtn = mediaCard.querySelector('.like-btn');
        likeBtn.addEventListener('click', listenForLikes);

        return mediaCard;
    }

    return { getMediaCardDOM, currentLikes };
}
