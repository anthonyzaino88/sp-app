document.addEventListener("DOMContentLoaded", function () {
  const gridView = document.querySelector(".product-list-container"); // Product categories
  const modelView = document.createElement("div"); // Model selection
  modelView.classList.add("model-list-container");
  const seriesView = document.createElement("div"); // Series selection
  seriesView.classList.add("series-list-container");
  const seriesDetailsView = document.createElement("div"); // Individual series details
  seriesDetailsView.classList.add("series-details-container");

  document.body.appendChild(modelView);
  document.body.appendChild(seriesView);
  document.body.appendChild(seriesDetailsView);

  // Apply Styling to the Document
  const style = document.createElement("style");
  style.textContent = `
        .hidden { display: none; }
        .product-list-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 20px;
            padding: 20px;
            margin-top: 8rem;
            margin-bottom: 6rem;
        }
        .model-list-container, .series-list-container {
            display: flex;
            flex-direction: column;
            padding: 20px;
            margin-top: 5rem;
            margin-bottom: 6rem;
        }
        .product-item {
            cursor: pointer;
            border: 1px solid #ccc;
            border-radius: 10px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: whitesmoke;
            padding: 15px;
            box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
            transition: transform 0.2s ease-in-out;
            color: var(--primary-blue);
        }

        h3 {

            padding: 10px;
    font-size: 16px;
    text-align: center;
    background: whitesmoke;
    width: 100%;
    color: var(--primary-blue);
    height: 20px;

        }

        .model-item {
       
    border: 1px solid #ccc;
    padding: 10px;
    margin: 5px;
    cursor: pointer;
    background: whitesmoke;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
} 


.series-item {

display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background: whitesmoke;
    margin: 5px;

}
        
        .product-image, .series-item img, .model-item img {
            width: 100px;
            height: 100px;
            background-size: cover;
            background-position: center;
        }
        .back-button {
            padding: 10px;
            margin: 1rem;
            background-color: var(--primary-blue);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.3s;
        }
        .back-button:hover {
            background: var(--primary-red);
        }
        .series-details-container {
            padding: 20px;
            text-align: center;
        }
        .document-links h4 {
            margin-top: 15px;
            color: var(--primary-blue);
        }
        .document-links a {
            color: var(--primary-red);
            text-decoration: none;
            display: block;
            margin-top: 5px;
        }

        .buy-now-btn {
           font-size: 20px;
    padding: .5rem;
    text-decoration: none;
    background-color: var(--primary-blue);
    color: white;
    border-radius: 10px;

        }
    `;
  document.head.appendChild(style);

  let productsData = []; // Store fetched products

  // Fetch and Render Products
  fetch("../data/products.json")
    .then((response) => response.json())
    .then((products) => {
      productsData = products;
      renderProductGrid(products);
      checkUrlParams(); // Ensure correct navigation on page load
    });

  function renderProductGrid(products) {
    gridView.innerHTML = "";
    products.forEach((product) => {
      const firstSeries = product.series.length > 0 ? product.series[0] : null;
      const imageUrl =
        firstSeries && firstSeries.image
          ? firstSeries.image
          : "../assets/images/default-image.png";

      const productDiv = document.createElement("div");
      productDiv.classList.add("product-item");
      productDiv.innerHTML = `

                <img src="${imageUrl}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
            `;
      productDiv.addEventListener("click", () => {
        updateUrl(`?product=${encodeURIComponent(product.name)}`);
        showModelList(product);
      });
      gridView.appendChild(productDiv);
    });
  }

  function showModelList(product) {
    modelView.innerHTML = "";

    // Add Title
    const headerTitle = document.createElement("h2");
    headerTitle.className = "header-title";
    headerTitle.textContent = `Select a series for ${product.name}`;
    modelView.appendChild(headerTitle);

    modelView.appendChild(createBackButton("← Back to Categories", gridView));

    product.series.forEach((series) => {
      const modelDiv = document.createElement("div");
      modelDiv.classList.add("model-item");
      modelDiv.innerHTML = `
                <img src="${
                  series.image || "../assets/images/default-image.png"
                }" alt="${series.name}">
                <h3>${series.name}</h3>
            `;
      modelDiv.addEventListener("click", () => {
        updateUrl(
          `?product=${encodeURIComponent(
            product.name
          )}&series=${encodeURIComponent(series.name)}`
        );
        showSeriesList(product, series);
      });
      modelView.appendChild(modelDiv);
    });

    showView(modelView);
  }

  function showSeriesList(product, series) {
    seriesView.innerHTML = "";

    // Add Title
    const headerTitle = document.createElement("h2");
    headerTitle.className = "header-title";
    headerTitle.textContent = `Select a model from ${series.name}`;
    seriesView.appendChild(headerTitle);

    seriesView.appendChild(createBackButton("← Back to Models", modelView));

    if (!series.models || series.models.length === 0) {
      const noModelsWrapper = document.createElement("div");
      noModelsWrapper.className = "no-message";

      const noModelsMessage = document.createElement("p");
      noModelsMessage.innerHTML = `No models are available for this series. For more information, please contact our 
                <a href="mailto:custserv.jax@solerpalau.com">customer service department</a> or visit our configurator.`;

      const configuratorLink = document.createElement("a");
      configuratorLink.className = "no-message-cta";
      configuratorLink.href = "https://www.optisizer.com/Default.aspx";
      configuratorLink.textContent = "Visit our Configurator";

      noModelsWrapper.appendChild(noModelsMessage);
      noModelsWrapper.appendChild(configuratorLink);
      seriesView.appendChild(noModelsWrapper);

      showView(seriesView);
      return;
    }

    series.models.forEach((model) => {
      const seriesDiv = document.createElement("div");
      seriesDiv.classList.add("series-item");

      seriesDiv.addEventListener("click", () => {
        updateUrl(
          `?product=${encodeURIComponent(
            product.name
          )}&series=${encodeURIComponent(
            series.name
          )}&model=${encodeURIComponent(model.name)}`
        );
        showSeriesDetails(product, series, model);
      });

      seriesDiv.innerHTML = `
                <div style="display: flex; align-items: center; flex: 1;">
                    <img src="${model.image || series.image}" alt="${
        model.name
      }" style="height: 80px; width: auto; margin-right: 15px;">
                    <div class="model-info">
                        <p style="font-size: 20px; font-weight: 700; margin-bottom: .25rem;">${
                          model.name
                        }</p>
                        <p style="margin-top: .25rem; font-size: 18px;">${
                          model.price || "N/A"
                        }</p>
                    </div>
                </div>
                <a href="https://www.optisizer.com/Default.aspx" target="_blank" class="buy-now-btn">BUY NOW</a>
            `;

      seriesView.appendChild(seriesDiv);
    });

    showView(seriesView);
  }

  function showSeriesDetails(product, series, model) {
    seriesDetailsView.innerHTML = "";

    // Add Title
    const headerTitle = document.createElement("h2");
    headerTitle.className = "header-title";
    headerTitle.textContent = `Details for ${model.name}`;
    seriesDetailsView.appendChild(headerTitle);

    seriesDetailsView.appendChild(
      createBackButton("← Back to Series", seriesView)
    );

    const submittalsHtml = renderLinks(series.submittals);
    const otherDocsHtml = renderLinks(series.otherDocs);

    seriesDetailsView.innerHTML += `
            <h2>${product.name} - ${series.name}</h2>
            <p>${series.description}</p>
            <p>Model: ${model.name} | Price: ${model.price || "N/A"}</p>
            <div class="document-links">
                <h4>Submittals</h4> ${submittalsHtml}
                <h4>Other Documents</h4> ${otherDocsHtml}
            </div>
        `;

    showView(seriesDetailsView);
  }

  function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get("product");
    const seriesName = urlParams.get("series");
    const modelName = urlParams.get("model");

    // Hide all views before restoring the correct one
    [gridView, modelView, seriesView, seriesDetailsView].forEach(
      (view) => (view.style.display = "none")
    );

    if (!productName) {
      gridView.style.display = "grid"; // Show categories properly
      return;
    }

    const product = productsData.find((p) => p.name === productName);
    if (!product) return;

    if (seriesName) {
      const series = product.series.find((s) => s.name === seriesName);
      if (!series) return;

      if (modelName) {
        const model = series.models.find((m) => m.name === modelName);
        if (model) showSeriesDetails(product, series, model);
      } else {
        showSeriesList(product, series); // ✅ Ensures "Back to Series" works
      }
    } else {
      showModelList(product);
    }
  }

  function showView(view) {
    [gridView, modelView, seriesView, seriesDetailsView].forEach(
      (v) => (v.style.display = "none")
    );
    view.style.display = "block";
  }

  function createBackButton(text, targetView) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add("back-button");
    button.addEventListener("click", () => {
      history.back(); // Go back in browser history
      setTimeout(() => checkUrlParams(), 100); // Check URL to restore correct view
    });
    return button;
  }

  function updateUrl(path) {
    history.pushState({}, "", path);
  }

  window.onpopstate = () => checkUrlParams();

  function renderLinks(links) {
    return links && links.length
      ? links
          .map(
            (link) => `<a href="${link.url}" target="_blank">${link.type}</a>`
          )
          .join("<br>")
      : "<p>No documents available</p>";
  }
});
