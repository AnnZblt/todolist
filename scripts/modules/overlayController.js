const closeModal = (overlay) => {
  overlay.classList.remove('is-visible');
};

export const getUserName = (overlay, greetingForm) => new Promise((resolve) => {
  greetingForm.addEventListener('submit', event => {
    event.preventDefault();

    if (greetingForm.username.value.trim() === '') {
      const errorMessage = document.querySelector('.error-message');
      errorMessage.classList.add('visible-message');

      greetingForm.reset();
    } else {
      const formData = new FormData(event.target);
      const user = Object.fromEntries(formData);

      closeModal(overlay);
      resolve(user);
    }
  });
});

