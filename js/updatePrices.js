const fs = require('fs');
const path = require('path');

// Construct the path to the products.json file
const jsonFilePath = path.join(__dirname, '..', 'data', 'products.json');

// Function to update prices, excluding specific models
function updatePrices(products, percentageIncrease, excludedModels) {
    products.forEach(product => {
        if (product.series && Array.isArray(product.series)) {
            product.series.forEach(series => {
                if (series.models && Array.isArray(series.models)) {
                    series.models.forEach(model => {
                        if (!excludedModels.includes(model.name)) {
                            // Remove the dollar sign and any commas, then convert the price to a number
                            let priceNumber = parseFloat(model.price.replace('$', '').replace(/,/g, ''));
                            // Apply the percentage increase
                            priceNumber *= (1 + percentageIncrease / 100);
                            // Round down to the nearest whole dollar
                            priceNumber = Math.floor(priceNumber);
                            // Format the number back to a string with a dollar sign and proper comma placement
                            model.price = `$${priceNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                        }
                    });
                    
                }
            });
        }
    });
    return products;
}


// Read the JSON file
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error("An error occurred while reading the JSON file.", err);
        return;
    }

    // Parse the JSON data
    const products = JSON.parse(data);

    // Update the prices, excluding specific models
    const excludedModels = ['TRCeN', 'TR']; // Models to exclude from the price update
    const updatedProducts = updatePrices(products, 4, excludedModels); // Increase prices by 4% excluding specified models

    // Convert back to JSON
    const updatedJson = JSON.stringify(updatedProducts, null, 2);

    // Write the updated JSON back to the file
    fs.writeFile(jsonFilePath, updatedJson, 'utf8', (err) => {
        if (err) {
            console.error("An error occurred while writing to the JSON file.", err);
            return;
        }
        console.log("Prices updated successfully.");
    });
});
