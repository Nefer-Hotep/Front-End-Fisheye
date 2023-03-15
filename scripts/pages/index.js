async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    return fetch('data/photographers.json')
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.photographers);
            return data;
        })
        .catch((err) => console.log('an error occurs' + err));
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(
        '.photographer_section'
    );

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
