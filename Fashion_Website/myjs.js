document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.querySelector(".search-bar");
  const productList = document.querySelector(".product-list");

  // Event listener for the search bar
  searchBar.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const query = searchBar.value.trim();
      if (query) {
        productList.innerHTML = ""; // Clear existing results
        fetchProducts(query);
      }
    }
  });

  // Fetch products from all sources
  function fetchProducts(query) {
    fetchAmazonProducts(query);
    fetchWalmartProducts(query);
    fetchFlipkartProducts(query);
  }

  // Fetch products from Amazon
  function fetchAmazonProducts(query) {
    const amazonApiUrl = `https://api.amazon.com/products?search=${query}&api_key=YOUR_AMAZON_API_KEY`;
    fetch(amazonApiUrl)
      .then((response) => response.json())
      .then((data) => displayProducts(data, "Amazon"))
      .catch((error) =>
        console.error("Error fetching Amazon products:", error)
      );
  }

  // Fetch products from Walmart
  function fetchWalmartProducts(query) {
    const walmartApiUrl = `https://api.walmartlabs.com/v1/search?query=${query}&format=json&apiKey=YOUR_WALMART_API_KEY`;
    fetch(walmartApiUrl)
      .then((response) => response.json())
      .then((data) => displayProducts(data.items, "Walmart"))
      .catch((error) =>
        console.error("Error fetching Walmart products:", error)
      );
  }

  // Fetch products from Flipkart
  function fetchFlipkartProducts(query) {
    const flipkartApiUrl = `https://affiliate-api.flipkart.net/affiliate/search/json?query=${query}&resultCount=5&access_token=YOUR_FLIPKART_ACCESS_TOKEN`;
    fetch(flipkartApiUrl, {
      headers: {
        "Fk-Affiliate-Id": "YOUR_FLIPKART_AFFILIATE_ID",
        "Fk-Affiliate-Token": "YOUR_FLIPKART_AFFILIATE_TOKEN",
      },
    })
      .then((response) => response.json())
      .then((data) => displayProducts(data.productInfoList, "Flipkart"))
      .catch((error) =>
        console.error("Error fetching Flipkart products:", error)
      );
  }

  // Display products on the page
  function displayProducts(products, source) {
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      const productName = product.name || product.title;
      const productPrice = product.price || product.salePrice || "Varies";
      const productImage =
        product.image || product.largeImage || "placeholder.png";
      const productUrl =
        product.link ||
        product.productUrl ||
        product.productBaseInfoV1.productUrl;

      productCard.innerHTML = `
                <img src="${productImage}" alt="${productName}">
                <p>${productName}</p>
                <p class="price">${productPrice}</p>
                <a href="${productUrl}" target="_blank">Buy on ${source}</a>
            `;

      productList.appendChild(productCard);
    });
  }
});
fetch("https://93a5-35-204-249-164.ngrok-free.app", {
  method: "POST",
  body: formData,
});

function openSearchPage() {
  window.location.href = "searchbar.html"; // Redirect to search page
}
