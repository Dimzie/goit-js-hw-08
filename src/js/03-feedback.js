import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const FORM_STORAGE = 'saved-form-data';

let formData = {};

formEl.addEventListener('input', throttle(onTypeInput, 500));
formEl.addEventListener('submit', onInputSubmit);

dataStorage();

function dataStorage() {
  try {
    let savedForm = localStorage.getItem(FORM_STORAGE);
  
    if (!savedForm) {
      return;
    }
  
    savedForm = JSON.parse(savedForm);
  
    Object.keys(savedForm).map(name => {
      formEl.elements[name].value = savedForm[name];
      formData[name] = formEl.elements[name].value;
    });
  } catch (error) {
    console.log(error.message);
  }
}

function onInputSubmit(event) {
    event.preventDefault();
    console.log(formData);
    formEl.reset();
    localStorage.removeItem(FORM_STORAGE);
    formData = {};
}

function onTypeInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(FORM_STORAGE, JSON.stringify(formData));
}
