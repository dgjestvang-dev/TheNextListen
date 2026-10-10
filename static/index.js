//DOM ELEMENTS //

const albumSearchInput = document.getElementById("album-search");
const albumResultsContainer = document.getElementById("search-results");

//Event LISTENERS //

albumSearchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        
        const searchTerm = event.target.value;
        searchAlbums(searchTerm);
    }
});

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

//RENDER FUNCTIONS//

function renderAlbums(albums) {
    for (const album of albums) {
        
        const albumElement = 
            createAlbumElement(album);

        albumResultsContainer.appendChild(albumElement);
    }
}

function createAlbumElement(album) {
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


             