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
        const cardHeader = document.createElement("div");
        const cardText = document.createElement("div");
        const cardFooter = document.createElement("div");
        const extName = document.createElement("h4");
        const extDesc = document.createElement("p");
        const icon = document.createElement("img");

        // Customize card component
        card.className = "extension-card";
        cardHeader.className = "card-header";
        icon.className = "icon";

        // Get extension name
        extName.textContent = data[i].name;
        extDesc.textContent = data[i].description;

        icon.src = data[i].logo;

        cardText.appendChild(extName);
        cardText.appendChild(extDesc);
        cardHeader.appendChild(icon);
        cardHeader.appendChild(cardText);
        card.appendChild(cardHeader);
        card.appendChild(cardFooter);
        container.appendChild(card);
      }
    })
    .catch((error) => console.error("Failed to load JSON", error));
