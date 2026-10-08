
const albumSearchInput = document.getElementById("album-search");

albumSearchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        
        const searchTerm = event.target.value;

        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=album`)
            .then(response => response.json())
            .then(data => {
                
                //console.log(data.results[0]); 

                for (const album of data.results) {
                    console.log(album.collectionName, album.artistName);
                }
            })
            .catch(error => {
                console.error("Error fetching albums:", error);
            });

            console.log(searchTerm);
    }
});


