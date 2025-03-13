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
  const selectedSeriesObj = product.series.find(
    (series) => series.name === selectedSeries
  );

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
  // Function to extract URL parameters
  function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);

    return urlParams.get(name);
  }

  const selectedProductFromUrl = getUrlParameter("product");
  const selectedSeriesFromUrl = getUrlParameter("series");
  const selectedModelFromUrl = getUrlParameter("model");

  // Add the popstate event listener to handle browser back button clicks
  window.addEventListener("popstate", (event) => {
    // Check the event state for the previous state
    const previousState = event.state;

    // If the previous state exists and contains path information
    if (previousState && previousState.path) {
      const updatedUrl = "../pages/products.html"; // Remove the parameters
      window.history.pushState({ path: updatedUrl }, "", updatedUrl);
    }
  });

  // Extract product and series parameters from the URL
  const selectedProduct = getUrlParameter("product");

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

  const productImageContainer = createContainer(
    "div",
    "product-image-container"
  );
  productInfoContainer.appendChild(productImageContainer);
  productImageContainer.style.display = "none"; // Initially hide it

  // Create a container for the series and models dropdowns
  const dropdownsContainer = createContainer("div", "dropdowns-container");
  dropdownsContainer.style.display = "flex"; // Apply flex display
  dropdownsContainer.style.alignItems = "center"; // Center items vertically
  dropdownsContainer.style.flexWrap = "wrap";

  // Create containers for series, models dropdowns, price, series image, other docs, and submittals
  const seriesDropdownContainer = createContainer(
    "div",
    "series-dropdown-container"
  );
  const modelsDropdownContainer = createContainer(
    "div",
    "models-dropdown-container"
  );
  const priceContainer = createContainer("div", "price-container");
  const seriesImageContainer = createContainer("div", "series-image-container");
  const descriptionContainer = createContainer("div", "description-container");
  const displayedProductInfo = createContainer("div", "displayed-product-info"); // Container for displayed product info
  const literatureDropdownContainer = createContainer(
    "div",
    "literature-dropdown-container"
  ); // Container for Literature dropdown

  // Create a button for toggling Literature
  const literatureToggleButton = document.createElement("button");
  literatureToggleButton.textContent = "Literature +";
  literatureToggleButton.addEventListener("click", () => {
    const isHidden = otherDocsContainer.style.display === "none";
    otherDocsContainer.style.display = isHidden ? "block" : "none";
    submittalsContainer.style.display = isHidden ? "block" : "none";

    // Toggle the button text
    literatureToggleButton.textContent = isHidden
      ? "Literature -"
      : "Literature +";

    // Find the Literature section container by its id
    const literatureSection = submittalsContainer;

    // Check if the Literature section exists
    if (literatureSection) {
      // Scroll to the Literature section with smooth animation
      literatureSection.scrollIntoView({ behavior: "smooth" });
    }
  });
  const imageProductContainer = createContainer(
    "div",
    "product-image-container"
  );
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
  productContainer.insertBefore(
    imageProductContainer,
    productInfoContainer.nextSibling
  );

  // Initially hide the imageProductContainer
  imageProductContainer.style.display = "none";

  function resetViewToDefault() {
    // Show all product listings
    document.querySelectorAll(".product-listing").forEach((listing) => {
      listing.style.display = "block";
    });

    // Hide elements specific to the selected product view
    seriesImageContainer.style.display = "none";
    productImageContainer.style.display = "none";
    literatureDropdownContainer.style.display = "none";
    imageProductContainer.style.display = "none";
    descriptionContainer.innerHTML = "";
    submittalsContainer.innerHTML = "";
    otherDocsContainer.innerHTML = "";
    modelsDropdownContainer.style.display = "none";
    if (literatureDropdownContainer.style.display === "none") {
      literatureToggleButton.textContent = "Literature +";
    }

    // Clear product info and hide back arrow
    clearProductInfo();
    backArrow.style.display = "none";
    isProductInfoVisible = false;
  }

  function clearProductInfo() {
    // Add logic here to clear product info
  }

  backArrow.addEventListener("click", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get("product");
    const seriesParam = urlParams.get("series");

    if (seriesParam) {
      // Viewing a specific series, navigate back to the product view
      const updatedUrl = `../pages/products.html?product=${encodeURIComponent(
        productParam
      )}`;
      window.location.href = updatedUrl; // Navigate to the updated URL
    } else if (productParam) {
      // Viewing a specific product, navigate back to the full product listing
      const updatedUrl = "../pages/products.html";
      window.location.href = updatedUrl; // Navigate to the updated URL
    } else {
      // Viewing the product listing, use browser's history to go back
      window.history.back();
    }
  });

  function displayDescription(product, selectedSeries) {
    // Clear existing content in the descriptionContainer
    descriptionContainer.textContent = "";

    // Find the selected series by name
    const selectedSeriesObj = product.series.find(
      (series) => series.name === selectedSeries
    );

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
  fetch("../data/products.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((product) => {
        const productListing = createContainer("div", "product-listing");

        const productHTML = `
        <div class="product-image" style="background-image: url('${product.series[0]?.image}')" data-product-name="${product.name}"></div>
        <div class="product-title">${product.name}</div>
      `;
        productListing.innerHTML = productHTML;

        // Hide listings not matching the selected product from the URL
        if (selectedProduct && product.name !== selectedProduct) {
          productListing.style.display = "none";
        }

        // Add a click event listener to the product image
        const productImage = productListing.querySelector(".product-image");
        productImage.addEventListener("click", () => {
          productImageContainer.setAttribute("data-product-name", product.name);
          document
            .querySelectorAll(".product-listing")
            .forEach((listing) => (listing.style.display = "none"));
          productImage.classList.add("active");
          displayProductInfo(product);
          displayProductImages(product);
          backArrow.style.display = "flex";
          isProductInfoVisible = true;
          const updatedUrl = `../pages/products.html?product=${encodeURIComponent(
            product.name
          )}`;
          window.history.pushState({ path: updatedUrl }, "", updatedUrl);
          gtag("event", "select_content", {
            content_type: "product",
            item_id: product.name, // or any unique identifier for the product
          });
        });

        seriesContainer.appendChild(productListing);

        // Check if the current product matches the selected product from the URL
        if (product.name === selectedProduct) {
          productImage.click(); // Simulate a click event on the matching product image

          // If there's a series specified in the URL, handle the series selection
          if (selectedSeriesFromUrl) {
            setTimeout(() => {
              const seriesDropdown = document.querySelector(".series-dropdown");
              if (seriesDropdown) {
                seriesDropdown.value = selectedSeriesFromUrl;
                seriesDropdown.dispatchEvent(new Event("change"));
                if (selectedModelFromUrl) {
                  const modelsDropdown = document.querySelector('.models-dropdown');
                  // Ensure modelsDropdown is populated before attempting to set its value
                  // This might require you to adjust how and when modelsDropdown is populated
                  modelsDropdown.value = selectedModelFromUrl;
                  modelsDropdown.dispatchEvent(new Event('change'));

                  // Note: The logic here assumes that the modelsDropdown population
                  // and its change event logic handle displaying the model's details (e.g., price)
                }
              }
            }, 0); // setTimeout ensures DOM updates are complete
          }
        }
      });
    })
    .catch((error) => console.error("Error fetching product data:", error));

  function displayProductInfo(product) {
    // Clear existing content in the product info containers
    clearProductInfo();

    // Update the product name in the back arrow container
    updateProductName(product.name);

    // Initially hide the models dropdown
    modelsDropdownContainer.style.display = "none";

    // Create dropdowns for series and models
    const seriesDropdown = createContainer("select", "series-dropdown");
    const modelsDropdown = createContainer("select", "models-dropdown");

    // Populate the series dropdown with series names
    seriesDropdown.innerHTML = `
      <option value="">Select a Series</option>
      ${product.series
        .map(
          (series) => `<option value="${series.name}">${series.name}</option>`
        )
        .join("")}
    `;

    // Append the dropdowns to their respective containers
    seriesDropdownContainer.appendChild(seriesDropdown);
    modelsDropdownContainer.appendChild(modelsDropdown);

    // Add event listener to the series dropdown
    seriesDropdown.addEventListener("change", () => {
      const selectedSeriesName = seriesDropdown.value;
      const selectedSeries = product.series.find(
        (series) => series.name === selectedSeriesName
      );

      if (selectedSeries) {
        // Check if there are models and if at least one model has a price
        const hasPricedModels =
          selectedSeries.models &&
          selectedSeries.models.some((model) => model.price);

        if (hasPricedModels) {
          // Populate the models dropdown with models from the selected series
          modelsDropdown.innerHTML = `
                  <option value="">List Price by Model</option>
                  ${
                    Array.isArray(selectedSeries.models)
                      ? selectedSeries.models
                          .map(
                            (model) =>
                              `<option value="${model.name}">${model.name}</option>`
                          )
                          .join("")
                      : ""
                  }
                `;
          // Show the models dropdown since a series is selected
          modelsDropdownContainer.style.display = "block";
        } else {
          // Hide the models dropdown if no models have prices
          modelsDropdownContainer.style.display = "none";
        }

        // Set the background image of the seriesImageContainer
        seriesImageContainer.style.backgroundImage = `url('${selectedSeries.image}')`;
        seriesImageContainer.style.display = "block"; // Show the series image container

        literatureDropdownContainer.style.display = "block";
        otherDocsContainer.style.display = "none";
        submittalsContainer.style.display = "none";
        imageProductContainer.style.display = "none";

        // Display the description for the selected series
        displayDescription(product, selectedSeriesName);

        populateAndDisplayDocuments(product, selectedSeries);

        // Update URL parameters
        const productName =
          productImageContainer.getAttribute("data-product-name");
        if (productName) {
          const updatedUrl = `../pages/products.html?product=${encodeURIComponent(
            productName
          )}&series=${encodeURIComponent(selectedSeriesName)}`;
          window.history.pushState({ path: updatedUrl }, "", updatedUrl);
        }
      } else {
        // Clear the models dropdown if no series is selected
        modelsDropdown.innerHTML = `<option value="">Select a Model</option>`;
        seriesImageContainer.style.backgroundImage = "";
        seriesImageContainer.style.display = "none";
        imageProductContainer.style.display = "flex";
        descriptionContainer.innerHTML = "";
        otherDocsContainer.innerHTML = "";
        submittalsContainer.innerHTML = "";
        modelsDropdownContainer.style.display = "none";
        literatureDropdownContainer.style.display = "none";
      }

      // Clear the price container when series selection changes
      priceContainer.textContent = "";
    });

    modelsDropdown.addEventListener("change", () => {
      const selectedModelName = modelsDropdown.value;
    
      // Retrieve the product name and series name from the existing URL or another source
      const productName = new URLSearchParams(window.location.search).get('product');
      const selectedSeriesName = new URLSearchParams(window.location.search).get('series');
    
      if (selectedModelName) {
        const selectedSeries = product.series.find(series =>
          series.models.some(model => model.name === selectedModelName)
        );
    
        if (selectedSeries) {
          const selectedModel = selectedSeries.models.find(model => model.name === selectedModelName);
    
          if (selectedModel && selectedModel.hasOwnProperty("price")) {
            priceContainer.textContent = `Price: ${selectedModel.price}`;
    
            // Update the URL with the selected model
            const updatedUrl = `../pages/products.html?product=${encodeURIComponent(productName)}&series=${encodeURIComponent(selectedSeriesName)}&model=${encodeURIComponent(selectedModelName)}`;
            window.history.pushState({path: updatedUrl}, "", updatedUrl);
          } else {
            priceContainer.textContent = ""; // Clear the price container if model has no price
          }
        } else {
          priceContainer.textContent = ""; // Clear the price container if series is not found
        }
      } else {
        // Clear the price container if no model is selected
        priceContainer.textContent = "";
      }
    });
    
    // Append the dropdowns to their respective containers
    seriesDropdownContainer.appendChild(seriesDropdown);
    modelsDropdownContainer.appendChild(modelsDropdown);
  }

  function displayProductImages(product) {
    // Clear existing content in the imageProductContainer
    imageProductContainer.innerHTML = "";

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

  function populateAndDisplayDocuments(product, selectedSeries) {
    // Populate otherDocsContainer with other documents for the selected series
    if (selectedSeries.otherDocs && selectedSeries.otherDocs.length > 0) {
      otherDocsContainer.innerHTML = `
            <div class="lit-item-title">${product.name}</div>
            <ul>
                ${selectedSeries.otherDocs
                  .map(
                    (doc) =>
                      `<li><a href="${doc.url}" target="_blank">${doc.type}</a></li>`
                  )
                  .join("")}
            </ul>
        `;
    } else {
      otherDocsContainer.innerHTML = "";
    }

    // Populate submittalsContainer with submittals for the selected series
    if (selectedSeries.submittals) {
      submittalsContainer.innerHTML = `
            <div class="lit-item-title">Submittals</div>
            <ul>
                ${selectedSeries.submittals
                  .map(
                    (submittal) =>
                      `<li><a href="${submittal.url}" target="_blank">${submittal.type}</a></li>`
                  )
                  .join("")}
            </ul>
        `;
    } else {
      submittalsContainer.innerHTML = "";
    }

    // Set initial state to hidden using the 'hidden' class
    otherDocsContainer.classList.add("hidden");
    submittalsContainer.classList.add("hidden");
  }

  literatureToggleButton.addEventListener("click", () => {
    const isHidden = otherDocsContainer.classList.contains("hidden");

    if (isHidden) {
      // Fade in
      otherDocsContainer.classList.remove("hidden", "fade-out");
      submittalsContainer.classList.remove("hidden", "fade-out");

      otherDocsContainer.classList.add("fade-in");
      submittalsContainer.classList.add("fade-in");
    } else {
      // Fade out
      otherDocsContainer.classList.remove("fade-in");
      submittalsContainer.classList.remove("fade-in");

      otherDocsContainer.classList.add("fade-out");
      submittalsContainer.classList.add("fade-out");

      // Set to hidden after animation completes
      setTimeout(() => {
        otherDocsContainer.classList.add("hidden");
        submittalsContainer.classList.add("hidden");
      }, 500); // Match this with the animation duration
    }
  });

  // Add the popstate event listener
  window.addEventListener("popstate", (event) => {
    // Check the event state for the previous state
    const previousState = event.state;

    // If the previous state exists and contains path information
    if (previousState && previousState.path) {
      // Update the URL to remove the product and series parameters
      const updatedUrl = "../pages/products.html"; // Remove the parameters
      window.history.pushState({ path: updatedUrl }, "", updatedUrl);
    }
  });

  function clearProductInfo() {
    const seriesDropdownContainer = productInfoContainer.querySelector(
      ".series-dropdown-container"
    );
    const modelsDropdownContainer = productInfoContainer.querySelector(
      ".models-dropdown-container"
    );
    const priceContainer =
      productInfoContainer.querySelector(".price-container");
    const displayedProductInfo = productInfoContainer.querySelector(
      ".displayed-product-info"
    );

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
