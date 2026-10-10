
const albumSearchInput = document.getElementById("album-search");

albumSearchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        
        const searchTerm = event.target.value;

        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=album&limit=20`)
            .then(response => response.json())
            .then(data => {
                
                //console.log(data.results[0]); 
                
               // for (const album of data.results) {
                //    console.log(album.collectionName, album.artistName);
                //}

                const albumResultsContainer = document.getElementById("search-results");
                albumResultsContainer.innerHTML = "";
                
                //filter out singles from the search results
                const filteredAlbums = data.results.filter(album => {
                    return !album.collectionName
                        .toLowerCase()
                        .includes("single");
                
                }); 

                for (const album of filteredAlbums) {
                    
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

                    //append album result element to the container
                    albumInfo.appendChild(albumTitle);
                    albumInfo.appendChild(albumArtist);
                    albumElement.appendChild(albumCover);
                    albumElement.appendChild(albumInfo);
                    albumElement.appendChild(addButton);
                    albumResultsContainer.appendChild(albumElement);

                                        
                }
                
                    
            })
            .catch(error => {
                console.error("Error fetching albums:", error);
            });

            //clear the search input -- 
            //albumSearchInput.value = "";

            console.log(searchTerm);
           
    }
});


