
class SeriesSelector extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.products = [];
        this.initializeStyles(); // Call this in the constructor to ensure styles are set up initially.
    }

    initializeStyles() {
        const style = document.createElement('style');
        style.textContent = `
        .series-container {
            display: flex;
            flex-direction: column;
            padding: 20px;
            margin-bottom: 6rem;
        
        }
        
        .series-item {
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
        
        .series-item img {
            width: 100px;
        }
        
        .series-title {
            color: var(--primary-blue);
            font-size: 20px;
        } 
        
        .header-title {
            margin-top: 8.5rem;
            padding-left: 1rem;
            color: var(--primary-red);
            font-size: 28px;
            font-weight: 500;
        }
        
        .models-container {
            display: flex;
            flex-direction: column;
            padding: 10px;
            margin-bottom: 6rem;
        }
        
        .model-item {
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
        
        .model-item a {
            font-size: 20px;
            padding: .5rem;
            text-decoration: none;
            background-color: var(--primary-blue);
            color: white;
            border-radius: 10px;
           
            }
        
        
            .input-wrapper {
                display: flex;
                justify-content: space-evenly;
                
        
            }
        
        
            .search-input {
                padding: 10px;
                font-size: 16px;
                margin-bottom: 10px;
                width: 90%;
                border-radius: 10px;
                border: 1px #ccc solid;
                box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
            }

            .no-message {
                padding: 1rem;
            }

            .no-message-cta {
                font-size: 20px;
                padding: .5rem;
                text-decoration: none;
                background-color: var(--primary-blue);
                color: white;
                text-align: center;
                border-radius:8px;
                margin-top: 2rem;

            }
        
        }
        `;
        this.shadowRoot.appendChild(style);
    }

    connectedCallback() {
        this.fetchProducts();
        document.addEventListener('product-selected', event => this.handleProductSelection(event));
    }

    async fetchProducts() {
        try {
            const response = await fetch('../data/products.json');
            if (!response.ok) throw new Error('Failed to fetch products');
            this.products = await response.json();
        } catch (error) {
            console.error('Failed to load data:', error);
            this.shadowRoot.innerHTML = `<p>Error loading product data: ${error.message}</p>`;
        }
    }

    handleProductSelection(e) {
        const productId = e.detail.product.id;
        const product = this.products.find(p => p.id === productId);
        if (product && product.series) {
            this.renderSeries(product.series);
        } else {
            this.shadowRoot.innerHTML = `<p>No series found for this product.</p>`;
        }
    }

    renderSeries(series) {
        this.removeExistingContainers();
        const headerTitle = document.createElement('h2');
        headerTitle.className = 'header-title';
        headerTitle.textContent = 'Select a series below';
        this.shadowRoot.appendChild(headerTitle);

        const seriesContainer = document.createElement('div');
        seriesContainer.className = 'series-container';

        series.forEach(s => {
            const seriesItem = document.createElement('div');
            seriesItem.className = 'series-item';
            seriesItem.innerHTML = `
                <img src="${s.image}" alt="${s.name}">
                <div class="series-title">${s.name}</div>
            `;
            seriesItem.addEventListener('click', () => this.selectSeries(s));
            seriesContainer.appendChild(seriesItem);
        });

        this.shadowRoot.appendChild(seriesContainer);
    }

    selectSeries(series) {
        this.removeExistingContainers();
        const headerTitle = document.createElement('h2');
        headerTitle.className = 'header-title';
        headerTitle.textContent = `${series.name} - Models`;
        this.shadowRoot.appendChild(headerTitle);

        if (!series.models || series.models.length === 0) {
            // Create a wrapper for the no models message
            const noModelsWrapper = document.createElement('div');
            noModelsWrapper.className = 'no-message';
        
            // Create the message paragraph inside the wrapper
            const noModelsMessage = document.createElement('p');
        
            // Create the text before the email link
            const messageText = document.createTextNode(
                "No models are available for this series. For more information, please contact our "
            );
        
            // Create the email link element
            const emailLink = document.createElement('a');
            emailLink.href = "mailto:custserv.jax@solerpalau.com"; // Change to actual email
            emailLink.textContent = "customer service department";
        
            // Create the text after the email link
            const afterText = document.createTextNode(" or visit our configurator.");
        
            // Append everything in order
            noModelsMessage.appendChild(messageText);
            noModelsMessage.appendChild(emailLink);
            noModelsMessage.appendChild(afterText);
            noModelsWrapper.appendChild(noModelsMessage);
        
            // Optionally, add a CTA link to the product configurator
            const configuratorLink = document.createElement('a');
            configuratorLink.className = 'no-message-cta';
            configuratorLink.href = 'https://www.optisizer.com/Default.aspx';
            configuratorLink.textContent = 'Visit our Configurator';
            configuratorLink.style.display = 'block'; // Display link on a new line
            noModelsWrapper.appendChild(configuratorLink);
        
            // Append the no models wrapper to the shadow DOM
            this.shadowRoot.appendChild(noModelsWrapper);
        
            return;
        }
        

        // If models are available, proceed with normal setup
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'input-wrapper';

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search models...';
        searchInput.className = 'search-input';

        inputWrapper.appendChild(searchInput);
        this.shadowRoot.appendChild(inputWrapper);

        const modelsContainer = document.createElement('div');
        modelsContainer.className = 'models-container';
        series.models.forEach(model => {
            const modelItem = this.createModelItem(model, series);
            modelsContainer.appendChild(modelItem);
        });
        this.shadowRoot.appendChild(modelsContainer);

        // Add event listener for the search input
        searchInput.addEventListener('input', () => {
            const searchText = searchInput.value.toLowerCase();
            Array.from(modelsContainer.children).forEach(modelItem => {
                const modelName = modelItem.querySelector('.model-info').textContent.toLowerCase();
                modelItem.style.display = modelName.includes(searchText) ? 'flex' : 'none';
            });
        });
    }


    createModelItem(model, series) {
        const modelItem = document.createElement('div');
        modelItem.className = 'model-item';
        modelItem.innerHTML = `
            <img src="${model.image || series.image}" alt="${model.name}" style="height: 80px; width: auto;">
            <div class="model-info">
                <p style="font-size: 20px; font-weight: 700; margin-bottom: .25rem;">${model.name}</p>
                <p style="margin-top: .25rem; font-size: 18px;">${model.price}</p>
            </div>
            <a href="https://www.optisizer.com/Default.aspx" target="_blank" ><span>Order Now</span></a>
        `;
        return modelItem;
    }

    removeExistingContainers() {
        const existingContainers = this.shadowRoot.querySelectorAll('.series-container, .models-container, .header-title');
        existingContainers.forEach(container => container.remove());
    }
}
customElements.define('series-selector', SeriesSelector);


