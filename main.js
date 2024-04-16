const CAT_FACT_API_ENDPOINT = "https://meowfacts.herokuapp.com/"
const DOG_FACT_API_ENDPOINT = "https://dogapi.dog/api/v2/facts"

async function fetchJSON(filename) {
    try {
        const response = await fetch(filename + '.json');
        if (!response.ok) {
            throw new Error('Failed to load JSON file');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading the JSON file:', error);
        return null;
    }
}

async function getCatImage(apiKey) {
    const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": apiKey
    })

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
        if (response.ok) {
            const data = await response.json()
            if (data) {
                return data[0].url
            }
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function getDogImage(apiKey) {
    const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": apiKey
    })

    const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    try {
        const response = await fetch("https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
        if (response.ok) {
            const data = await response.json();
            if (data) {
                return data[0].url
            } else {
                throw new Error("No json body")
            }
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function getCatFact() {
    try {
        const response = await fetch(CAT_FACT_API_ENDPOINT);
        if (response.ok) {
            const data = await response.json();
            if (data) {
                return data.data[0];
            } else {
                throw new Error("No json body")
            }
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function getDogFact() {
    try {
        const response = await fetch(DOG_FACT_API_ENDPOINT);
        if (response.ok) {
            const data = await response.json();
            if (data) {
                return data.data[0].attributes.body
            } else {
                throw new Error("No json body")
            }
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function setCurrentFactImg(imageUrl) {
    const currentFactImg = document.querySelector("#currentFact img")
    currentFactImg.src = imageUrl
}

function setCurrentFactText(text) {
    const currentFactImg = document.querySelector("#currentFact p")
    currentFactImg.textContent = text
}

async function displayDogFact(imageApiKey) {
    const dogFact = await getDogFact();
    const dogImage = await getDogImage(imageApiKey);
    setCurrentFactImg(dogImage);
    setCurrentFactText(dogFact);
}

async function displayCatFact(imageApiKey) {
    const catFact = await getCatFact();
    const catImage = await getCatImage(imageApiKey);
    setCurrentFactImg(catImage);
    setCurrentFactText(catFact);
}

function init(secrets) {
    const catFactButton = document.querySelector("#getRandomCat");
    const dogFactButton = document.querySelector("#getRandomDog");
    const imageApiKey = secrets.IMAGE_API_KEY
    
    catFactButton.addEventListener("click", () => {displayCatFact(imageApiKey)});
    dogFactButton.addEventListener("click", () => {displayDogFact(imageApiKey)});

    displayCatFact();
}

async function main() {
    const secrets = await fetchJSON("secrets");
    if (secrets) {
        init(secrets);
    } else {
        console.log('Failed to fetch JSON secrets');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}