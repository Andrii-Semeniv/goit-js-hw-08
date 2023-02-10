import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

populateTextarea();

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const finalMessage = localStorage.getItem(STORAGE_KEY);
  console.log(JSON.parse(finalMessage));
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateTextarea() {
  if (localStorage.getItem(STORAGE_KEY)) {
    const finalMessage = localStorage.getItem(STORAGE_KEY);
    const valueOfStorage = JSON.parse(finalMessage);
    if (valueOfStorage.email) {
      email.value = valueOfStorage.email;
    }
    if (valueOfStorage.message) {
      textarea.value = valueOfStorage.message;
    }
  }
}
