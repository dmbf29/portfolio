//= require_tree .

const copy = (btn) => {
  console.log('copy')
  const text = btn.parentElement.nextElementSibling.querySelector('pre').innerText;
  const elem = document.createElement('textarea');
  elem.value = text;
  document.body.appendChild(elem);
  elem.select();
  document.execCommand('copy');
  document.body.removeChild(elem);
}

const copyBtns = document.querySelectorAll(".btn-copy")
if (copyBtns.length > 0) {
  copyBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => copy(event.currentTarget));
  })
}

$(function () {
  $('[data-toggle="popover"]').popover()
})
