const formItemSelectElement = document.querySelector('.form__item--country');

const countySelectElement = formItemSelectElement.querySelector('.form__country-select');
const countryOptionElement = formItemSelectElement.querySelector("option[selected]");

const phoneInput = document.querySelector("#tel");

const countryCode = countryOptionElement.value;

function selectChangeHandler () {
  const urlValue = `url(../../img/country-${this.value}.png)`
  formItemSelectElement.style.setProperty('--country-flag-url', urlValue);

  phoneInput.placeholder = `+${this.value} (123) 456 78-90`
}

countySelectElement.addEventListener('change', selectChangeHandler);


