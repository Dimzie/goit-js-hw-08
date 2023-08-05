// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"

console.log(galleryItems);

const galleryListEl = document.querySelector(".gallery");
console.log(galleryListEl);

const addImageInList = imagesList => {
    return imagesList.map(({preview, original, description}) => {
        return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
        class="gallery__image"
        src="${preview}"
        alt="${description}"
        />
        </a>
        </li>`;
    }).join("");
}

galleryListEl.insertAdjacentHTML("afterbegin", addImageInList(galleryItems));

new SimpleLightbox(".gallery a", {
    captions: true,
    captionType: "attr",
    captionsData: "alt",
    captionPosition: "bottom",
    captionSelecor: "img a",
    captionDelay: 250,
});
