//= require_tree .

const copy = (btn) => {
  console.log("copy");
  const text =
    btn.parentElement.nextElementSibling.querySelector("pre").innerText;
  const elem = document.createElement("textarea");
  elem.value = text;
  document.body.appendChild(elem);
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
};

const copyBtns = document.querySelectorAll(".btn-copy");
if (copyBtns.length > 0) {
  copyBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => copy(event.currentTarget));
  });
}

$(function () {
  $('[data-toggle="popover"]').popover();
});

fetch("https://le-wagon-tokyo.herokuapp.com/api/v1/infos.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log("API:", data);
    const template = document.querySelector("#infosTemplate");
    const clone = template.content.cloneNode(true);
    clone.querySelector("#info-students").innerText =
      data.students.toLocaleString();
    clone.querySelector("#info-projects").innerText =
      data.projects.toLocaleString();
    clone.querySelector("#info-batches").innerText =
      data.batches.toLocaleString();
    const aboutSection = document.querySelector("#about");
    aboutSection.appendChild(clone);
  });
