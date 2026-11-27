//DOM ELEMENTS //

const albumSearchInput = document.getElementById("album-search");
const albumResultsContainer = document.getElementById("search-results");   
 

//GLOBAL EVENT LISTENERS //

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

//Message Functions

function showConfirmDialog() {

    const confirmDialog = document.getElementById("confirm-dialog");
    confirmDialog.classList.add("visible");
}

function hideConfirmDialog() {
    const confirmDialog = document.getElementById("confirm-dialog");
    confirmDialog.classList.remove("visible");
}

let albumToRemove = null;

const confirmYes = document.getElementById("confirm-yes");
const confirmNo = document.getElementById("confirm-no");

confirmNo.addEventListener("click", function() {
    hideConfirmDialog();
});
confirmYes.addEventListener("click", function() {
    if (albumToRemove !== null) {
        removeAlbum(albumToRemove);
    }
    albumToRemove = null;
    hideConfirmDialog();
});

function showConfirmDialog(albumTitle) {
            
    const confirmDialog = document.getElementById("confirm-dialog");
    const confirmMessage = document.getElementById("confirm-message");
    
    confirmMessage.textContent = `Er du sikker på at du vil fjerne "${albumTitle}" fra min musikk?`;
    
    confirmDialog.classList.add("visible");

    
}


function showMessage(message) {

    const messageContainer = document.getElementById("message-container");  

    messageContainer.textContent = message;
    messageContainer.classList.add("visible");
    setTimeout(() => {
        messageContainer.classList.remove("visible");  
        messageContainer.textContent = "";
    }, 3000);
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
        albumCover.alt = `${album.collectionName} av ${album.artistName}`;

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

        showMessage(`ℹ️   ${savedAlbum.title} lagt til og vises under Min musikk`);
    }
    else {
        showMessage(`ℹ️   ${savedAlbum.title} er allerede lagret under Min musikk`);
    }
    

    console.log(savedAlbum);
}

    // LOADING SAVED ALBUMS FROM LOCAL STORAGE //
function loadSavedAlbums() {
    
    const savedAlbumsContainer = document.getElementById("saved-albums");

    const checkingOutNowContainer = document.getElementById("checking-out-now");
    const willCheckOutContainer = document.getElementById("will-check-out");
    const checkedOutContainer = document.getElementById("checked-out"); 

    let savedAlbums = JSON.parse(localStorage.getItem("savedAlbums"));
    if (savedAlbums === null) {
        savedAlbums = [];
    }

    for (const album of savedAlbums) {
        const albumElement = createSavedAlbumElement(album);
        if (album.status === "Sjekker ut nå") {
            checkingOutNowContainer.appendChild(albumElement);
        } else if (album.status === "Skal sjekke ut") {
            willCheckOutContainer.appendChild(albumElement);
        } else if (album.status === "Har sjekket ut") {
            checkedOutContainer.appendChild(albumElement);
        } 
    }
    
}

    // CREATE SAVED ALBUM ELEMENT
function createSavedAlbumElement(album) {
    const albumElement = document.createElement("div");
    albumElement.classList.add("album-card");

    const albumCover = document.createElement("img");
    albumCover.classList.add("saved-album-cover");

    const albumInfo = document.createElement("div");
    albumInfo.classList.add("saved-album-info");

    const albumActions = document.createElement("div");
    albumActions.classList.add("saved-album-actions");

    const albumRating = document.createElement("p");
    albumRating.classList.add("saved-album-rating");

        // CREATE ALBUM STATUS SELECT ELEMENT
    const albumStatus = document.createElement("select");
    albumStatus.classList.add("saved-album-status");
    albumStatus.setAttribute("aria-label", `Velg status for albumet ${album.title}`);
    
    const statusOptions = ["Skal sjekke ut", "Sjekker ut nå", "Har sjekket ut"];
    for (const status of statusOptions) {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;

        if (album.status === status) {
            option.selected = true;
        }

        albumStatus.appendChild(option);
    }   

    albumStatus.addEventListener("change", function() {
        console.log(albumStatus.value);
        const newStatus = albumStatus.value;

        const savedAlbums = JSON.parse(localStorage.getItem("savedAlbums"));

        const savedAlbum = savedAlbums.find(function(savedAlbum) {
            return savedAlbum.id === album.id;
        });

        if (savedAlbum) {
            savedAlbum.status = newStatus;
            localStorage.setItem("savedAlbums", JSON.stringify(savedAlbums));

            document.getElementById("checking-out-now").innerHTML = "";
            document.getElementById("will-check-out").innerHTML = "";
            document.getElementById("checked-out").innerHTML = "";
            loadSavedAlbums();
        }
        
    
    });

    const albumYear = document.createElement("p");
    albumYear.classList.add("saved-album-year");

    const albumTitle = document.createElement("h3");
    albumTitle.classList.add("saved-album-title");

    const albumArtist = document.createElement("p");
    albumArtist.classList.add("saved-album-artist");

    const removeButton = document.createElement("button");
    removeButton.classList.add("alternative-btn");
    removeButton.textContent = "−";

    removeButton.addEventListener("click", function() {

        albumToRemove = album.id;
                
        showConfirmDialog(album.title);    
               
    }); 

    
  
    

    //populate saved album result element with data
    albumTitle.textContent = album.title;
    albumArtist.textContent = album.artist;
    albumCover.src = album.cover;
    albumCover.alt = `${album.title} av ${album.artist}`;
    albumYear.textContent = new Date(album.releaseDate).getFullYear();
    
    albumRating.textContent = album.rating || "Ingen vurdering";

    // build saved album card structure
    albumInfo.appendChild(albumTitle);
    albumInfo.appendChild(albumArtist);
    albumInfo.appendChild(albumYear);

    // append status and remove button to album actions container
    albumActions.appendChild(albumStatus);
    albumActions.appendChild(removeButton);

    //albumInfo.appendChild(albumRating);
    albumElement.appendChild(albumCover);
    albumElement.appendChild(albumInfo);
    albumInfo.appendChild(albumActions); 

    return albumElement;
}
    // REMOVE ALBUM FROM LOCAL STORAGE AND UPDATE DISPLAY //
function removeAlbum(albumId) {
    let savedAlbums = JSON.parse(localStorage.getItem("savedAlbums"));
    
    savedAlbums = savedAlbums.filter(function(savedAlbum) {
        return savedAlbum.id !== albumId;
    });

    localStorage.setItem("savedAlbums", JSON.stringify(savedAlbums));
    document.getElementById("checking-out-now").innerHTML = "";
    document.getElementById("will-check-out").innerHTML = "";
    document.getElementById("checked-out").innerHTML = "";
    loadSavedAlbums();
 
}

loadSavedAlbums();

