// endpoint constants 
const CAT_FACT_API_ENDPOINT = "https://meowfacts.herokuapp.com/"
const DOG_FACT_API_ENDPOINT = "https://dogapi.dog/api/v2/facts"
const CAT_IMAGE_API_ENDPOINT = "https://api.thecatapi.com/v1/images/search"
const DOG_IMAGE_API_ENDPOINT = "https://api.thedogapi.com/v1/images/search"

// fetches json, handles try catch internally, simplifying code.
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

// fetches a cat image url from the CAT_IMAGE_API_ENDPOINT
// returns string representing image url
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
        const response = await fetch(CAT_IMAGE_API_ENDPOINT + "?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
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

// fetches a dog image url from the DOG_IMAGE_API_ENDPOINT
// returns string representing image url
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
        const response = await fetch(DOG_IMAGE_API_ENDPOINT + "?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
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

// fetches a cat fact from the CAT_FACT_API_ENDPOINT
// returns string
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

// fetches a dog fact from the DOG_FACT_API_ENDPOINT
// returns string
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

// sets on-screen current fact image to given imageUrl
function setCurrentFactImg(imageUrl) {
    const currentFactImg = document.querySelector("#currentFact img")
    currentFactImg.src = imageUrl
}

// sets on-screen current fact to given text
function setCurrentFactText(text) {
    const currentFactImg = document.querySelector("#currentFact p")
    currentFactImg.textContent = text
}

function clearDisplay() {
    setCurrentFactText("");
    setCurrentFactImg("./assets/Loading.png");
}

// fetches and displays dog fact on-screen
async function displayDogFact(imageApiKey) {
    clearDisplay();
    const dogFact = await getDogFact();
    const dogImage = await getDogImage(imageApiKey);
    setCurrentFactImg(dogImage);
    setCurrentFactText(dogFact);
}

// fetches and displays cat fact on-screen
async function displayCatFact(imageApiKey) {
    clearDisplay();
    const catFact = await getCatFact();
    const catImage = await getCatImage(imageApiKey);
    setCurrentFactImg(catImage);
    setCurrentFactText(catFact);
}

// initializes event connections and loads initial display
function init(secrets) {
    const catFactButton = document.querySelector("#getRandomCat");
    const dogFactButton = document.querySelector("#getRandomDog");
    const imageApiKey = secrets.IMAGE_API_KEY
    
    catFactButton.addEventListener("click", () => {displayCatFact(imageApiKey)});
    dogFactButton.addEventListener("click", () => {displayDogFact(imageApiKey)});

    displayCatFact();
}

// boots application
async function main() {
    const secrets = await fetchJSON("secrets");
    if (secrets) {
        init(secrets);
    } else {
        console.log('Failed to fetch JSON secrets');
    }
}

// if the DOM is already loaded, the program may start
if (document.readyState !== 'loading') {
    main();
}

// otherwise we will wait for the DOMContentLoaded event to fire
document.addEventListener('DOMContentLoaded', main);