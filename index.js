const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const resultsCard = document.getElementById("results");

searchButton.addEventListener("click", async () => {
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== "") {
    resultsCard.innerHTML = "Loading...";

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${searchTerm}&media=music`
      );
      const data = await response.json();

      displayResults(data.results);
    } catch (error) {
      resultsCard.innerHTML = "An error occurred.";
    }
  } else {
    resultsCard.innerHTML = "Please enter a song name.";
  }
});

const displayResults = (results) => {
  resultsCard.innerHTML = "";

  results.forEach((result) => {
    const resultElement = document.createElement("div");
    resultElement.classList.add("result");
    resultElement.innerHTML = `
            <img src="${result.artworkUrl100}" alt="${result.trackName}">
            <h3>${result.trackName}</h3>
            <p>${result.artistName}</p>
            <audio controls>
                <source src="${result.previewUrl}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;

    resultsCard.appendChild(resultElement);
  });
};
