function validateContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const messageField = document.getElementById('message');
  const successMsg = document.getElementById('form-success');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(field, message) {
    const error = field.parentElement.querySelector('.error');
    error.style.display = 'block';
    error.textContent = message;
  }

  function clearError(field) {
    const error = field.parentElement.querySelector('.error');
    error.style.display = 'none';
    error.textContent = '';
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;

    if (nameField.value.trim().length < 2) {
      setError(nameField, 'Please provide your full name.');
      valid = false;
    } else {
      clearError(nameField);
    }

    if (!emailPattern.test(emailField.value.trim())) {
      setError(emailField, 'Please enter a valid email address.');
      valid = false;
    } else {
      clearError(emailField);
    }

    if (messageField.value.trim().length < 10) {
      setError(messageField, 'Message must be at least 10 characters.');
      valid = false;
    } else {
      clearError(messageField);
    }

    if (valid) {
      successMsg.style.display = 'block';
      form.reset();
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 3500);
    }
  });
}

document.addEventListener('DOMContentLoaded', validateContactForm);