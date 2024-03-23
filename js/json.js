/* STEP 2: Reference the HEADER and the SECTION elements with variables */
const header = document.querySelector("header")
const section = document.querySelector("section")

// STEP 4: Store the URL of a JSON file in a variable */
const JSONDataPath = "../js/i-scream.json"

// STEP 3a: Create the asynchronous function populate()
async function populate(URL) {

    // STEP 5: Use the new URL to create a new request object
    fetch(URL)
        // STEP 6: Make a network request with the fetch() function, which returns a Response object
        .then(response => {
            if (!response.ok) {
                throw new Error('not ok');
            }
            // STEP 7: Capture the returned Response object and covert to a JSON object using json()
            return response.json();
        })
        .then(data => {
            // STEP 8: Output the iScream JSON object to the console 
            console.log(data);
            // STEP 9a: Invoke the populateHeader function here, then build it below
            // STEP 10a: Invoke the showTopFlavors function here, then build it below
            populateHeader(data.companyName);
            showTopFlavors(data.topFlavors)
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


// STEP 3b: Call the populate() function
populate(JSONDataPath)


/* STEP 9b: Build out the populateHeader() function */
function populateHeader(companyName) {

    console.log(companyName)
    // Create the H1 element
    let h1Element = document.createElement('h1');

    // Create a text node with the company name
    let companyNameNode = document.createTextNode(companyName);

    // Append the text node to the h1 element
    h1Element.appendChild(companyNameNode);

    // Inject the complete H1 element into the DOM, inside the HEADER
    header.appendChild(h1Element)
};

/* STEP 10b: Assemble the showTopFlavors() function */
// STEP 10c: Attache the JSON topFlavors object to a variable
// let topFlavors = jsonObj.topFlavors; 
// (instead I pass it as arg)
function showTopFlavors(topFlavors) {

    // STEP 10d: Loop through the topFlavors object
    for (let i = 0; i < topFlavors.length; i++) {
        // Create ARTICLE element for each flavor
        const flavorArticle = document.createElement('article');

        // STEP 10e: build HTML elements for the content
        const nameHeading = document.createElement('h2');
        const flavorImage = document.createElement('img');
        const caloriesParagraph = document.createElement('p');
        const typeParagraph = document.createElement('p');
        const ingredientsList = document.createElement('ul');
       


        // STEP 10f: Set the textContent property for each of the above elements (except the UL), based on the JSON content
        nameHeading.textContent = topFlavors[i].name;
        caloriesParagraph.textContent = `Calories: ${topFlavors[i].calories}`;
        typeParagraph.textContent = `Type: ${topFlavors[i].type}`;

        // STEP 10g: Build a loop for the ingredients array in the JSON
        for (let j = 0; j < topFlavors[i].ingredients.length; j++) {
            const ingredientItem = document.createElement('li');
            ingredientItem.textContent = topFlavors[i].ingredients[j];
            ingredientsList.appendChild(ingredientItem);
        }

        flavorImage.src = "./images/" + topFlavors[i].image

        // add the ingredient list to the UL
        flavorArticle.appendChild(nameHeading);
        flavorArticle.appendChild(flavorImage)
        flavorArticle.appendChild(caloriesParagraph);
        flavorArticle.appendChild(typeParagraph);
        flavorArticle.appendChild(ingredientsList);

        // STEP 10h: Append each of the above HTML elements to the ARTICLE element

        // STEP 10i: Append each complete ARTICLE element to the SECTION element
        document.querySelector('section').appendChild(flavorArticle);

        // Do something interesting with the calories and type properties
        if (topFlavors[i].type === 'ice cream') {
            flavorArticle.style.backgroundColor = 'lightblue';
        } else if (topFlavors[i].type === 'sorbet') {
            flavorArticle.style.backgroundColor = 'lightgreen';
        }

        // Add note about calories
        if (topFlavors[i].calories >= 400) {
            const highCaloriesNote = document.createElement('p');
            highCaloriesNote.textContent = 'Warning: High in calories!';
            flavorArticle.appendChild(highCaloriesNote);
        }
    }

};
// STEP 11: The instructor will edit the JSON file - refresh your page to see the updated content

// STEP 12: Change the URL in STEP 3 to point to the JSON file in the local /js folder in order to prepare for today's lab

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON

// A special thanks to https://openclipart.org/detail/285225/ice-cream-cones for the awesome ice cream cone illustrations
