let movies = [];
let currentIndex = 0;

function navigateToPage() {
    window.location.href = "index.html";
}

async function fetchMovies() {
    try {
        const response = await fetch("https://api.andrespecht.dev/movies");
        const json = await response.json();
        movies = json.response; 
        showMovie(currentIndex); 
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}

function searchMovie() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const foundIndex = movies.findIndex(movie => movie.title.toLowerCase().includes(query));

    if (foundIndex !== -1) {
        currentIndex = foundIndex;
        showMovie(currentIndex);
    } else {
        alert('Movie not found');
    }
}

function showMovie(index, direction) {
    const movie = movies[index];
    const movieContainer = document.getElementById("movieContainer");
    const TitleYear = document.getElementById("TitleYear");
    const movieDetails = document.getElementById("movieDetails");

    movieContainer.style.animation = 'none'; 
    TitleYear.style.animation = 'none';
    movieDetails.style.animation = 'none';

    void movieContainer.offsetWidth;
    void TitleYear.offsetWidth;
    void movieDetails.offsetWidth;

    if (direction === 'right') {
        movieContainer.style.animation = 'fade-in-right 0.5s forwards';
        TitleYear.style.animation = 'fade-in-right 0.5s forwards';
        movieDetails.style.animation = 'fade-in-right 0.5s forwards';
    } else if (direction === 'left') {
        movieContainer.style.animation = 'fade-in-left 0.5s forwards';
        TitleYear.style.animation = 'fade-in-left 0.5s forwards';
        movieDetails.style.animation = 'fade-in-left 0.5s forwards';
    }

    document.getElementById("movieContainer").innerHTML = `<img src="${movie.poster}" alt="${movie.title}" style="width: 350px;">`;

    document.getElementById("TitleYear").innerHTML = `<h1>${movie.title}</h1> <h6>Year: ${movie.year}</h6> <p> ${movie.description} </p>`

    document.getElementById("movieDetails").innerHTML = `<p>Running Time: ${movie.runningTime}</p> 
    <p>Genre: ${movie.genre} </p>`;
                        
}


function showNextMovie() {
    currentIndex++;
    if (currentIndex >= movies.length) {
        currentIndex = 0;
    }
    showMovie(currentIndex, "right");
}

function showPreviousMovie() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = movies.length-1;
    }
    showMovie(currentIndex, "left");
}

fetchMovies();