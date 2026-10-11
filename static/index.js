//DOM ELEMENTS //

const albumSearchInput = document.getElementById("album-search");
const albumResultsContainer = document.getElementById("search-results");   
 

//Event LISTENERS //

if (albumSearchInput) {
    albumSearchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        
        const searchTerm = event.target.value;
        searchAlbums(searchTerm);
    }
});
}   


//API FUNCTIONS//

function searchAlbums(searchTerm) {
    if (searchTerm.trim() === "") {
        return;
    }

    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=album`)
            .then(response => response.json())
            .then(data => {
                albumResultsContainer.innerHTML = "";
                    
                const filteredAlbums = data.results.filter(album => {
                    return !album.collectionName
                        .toLowerCase()
                        .includes("single");
                
                }); 

                renderAlbums(filteredAlbums);

            })
            .catch(error => {
                console.error("Error fetching albums:", error);
            });   
    }

//API RENDER FUNCTIONS//

function renderAlbums(albums) {
    for (const album of albums) {
        
        const albumElement = 
            createApiAlbumElement(album);

        albumResultsContainer.appendChild(albumElement);
    }
}

function createApiAlbumElement(album) {
    //create album result element
        const albumElement = document.createElement("div");
        albumElement.classList.add("album-result");
        
        const albumCover = document.createElement("img");
        albumCover.classList.add("album-cover");

        const albumInfo = document.createElement("div");
        albumInfo.classList.add("album-info");
        
        const albumTitle = document.createElement("h3");
        albumTitle.classList.add("album-title");
        
        const albumArtist = document.createElement("p");
        albumArtist.classList.add("album-artist");

        const addButton = document.createElement("button");
        addButton.classList.add("primary-btn");
        addButton.textContent = "+";

        addButton.addEventListener("click", function() {
            saveAlbum(album);
        });

        
        //populate album result element with data
        albumTitle.textContent = album.collectionName;
        albumArtist.textContent = album.artistName;
        albumCover.src = album.artworkUrl100; 

        // build album card structure
        albumInfo.appendChild(albumTitle);
        albumInfo.appendChild(albumArtist);
        albumElement.appendChild(albumCover);
        albumElement.appendChild(albumInfo);
        albumElement.appendChild(addButton);
        
    return albumElement;
}

//LOCAL STORAGE RENDER FUNCTIONS --> Saved Albums//
    // SAVING ALBUMS TO LOCAL STORAGE
function saveAlbum(album) {
    const savedAlbum = {
        id: album.collectionId,
        title: album.collectionName,
        artist: album.artistName,
        cover: album.artworkUrl100,
        releaseDate: album.releaseDate,
        status: "Skal sjekke ut",
        rating: null
    };

    let savedAlbums = 
        JSON.parse(localStorage.getItem("savedAlbums"));
    
        if (savedAlbums === null) {
        savedAlbums =[];
    }
    
    const albumExists = savedAlbums.some(function(existingAlbum) {
        return existingAlbum.id === savedAlbum.id;
    });

    if (!albumExists) {
        savedAlbums.push(savedAlbum);

        localStorage.setItem(
        "savedAlbums", 
        JSON.stringify(savedAlbums));

        alert(`${savedAlbum.title} lagt til og vises under Min musikk`);
    }
    else {
        alert(`${savedAlbum.title} er allerede lagret under Min musikk`);
    }
    

    console.log(savedAlbum);
}

    // LOADING SAVED ALBUMS FROM LOCAL STORAGE
function loadSavedAlbums() {
    
    const savedAlbumsContainer = document.getElementById("saved-albums");

    let savedAlbums = JSON.parse(localStorage.getItem("savedAlbums"));
    if (savedAlbums === null) {
        savedAlbums = [];
    }

    for (const album of savedAlbums) {
        const albumElement = createSavedAlbumElement(album);
        savedAlbumsContainer.appendChild(albumElement);
    }
    
}

function createSavedAlbumElement(album) {
    const albumElement = document.createElement("div");
    albumElement.classList.add("album");

    const albumCover = document.createElement("img");
    albumCover.classList.add("album-cover");

    const albumInfo = document.createElement("div");
    albumInfo.classList.add("album-info");

    const albumRating = document.createElement("p");
    albumRating.classList.add("album-rating");

    const albumStatus = document.createElement("p");
    albumStatus.classList.add("album-status");

    const albumYear = document.createElement("p");
    albumYear.classList.add("album-year");

    const albumTitle = document.createElement("h3");
    albumTitle.classList.add("album-title");

    const albumArtist = document.createElement("p");
    albumArtist.classList.add("album-artist");

    const removeButton = document.createElement("button");
    removeButton.classList.add("primary-btn");
    removeButton.textContent = "−";

    removeButton.addEventListener("click", function() {
        removeAlbum(album.id);
    });

    //populate saved album result element with data
    albumTitle.textContent = album.title;
    albumArtist.textContent = album.artist;
    albumCover.src = album.cover; 
    albumYear.textContent = new Date(album.releaseDate).getFullYear();
    albumStatus.textContent = album.status;
    albumRating.textContent = album.rating || "Ingen vurdering";

    // build saved album card structure
    albumInfo.appendChild(albumTitle);
    albumInfo.appendChild(albumArtist);
    albumInfo.appendChild(albumYear);
    albumInfo.appendChild(albumStatus);
    albumInfo.appendChild(albumRating);
    albumElement.appendChild(albumCover);
    albumElement.appendChild(albumInfo);
    albumElement.appendChild(removeButton);

    return albumElement;
}

loadSavedAlbums();