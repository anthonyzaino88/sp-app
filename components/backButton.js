class BackButton {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (this.container) {
            this.render();
        }
    }

    render() {
        const backButton = document.createElement('button');
        backButton.textContent = '← Go Back';
        backButton.className = 'back-button'; // Apply the CSS class
        backButton.addEventListener('click', () => window.history.back());
        this.container.appendChild(backButton);

        // Call addStyles method to apply styles
        this.addStyles();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .back-button {
                padding: 10px 12px 10px;
                color: #053658;
                border: none;
                cursor: pointer;
                font-size: 18px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
               
            }

            #back-button-container {
                position: fixed;
                bottom: 90px; /* Adjust as needed */
                left: 10px; /* Adjust as needed */
                z-index: 9997; /* Ensure it's above other elements */
                box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
            }
        `;
        document.head.appendChild(style);
    }
}
// Automatically instantiate the back button for a specific container
new BackButton('#back-button-container');
