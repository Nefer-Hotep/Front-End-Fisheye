// 
// Gère le formulaire
// 
// DOM
const header = document.getElementById('header');
const mainWrapper = document.getElementById('main');
const modal = document.querySelector('.modal');
const firstNameEl = document.getElementById('firstName');

// FUNCTION
// Gère l'affichage de la modal
function displayModal() {
    const contactModal = document.getElementById('contact_modal');
    mainWrapper.setAttribute('aria-hidden', true);
    header.setAttribute('aria-hidden', true);
    contactModal.setAttribute('aria-hidden', false);
    contactModal.style.display = 'block';
    firstNameEl.focus(); //définie le focus sur le bouton de
}

// Gère la fermeture de la modal
function closeModal() {
    const modal = document.getElementById('contact_modal');
    mainWrapper.setAttribute('aria-hidden', false);
    header.setAttribute('aria-hidden', false);
    modal.setAttribute('aria-hidden', true);
    modal.style.display = 'none';
}

// Gère l'interation clavier
document.addEventListener('keydown', (event) => {
    // Vérifie que l'event est bien sur le bouton "Escape" (Esc key)
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Valide les données du formulaire
function validate() {
    console.log('validé');
}