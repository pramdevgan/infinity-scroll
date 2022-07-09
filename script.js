const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
initialLoad = true;

// Unsplash API
let count = 5;
const apiKey = 'TskJz77kdd3MGmTwXQ3r_7-ShhualEPWSja9fEtnULg';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// Check if all images were loaded
function imageLoaded (){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

    }
}

// Helper function to set Attribute on DOM element
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}
// Create Elements for Links and Photos, add to DOM
function displayPhotos (){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each item is finished loading
        img.addEventListener('load',imageLoaded);
        // Put <img> inside the <a>, then put both inside imageContainer Elements
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        // Catch error here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll',()=> {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();