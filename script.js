// Grab elements from DOM
const container = document.getElementById("extension-list");
const extensionCard =
  // Grab data from JSON
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      // Output data
      for (let i = 0; i < data.length; i++) {
        const card = document.createElement("article");
        const extName = document.createElement("h4");
        const extDesc = document.createElement("p");

        // Customize card component
        card.className = "extension-card";

        // Get extension name
        extName.textContent = data[i].name;
        extDesc.textContent = data[i].description;

        card.appendChild(extName);
        card.appendChild(extDesc);
        container.appendChild(card);
      }
    })
    .catch((error) => console.error("Failed to load JSON", error));
