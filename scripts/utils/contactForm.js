//
// Gère le formulaire
//
// DOM
const header = document.getElementById('header');
const mainWrapper = document.getElementById('main');
const modal = document.querySelector('.modal');
const firstNameEl = document.getElementById('firstName');
const contactModal = document.getElementById('contact_modal');
const form = document.querySelector('form');

// FUNCTION
// Gère l'affichage de la modal
function displayModal() {
    mainWrapper.setAttribute('aria-hidden', true);
    header.setAttribute('aria-hidden', true);
    contactModal.setAttribute('aria-hidden', false);
    contactModal.style.display = 'block';
    firstNameEl.focus(); //définie le focus sur le bouton de
}

// Gère la fermeture de la modal
function closeModal() {
    const contactBtn = document.querySelector('.contact_button')

    mainWrapper.setAttribute('aria-hidden', false);
    header.setAttribute('aria-hidden', false);
    contactModal.setAttribute('aria-hidden', true);
    contactModal.style.display = 'none';
    contactBtn.focus();
}

// Gère l'interation clavier
modal.addEventListener('keydown', (event) => {
    // Vérifie que l'event est bien sur le bouton "Escape" (Esc key)
    if (event.key === 'Escape') {
        closeModal();
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll(
        `input[type='text'], input[type='email'], textarea`
    );

    const values = {};

    inputs.forEach((input) => {
        values[input.id] = input.value;
    });

    console.log(values);
});


