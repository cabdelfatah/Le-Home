const imagecontainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
// const search = document.getElementById('search');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// to improve load times - lower initial count that loaded for first

// Unsplash API
const count = 5;
const apiKey = 'LkKEYih3TaBRdMIqRPzLuG8iM-pon1luinP9HBSGXNg';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
// *future improvements = search bar for specific category
// const apiUrl = `https://api.unsplash.com/search/photos/?client_id=${apiKey}&count=${count}&query=${search}`;


// Check if all images were loaded
function imageLoaded() {
        // console.log('image Loaded');
        imagesLoaded++;
        // console.log(imagesLoaded);
        if (imagesLoaded === totalImages) {
            ready = true;
            loader.hidden = true;
            // console.log('ready =', ready);   
        }
}

// Helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for Links & Photos add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // console.log('total images', totalImages);
    // Run function to each object in PhotosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put img inside a, then both inside imageContainer
        item.appendChild(img);
        imagecontainer.appendChild(item);
    })
}

// Get Photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error){
        // Catch error here 
    }
}

//  Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();