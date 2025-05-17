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
        const removeBtn = document.createElement("button");

        // Creating a toggle
        const labelSwitch = document.createElement("label");
        const inputCheckbox = document.createElement("input");
        const spanSlider = document.createElement("span");

        labelSwitch.appendChild(inputCheckbox);
        labelSwitch.appendChild(spanSlider);

        // Add class for toggle
        labelSwitch.className = "switch";
        inputCheckbox.className = "checkbox";
        inputCheckbox.type = "checkbox";
        spanSlider.className = "slider round";

        // Customize card component
        card.className = "extension-card";
        cardHeader.className = "card-header";
        cardFooter.className = "card-footer";
        icon.className = "icon";
        removeBtn.className = "btn-remove"

        // Get extension name
        extName.textContent = data[i].name;
        extDesc.textContent = data[i].description;
        removeBtn.textContent = "Remove";

        icon.src = data[i].logo;

        cardText.appendChild(extName);
        cardText.appendChild(extDesc);
        cardHeader.appendChild(icon);
        cardHeader.appendChild(cardText);
        cardFooter.appendChild(removeBtn);
        cardFooter.appendChild(labelSwitch);
        card.appendChild(cardHeader);
        card.appendChild(cardFooter);
        container.appendChild(card);

        /* When the button is pressed, remove the extension div */
        document.querySelectorAll('.btn-remove').forEach(button => {
          button.addEventListener('click', function(e) {
            e.currentTarget.parentNode.parentNode.remove();
          })
        });
      }
    })
    .catch((error) => console.error("Failed to load JSON", error));
