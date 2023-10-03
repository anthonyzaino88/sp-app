// Function to create a container element
function createContainer(elementType, className) {
  const container = document.createElement(elementType);
  container.classList.add(className);
  return container;
}




// Define a function to add a description section
function addDescription(description) {
  // Create a container for the description
  const descriptionContainer = createContainer("div", "description-container");
  // Create a paragraph element for the description text
  const descriptionText = document.createElement("div");
  descriptionText.textContent = description;
  // Append the description text to the container
  descriptionContainer.appendChild(descriptionText);
  // Append the description container to the product info container
  productInfoContainer.appendChild(descriptionContainer);
}

// Function to display the product description
function displayDescription(product, selectedSeries) {
  // Clear existing content in the descriptionContainer
  descriptionContainer.textContent = "";

  // Find the selected series by name
  const selectedSeriesObj = product.series.find((series) => series.name === selectedSeries);

  // Check if the selected series is found
  if (selectedSeriesObj) {
    // Create a paragraph element for the description text
    const descriptionText = document.createElement("div");
    descriptionText.textContent = selectedSeriesObj.description;

    // Append the description text to the descriptionContainer
    descriptionContainer.appendChild(descriptionText);
  } else {
    // Handle the case where the selected series is not found
    console.error("Selected series not found:", selectedSeries);
  }
}






