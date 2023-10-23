class LibraryComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.categories = []; // Store categories and their documents
    this.selectedCategory = null; // Store the currently selected category

    this.render();
    this.loadJSONData(); // Load JSON data (replace with your data loading logic)
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Add your CSS styles here */

        .categories-outer {
          position: sticky;
          top: 0;
          left: 0;
          overflow-x: auto; /* Add horizontal scrollbar if needed */
        }

        .categories {
          display: flex;
          flex-wrap: wrap;
          margin-top: 8rem;
          justify-content: center;
        }

        a {
          text-decoration: none;
          color: #053658;
        }
       

        .category {
          cursor: pointer;
          padding: 10px;
          margin: 5px;
          background-color: whitesmoke;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 185px;
          font-size: 18px;
          transition: width 0.3s ease; /* Smooth transition for category buttons */
        }
        
        /* Set height when .categories.selected is active */
        .categories.selected .category {
           height: 100%;
           width: 100%;
           display: flex;
           text-wrap: nowrap;
           text-align: center;
           align-content: center;
           flex-wrap: wrap;
        }
        
        /* Set height when .categories.selected is not active */
        .categories:not(.selected) .category {
          height: 120px;
        }


        .category:hover {
          opacity: 0.7;
        }
        .categories.selected {
          display: flex;
          justify-content: flex-start;
          flex-wrap: nowrap; /* No wrap for categories */
          overflow-x: auto; /* Horizontal scroll */
          scroll-snap-type: x mandatory; /* Scroll snap to start */
          transition: width 0.3s ease, height 0.3s ease; /* Smooth transition for categories */
        
        }

        .category.active {
          background-color: #053658;
          color: whitesmoke;
        }

        .documents {
          margin-top: 2rem;
          margin-bottom: 6rem;
          transition: max-height 0.3s ease; /* Smooth transition for documents container */
          overflow-y: auto;
        }
        .documents.active {
          margin-top: 2rem;
          height: 450px;
          transition: max-height 0.3s ease;
          overflow-y: auto;
          margin-bottom: 6rem;
        }
        .document {
          flex: 1;
          min-width: calc(50% - 10px);
          padding: 10px;
          background-color: whitesmoke;
          border: 1px solid #ddd;
        }
      </style>
      <div class="categories-outer">
      <div class="categories"></div>
      </div>
      <div class="documents"></div>
    `;


    this.categoryContainerOuter = this.shadowRoot.querySelector('.categories-outer');    
    this.categoryContainer = this.shadowRoot.querySelector('.categories');
    this.documentsContainer = this.shadowRoot.querySelector('.documents');
  }

  loadJSONData() {
    // Replace with your JSON URL
    const jsonURL = '../data/documents.json';

    fetch(jsonURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        this.categories = jsonData.categories;
        this.renderCategories();
      })
      .catch((error) => {
        console.error('Error fetching or processing JSON data:', error);
      });
  }

  renderCategories() {
    this.categoryContainer.innerHTML = '';

    for (const category of this.categories) {
      const categoryButton = document.createElement('button');
      categoryButton.classList.add('category');
      categoryButton.textContent = category.name;
      categoryButton.addEventListener('click', () => this.toggleCategory(categoryButton, category));
      this.categoryContainer.appendChild(categoryButton);
    }
  }
  
  toggleCategory(categoryButton, category) {
    const categoriesContainer = this.categoryContainer;
    const documentsContainer = this.documentsContainer;
  
    // Remove 'active' class from all category buttons
    const categoryButtons = this.shadowRoot.querySelectorAll('.category');
    categoryButtons.forEach((button) => button.classList.remove('active'));
  
    if (categoriesContainer.classList.contains('selected') && this.selectedCategory === category) {
      // If the same category is selected again, remove the 'selected' class
      categoriesContainer.classList.remove('selected');
      documentsContainer.classList.remove('active');
      this.selectedCategory = null;
    } else {
      // Otherwise, add 'selected' class to the categories container
      categoriesContainer.classList.add('selected');
      documentsContainer.classList.add('active');
      this.selectedCategory = category;
  
      // Add 'active' class to the category button
      categoryButton.classList.add('active');
    }
  
    this.renderDocuments();
  }
  
  
  renderDocuments() {
    this.documentsContainer.innerHTML = '';

    if (this.selectedCategory && this.selectedCategory.items && Array.isArray(this.selectedCategory.items)) {
      const documents = this.selectedCategory.items;
      let documentsHTML = '';

      for (const document of documents) {
        if (document.link && document.name) {
          documentsHTML += `
            <div class="document">
              <a href="${document.link}" target="_blank">
                <h3>${document.name}</h3>
                <p>${document.description || ''}</p>
              </a>
            </div>
          `;
        } else {
          console.error('Invalid document data:', document);
        }
      }

      this.documentsContainer.innerHTML = documentsHTML;
    }
  }
}

customElements.define('library-component', LibraryComponent);
