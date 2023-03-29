function photographerFactory(data) {
    const { name, portrait, city, id, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // elements
        const article = document.createElement('article');
        const linkElem = document.createElement('a');
        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        const textCard = document.createElement('div');
        const locationElem = document.createElement('p');
        const taglineElem = document.createElement('p');
        const priceElem = document.createElement('p');

        // attributes
        img.setAttribute('src', picture);
        img.setAttribute('alt', '');
        linkElem.setAttribute('href', `/photographer.html?=${id}`);
        linkElem.setAttribute('data-id', id);
        textCard.setAttribute('class', 'card-text');
        locationElem.setAttribute('class', 'card-location');
        taglineElem.setAttribute('class', 'card-tagline');
        priceElem.setAttribute('class', 'card-price');

        // content
        h2.textContent = name;
        locationElem.textContent = city + ', ' + country;
        taglineElem.textContent = tagline;
        priceElem.textContent = price + '€/par jour';

        // node
        article.appendChild(linkElem);
        linkElem.appendChild(img);
        linkElem.appendChild(h2);
        article.appendChild(textCard);
        textCard.appendChild(locationElem);
        textCard.appendChild(taglineElem);
        textCard.appendChild(priceElem);

        return article;
    }

    function getPhotographHeaderDOM() {
        const article = document.createElement('article');

        article.innerHTML = `
            <div class='photograph-text'>
                <h1 class='photograph-name'>${name}</h1>
                <p class='photograph-location'>${city + ', ' + country}</p>
                <p class='photograph-tagline'>${tagline}</p>
            </div>
            <button class="contact_button" onclick="displayModal()" aria-label="contact me">Contactez-moi</button>
            <img src='${picture}' alt='${name}'>
            <div class='sticky-bar'>
                <div class='sticky-text'>
                    <div class='total-likes'></div>
                    <p>${price}€ / jour</p>
                </div>
            </div>
        `;

        return article;
    }

    return { name, picture, getUserCardDOM, getPhotographHeaderDOM };
}
