// Dom variables
const header = document.getElementById('header');
const mainWrapper = document.getElementById('main');
const modal = document.querySelector('.modal');
const firstNameEl = document.getElementById('firstName');

function displayModal() {
    const contactModal = document.getElementById('contact_modal');
    mainWrapper.setAttribute('aria-hidden', true);
    header.setAttribute('aria-hidden', true);
    contactModal.setAttribute('aria-hidden', false);
    contactModal.style.display = 'block';
    firstNameEl.focus(); //set the focus on the close button
}

function closeModal() {
    const modal = document.getElementById('contact_modal');
    mainWrapper.setAttribute('aria-hidden', false);
    header.setAttribute('aria-hidden', false);
    modal.setAttribute('aria-hidden', true);
    modal.style.display = 'none';
}

// Add event listener to the document object
document.addEventListener('keydown', (event) => {
    // Check if the key code is equal to "Escape" (Esc key)
    if (event.key === 'Escape') {
        closeModal();
    }
});
