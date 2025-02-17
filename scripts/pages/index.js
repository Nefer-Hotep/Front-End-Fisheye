//
// Gère la page d'acceuil
//
async function getPhotographers() {
  return fetch('data/photographers.json')
    .then((res) => res.json())
    .then((data) => {
      return data
    })
    .catch((err) => console.log('an error occurs' + err))
}

// Gère l'affichage des photographes
function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
}

init()
