class ProductGrid extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
        this.fetchProducts();
    }

    async fetchProducts() {
        try {
            const response = await fetch('../data/products.json');
            const products = await response.json();
            this.renderProducts(products);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            this.shadowRoot.innerHTML = `<p>Error loading products.</p>`;
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .hidden { display: none; }

                .product-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                    gap: 20px;
                    padding: 20px;
                    margin-top: 8rem;
                    margin-bottom: 6rem;
                }
                .product-listing {
                    cursor: pointer;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    overflow: hidden;
                    display: flex;
                    align-self: center;
                    flex-direction: column;
                    align-items: center;
                    background: whitesmoke;
                    padding: 10px;
                    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
                    height: 150px;
                }
                .product-image {
                    width: 100px; /* Ensures the image covers the width */
                    height: 100px; /* Fixed height for all images */
                    background-size: cover;
                    background-position: center;
                }
                .product-title {
                    padding: 10px;
                    font-size: 16px; /* Adjust font size as needed */
                    text-align: center;
                    background: whitesmoke;
                    width: 100%; /* Text covers the width */
                    color: var(--primary-blue);
                    height: 20px;

                }

                .models-container {
                    margin-top: 8rem;
                }
            </style>
    
            <div class="product-wrapper">
                <div class="product-grid"></div>
            </div>
        `;
    }

    renderProducts(products) {
        const grid = this.shadowRoot.querySelector('.product-grid');
        products.forEach(product => {
            const productListing = document.createElement('div');
            productListing.className = 'product-listing';

            const productImage = document.createElement('div');
            productImage.className = 'product-image';
            productImage.style.backgroundImage = `url('${product.series[0]?.image}')`;
            productListing.appendChild(productImage);

            const productTitle = document.createElement('div');
            productTitle.className = 'product-title';
            productTitle.textContent = product.name;
            productListing.appendChild(productTitle);

            productListing.onclick = () => {
                this.selectProduct(product);
                this.shadowRoot.querySelector('.product-wrapper').classList.add('hidden');
            };
            
            grid.appendChild(productListing);
        });
    }

    selectProduct(product) {
        console.log("Dispatching product-selected event for product:", product);
        this.dispatchEvent(new CustomEvent('product-selected', {
            detail: { product: product },
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('product-grid', ProductGrid);
