import { galleryItems } from "./gallery-items.js";

const galleryList = document.querySelector(".gallery");

galleryList.insertAdjacentHTML("beforeend", createMarkup(galleryItems));

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `
  <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `
    )
    .join("");
}

let instance = null;

function openModal(currentImage) {
  const imgDataSrc = currentImage.dataset.source;
  const imgAlt = currentImage.alt;
  instance = basicLightbox.create(`
  <div class="modal">
  <img
      src="${imgDataSrc}"
      alt="${imgAlt}"
    />
  </div>
  `);
  instance.show();
}

function closeModal(event) {
  if (event.code === "Escape") {
    instance.close();
  }
  document.removeEventListener("keydown", closeModal);
}

galleryList.addEventListener("click", handleClick);

function handleClick(event) {
  event.preventDefault();

  if (event.target === event.currentTarget) {
    return;
  }
  const currentImage = event.target;
  openModal(currentImage);
  document.addEventListener("keydown", closeModal);
}
