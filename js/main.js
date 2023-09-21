
const container = document.getElementById("products-list-container");
fetch("./pages/products.html")
    .then((response) => response.text())
    .then((html) => {
        container.innerHTML = html;
    })
    .catch((error) => {
        console.error("Error fetching component:", error);
    });