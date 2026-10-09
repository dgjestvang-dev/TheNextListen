
const albumSearchInput = document.getElementById("album-search");

albumSearchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        
        const searchTerm = event.target.value;

        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=album`)
            .then(response => response.json())
            .then(data => {
                
                //console.log(data.results[0]); 

               // for (const album of data.results) {
                //    console.log(album.collectionName, album.artistName);
                //}

                const albumResultsContainer = document.getElementById("search-results");
                albumResultsContainer.innerHTML = "";
                
                for (const album of data.results) {
                    
                    //create album result element
                    const albumElement = document.createElement("div");
                    albumElement.classList.add("album-result");
                    
                    const albumTitle = document.createElement("h3");
                    albumTitle.classList.add("album-title");
                    
                    const albumArtist = document.createElement("p");
                    albumArtist.classList.add("album-artist");
                    
                    const albumCover = document.createElement("img");
                    albumCover.classList.add("album-cover");

                    //populate album result element with data
                    albumTitle.textContent = album.collectionName;
                    albumArtist.textContent = album.artistName;
                    albumCover.src = album.artworkUrl100; 

                    //append album result element to the container
                    albumElement.appendChild(albumTitle);
                    albumElement.appendChild(albumArtist);
                    albumElement.appendChild(albumCover);                  
                    albumResultsContainer.appendChild(albumElement);
                }

            })
            .catch(error => {
                console.error("Error fetching albums:", error);
            });

            console.log(searchTerm);
    }
});