document.addEventListener("DOMContentLoaded", () => {
  // Find the main product container
  const productContainer = document.querySelector(".product-list-container");

  // Initialize variables
  let activeProductImage = null; // Track the currently clicked product image
  let isProductInfoVisible = false; // Track whether product info is visible

  // Create a container for the product series
  const seriesContainer = createContainer("div", "series-container");

  // Append the series container to the main product container
  productContainer.appendChild(seriesContainer);

  // Create a back arrow for reloading product listings
  const backArrow = createContainer("div", "back-arrow");
  backArrow.innerHTML = `<img src="../assets/images/return-back-button.svg" alt="back" />`;

  // Create a div for the product name and style it
  const productNameDiv = createContainer("div", "product-name");

  // Append the product name div to the back arrow container
  backArrow.appendChild(productNameDiv);

  // Append the back arrow to the main product container, but initially hide it
  productContainer.appendChild(backArrow);
  backArrow.style.display = "none"; // Initially hide it

  // Create a container for the product info
  const productInfoContainer = createContainer("div", "product-info-container");

  const productImageContainer = createContainer("div", "product-image-container");
  productInfoContainer.appendChild(productImageContainer);
  productImageContainer.style.display = "none"; // Initially hide it

  // Create a container for the series and models dropdowns
  const dropdownsContainer = createContainer("div", "dropdowns-container");
  dropdownsContainer.style.display = "flex"; // Apply flex display
  dropdownsContainer.style.alignItems = "center"; // Center items vertically
  dropdownsContainer.style.flexWrap = "wrap";

  // Create containers for series, models dropdowns, price, series image, other docs, and submittals
  const seriesDropdownContainer = createContainer("div", "series-dropdown-container");
  const modelsDropdownContainer = createContainer("div", "models-dropdown-container");
  const priceContainer = createContainer("div", "price-container");
  const seriesImageContainer = createContainer("div", "series-image-container");
  const descriptionContainer = createContainer("div", "description-container");
  const displayedProductInfo = createContainer("div", "displayed-product-info"); // Container for displayed product info
  const literatureDropdownContainer = createContainer("div", "literature-dropdown-container"); // Container for Literature dropdown

  // Create a button for toggling Literature
  const literatureToggleButton = document.createElement("button");
  literatureToggleButton.textContent = "Literature +";
  literatureToggleButton.addEventListener("click", () => {
    // Toggle the visibility of Other Docs and Submittals
    const isHidden = otherDocsContainer.style.display === "none";
    otherDocsContainer.style.display = isHidden ? "block" : "none";
    submittalsContainer.style.display = isHidden ? "block" : "none";

    // Toggle the button text
    literatureToggleButton.textContent = isHidden ? "Literature -" : "Literature +";
  });

  const imageProductContainer = createContainer("div", "product-image-container");



  // Create a container for Literature titles and wrap the otherDocsContainer and submittalsContainer
  const litTitlesContainer = createContainer("div", "lit-titles-container");

  // Create containers for otherDocsContainer and submittalsContainer
  const otherDocsContainer = createContainer("div", "other-docs-container");
  const submittalsContainer = createContainer("div", "submittals-container");

  // Append the product info containers to the main product container
  productContainer.appendChild(productInfoContainer);

  // Append displayed product info container
  productInfoContainer.appendChild(displayedProductInfo);
  productInfoContainer.appendChild(dropdownsContainer); // Append the dropdowns container
  dropdownsContainer.appendChild(seriesDropdownContainer);
  dropdownsContainer.appendChild(modelsDropdownContainer);
  productInfoContainer.appendChild(seriesImageContainer);
  productInfoContainer.appendChild(priceContainer);
  productInfoContainer.appendChild(descriptionContainer); // Append the description container
  productInfoContainer.appendChild(literatureDropdownContainer); // Append the Literature dropdown container to the product info container
  literatureDropdownContainer.appendChild(literatureToggleButton); // Append the button to the Literature dropdown container
  literatureDropdownContainer.appendChild(litTitlesContainer); // Append the lit-titles-container to the Literature dropdown container
  litTitlesContainer.appendChild(otherDocsContainer);
  litTitlesContainer.appendChild(submittalsContainer);

    // Append the product image container below the product info container
    productContainer.insertBefore(imageProductContainer, productInfoContainer.nextSibling);
  
    // Initially hide the imageProductContainer
    imageProductContainer.style.display = "none";

  // Add an event listener to the back arrow
  backArrow.addEventListener("click", () => {
    // Show all product listings
    document.querySelectorAll(".product-listing").forEach((listing) => {
      listing.style.display = "block";
    });

    // Clear the active product image
    if (activeProductImage) {
      activeProductImage.classList.remove("active");
      activeProductImage = null;
    }

    // Clear existing content in the product info containers
    clearProductInfo();

    // Hide the back arrow
    backArrow.style.display = "none";
    isProductInfoVisible = false;

    // Hide the series image
    seriesImageContainer.style.display = "none"; // Add this line to hide the series image

    productImageContainer.style.display = "none";

    descriptionContainer.innerHTML = "";

    // Clear submittalsContainer
    submittalsContainer.innerHTML = ""; // Add this line to clear submittals
    otherDocsContainer.innerHTML = "";

    modelsDropdownContainer.style.display = "";
    submittalsContainer.style.display = "none";
    otherDocsContainer.style.display = "none";

    literatureDropdownContainer.style.display = "none";

    imageProductContainer.style.display = "none";

    if (literatureDropdownContainer.style.display = "none") {
      literatureToggleButton.textContent = "Literature +";
    }
  });

  function displayDescription(product, selectedSeries) {
    // Clear existing content in the descriptionContainer
    descriptionContainer.textContent = "";

    // Find the selected series by name
    const selectedSeriesObj = product.series.find((series) => series.name === selectedSeries);

    // Check if the selected series is found
    if (selectedSeriesObj) {
      // Create a paragraph element for the description text
      const descriptionText = document.createElement("div");
      descriptionText.textContent = selectedSeriesObj.description;

      // Append the description text to the descriptionContainer
      descriptionContainer.appendChild(descriptionText);
    } else {
      // Handle the case where the selected series is not found
      console.error("Selected series not found:", selectedSeries);
    }
  }

  // Fetch product data from a JSON source
  fetch("../data/products.json") // Update with your JSON data source
    .then((response) => response.json())
    .then((data) => {
      // Iterate through each product in the JSON data
      data.forEach((product) => {
        // Create a container for the product listing
        const productListing = createContainer("div", "product-listing");

        literatureDropdownContainer.style.display = "none";

        // Create an HTML template for the product listing
        const productHTML = `
          <div class="product-image" style="background-image: url('${product.series[0]?.image}')"></div>
          <div class="product-title">${product.name}</div>
        `;

        productListing.innerHTML = productHTML;

        // Add a click event listener to the product image
        productListing.querySelector(".product-image").addEventListener("click", () => {
          // Hide all other product listings
          document.querySelectorAll(".product-listing").forEach((listing) => {
            listing.style.display = "none";
          });

          // Set the clicked image as active
          activeProductImage = productListing.querySelector(".product-image");
          activeProductImage.classList.add("active");

          // Display the product information underneath in a separate container
          displayProductInfo(product);
          displayProductImages(product);

          // Show the back arrow
          backArrow.style.display = "flex";
          isProductInfoVisible = true;
          literatureDropdownContainer.style.display = "none";
        });
        // Append the product listing to the series container
        seriesContainer.appendChild(productListing);
      });
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });

  function displayProductInfo(product) {
    // Clear existing content in the product info containers
    clearProductInfo();

    // Update the product name in the back arrow container
    updateProductName(product.name);

    modelsDropdownContainer.style.display = "none";

    // Assuming you have elements with the class "series-dropdown-container", "models-dropdown-container", and "price-container" for each section
    const seriesDropdown = createContainer("select", "series-dropdown");
    const modelsDropdown = createContainer("select", "models-dropdown");

    // Populate the series dropdown with series names
    seriesDropdown.innerHTML = `
      <option value="">Select a Series</option>
      ${product.series.map((series) => `<option value="${series.name}">${series.name}</option>`).join("")}
    `;

    // Add event listeners to the dropdowns (series and models)
    seriesDropdown.addEventListener("change", () => {
      const selectedSeriesName = seriesDropdown.value;
      // Filter models based on the selected series
      const selectedSeries = product.series.find((series) => series.name === selectedSeriesName);
      if (selectedSeries) {
        // Populate the models dropdown with models from the selected series
        modelsDropdown.innerHTML = `
        <option value="">Price by Model</option>
        ${Array.isArray(selectedSeries.models) ? selectedSeries.models.map((model) => `<option value="${model.name}">${model.name}</option>`).join("") : ""}
      `;

        // Set the background image of the seriesImageContainer
        seriesImageContainer.style.backgroundImage = `url('${selectedSeries.image}')`;
        seriesImageContainer.style.display = "block"; // Show the series image container

        // Show the models dropdown since a series is selected
        modelsDropdownContainer.style.display = "block";

        literatureDropdownContainer.style.display = "block";

        otherDocsContainer.style.display = "none";
        submittalsContainer.style.display = "none";
        imageProductContainer.style.display = "none";

        // Display the description for the selected series
        displayDescription(product, selectedSeriesName);

        // Populate otherDocsContainer with other documents for the selected series
        if (selectedSeries.otherDocs && selectedSeries.otherDocs.length > 0) {
          otherDocsContainer.innerHTML = `
            <div class="lit-item-title">${product.name}</div>
            <ul>
              ${selectedSeries.otherDocs.map((doc) => `<li><a href="${doc.url}" target="_blank">${doc.type}</a></li>`).join("")}
            </ul>
          `;
        } else {
          // Clear otherDocsContainer if no otherDocs are available
          otherDocsContainer.innerHTML = "";
        }

        // Populate submittalsContainer with submittals for the selected series
        if (selectedSeries.submittals) {
          submittalsContainer.innerHTML = `
            <div class="lit-item-title">Submittals</div>
            <ul>
              ${selectedSeries.submittals.map((submittal) => `<li><a href="${submittal.url}" target="_blank">${submittal.type}</a></li>`).join("")}
            </ul>
          `;
        } else {
          // Clear submittalsContainer if no submittals are available
          submittalsContainer.innerHTML = "";
        }
      } else {
        // Clear the models dropdown if no series is selected
        modelsDropdown.innerHTML = `<option value="">List Price by Model</option>`;
        // Clear the background image and hide the series image container
        seriesImageContainer.style.backgroundImage = "";
        seriesImageContainer.style.display = "none";
        imageProductContainer.style.display = "flex";
        

        descriptionContainer.innerHTML = "";

        // Clear otherDocsContainer and submittalsContainer when series selection changes
        otherDocsContainer.innerHTML = "";
        submittalsContainer.innerHTML = "";

        // Hide the models dropdown when no series is selected
        modelsDropdownContainer.style.display = "none";
        literatureDropdownContainer.style.display = "none";
      }

      // Clear the price container when series selection changes
      priceContainer.textContent = "";
    });

    modelsDropdown.addEventListener("change", () => {
      const selectedModelName = modelsDropdown.value;

      // Check if a model is selected (i.e., the selectedModelName is not an empty string)
      if (selectedModelName) {
        const selectedSeries = product.series.find((series) =>
          series.models.some((model) => model.name === selectedModelName)
        );

        if (selectedSeries) {
          const selectedModel = selectedSeries.models.find((model) => model.name === selectedModelName);

          // Check if selectedModel exists and has a price
          if (selectedModel && selectedModel.hasOwnProperty("price")) {
            priceContainer.textContent = `Price: ${selectedModel.price}`;
          } else {
            // Clear the price container or remove it
            priceContainer.textContent = ""; // Clears the content
            // Alternatively, you can remove the price container element
            // if (priceContainer.parentElement) {
            //   priceContainer.parentElement.removeChild(priceContainer);
            // }
          }
        } else {
          // Clear the price container or remove it
          priceContainer.textContent = ""; // Clears the content
          // Alternatively, you can remove the price container element
          // if (priceContainer.parentElement) {
          //   priceContainer.parentElement.removeChild(priceContainer);
          // }
        }
      } else {
        // Clear the price container or remove it
        priceContainer.textContent = ""; // Clears the content
        // Alternatively, you can remove the price container element
        // if (priceContainer.parentElement) {
        //   priceContainer.parentElement.removeChild(priceContainer);
        // }
      }
    });
    // Append the dropdowns to their respective containers
    seriesDropdownContainer.appendChild(seriesDropdown);
    modelsDropdownContainer.appendChild(modelsDropdown);
  }

  function displayProductImages(product) {
    // Clear existing content in the imageProductContainer
    imageProductContainer.innerHTML = '';
  
    // Iterate through each series in the active product
    product.series.forEach((series) => {
      // Create a container for the series image
      const seriesImageContainer = createContainer("div", "series-image");
  
      // Set the background image for the series
      seriesImageContainer.style.backgroundImage = `url('${series.image}')`;
  
      // Add a click event listener to the series image
      seriesImageContainer.addEventListener("click", () => {
        // Find the series dropdown element
        const seriesDropdown = document.querySelector(".series-dropdown");
  
        // Check if the series dropdown element exists
        if (seriesDropdown) {
          // Set the value of the series dropdown to the clicked series name
          seriesDropdown.value = series.name;
  
          // Trigger the change event on the series dropdown to populate data
          seriesDropdown.dispatchEvent(new Event("change"));
        }
      });
  
      // Create a title for the series image
      const titleElement = createContainer("div", "title-img-series");
      titleElement.textContent = series.name;
  
      // Append the title to the series image container
      seriesImageContainer.appendChild(titleElement);
  
      // Append the series image container to the imageProductContainer
      imageProductContainer.appendChild(seriesImageContainer);
    });
  
    // Show the imageProductContainer
    imageProductContainer.style.display = "flex";
  }
  

  function clearProductInfo() {
    const seriesDropdownContainer = productInfoContainer.querySelector(".series-dropdown-container");
    const modelsDropdownContainer = productInfoContainer.querySelector(".models-dropdown-container");
    const priceContainer = productInfoContainer.querySelector(".price-container");
    const displayedProductInfo = productInfoContainer.querySelector(".displayed-product-info");

    if (seriesDropdownContainer) {
      seriesDropdownContainer.innerHTML = "";
    }

    if (modelsDropdownContainer) {
      modelsDropdownContainer.innerHTML = "";
    }

    if (priceContainer) {
      priceContainer.textContent = "";
    }

    if (displayedProductInfo) {
      displayedProductInfo.textContent = ""; // Clear displayed product info
    }
  }

  function updateProductName(name) {
    productNameDiv.textContent = name;
  }
});
