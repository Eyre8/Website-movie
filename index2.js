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

function shareMovie() {
    const movie = movies[currentIndex];

    const webhookUrl = 'https://mseufeduph.webhook.office.com/webhookb2/8ef714f6-81de-4b42-ad2e-c262d5ce04d1@ddedb3cc-596d-482b-8e8c-6cc149a7a7b7/IncomingWebhook/9ef0b875219140eb8135437505a9d31c/e0510d66-17c3-43f4-a3ef-0cf6a6fba189/V24duT1GXj0kuDCkgbXHPSG6tCe2ZunOnaM30gWrZrYuo1';

    const message = {
        "@type": "MessageCard",
        "@context": "https://schema.org/extensions",
        "summary": "Black Box Movie Share",
        "sections": [
            {
                "activityTitle": `${movie.title}`,
                "activitySubtitle": `${movie.genre}`,
                "activityText": `${movie.description}`,
                "images": [
                    {
                        "image": movie.poster,
                        "title": `${movie.title}`
                    }
                ],
                "facts": [
                    {
                        "name": "Running Time",
                        "value": `${movie.runningTime}`
                    },
                    {
                        "name": "Year",
                        "value": `${movie.year}`
                    }
                ]
            }
        ]
    };
    

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message),
        mode: 'no-cors'
    })
    .then(response => {
        if (!response.ok) {
            alert("Movie successfully shared!");
        }
    })
    .catch(error => console.error('Error:', error))
}
fetchMovies();
