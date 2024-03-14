function getDecade(year) {
    const roundedYear = Math.floor(year / 10) * 10;
    const startOfDecade = new Date(roundedYear, 0, 1);
    const endOfDecade = new Date(roundedYear + 9, 11, 31);
    return [startOfDecade, endOfDecade];
};

class ToyCarListing {
    constructor(
        UPC,
        make, 
        model, 
        year,
        color,
        price,
        condition,
        packaging,
        type, 
        scale,
        collectorsEdition
    ) {
        this.UPC = UPC
        this.make = make
        this.model = model
        this.year = year
        this.color = color
        this.price = price
        this.condition = condition
        this.packaging = packaging
        this.type = type
        this.scale = scale
        this.collectorsEdition = collectorsEdition
        this.decade = getDecade(year)
        this.refImagesPath = "assets/images/modelVehicles/" + this.UPC
    }
    
    getFullName() {
        return this.year + " " + this.make + " " + this.model
    }
}

async function fetchJSONFiles() {
    const fileNames = ['680334746241.json', '680334746242.json'];
    let output = []

    for (const fileName of fileNames) {
        try {
            const filePath = `../data/products/${fileName}`; // Update with correct relative path
            const jsonResponse = await fetch(filePath);
            const jsonContent = await jsonResponse.json();
            jsonContent["UPC"] = fileName.replace(/\.json$/, "");
            output.push(jsonContent)
        } catch (error) {
            console.error(`Error fetching file ${fileName}:`, error);
        }
    }

    return output
}

function displayProducts(products) {
    products.forEach(function(product) {
        console.log(product)
        const productGrid = document.querySelector('.product-grid');
        // Create a div element for the product
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        // Populate the product element with product information
        productElement.innerHTML = `
            <h2>${product.getFullName()}</h2>
            <p>UPC: ${product.UPC}</p>
            <p>Make: ${product.make}</p>
            <p>Model: ${product.model}</p>
            <p>Year: ${product.year}</p>
            <p>Color: ${product.color}</p>
            <p>Price: ${product.price}</p>
            <p>Condition: ${product.condition}</p>
            <p>Packaging: ${product.packaging}</p>
            <p>Type: ${product.type}</p>
            <p>Scale: ${product.scale}</p>
            <p>Collector's Edition: ${product.collectorsEdition ? 'Yes' : 'No'}</p>
            
        `;
        //<img src="${product.refImagesPath}" alt="Product Image">
        // Append the product element to the product grid
        productGrid.appendChild(productElement);
    });
        
}

async function loadProducts() {
    let results = await fetchJSONFiles()
    console.log(results)
    let objects = []
    results.forEach(productData => {
        objects.push(new ToyCarListing(
            productData["UPC"],
            productData["Make"],
            productData["Model"],
            productData["Year"],
            productData["Color"],
            productData["Price"],
            productData["Condition"],
            productData["Packaging"],
            productData["Type"],
            productData["Scale"],
            productData["Collectors Edition"]
        ))
    });
    displayProducts(objects)
}

loadProducts()