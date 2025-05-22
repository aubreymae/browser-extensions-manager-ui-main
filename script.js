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
        extDesc.className = "extension-description";

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

        // Include data attribute for filtering for each card
        card.dataset.active = inputCheckbox.checked ? "true" : "false";

        /* When the toggle is pressed, turn on the extension */
        inputCheckbox.addEventListener('change', () => {
          card.dataset.active = inputCheckbox.checked ? "true" : "false";
          applyFilter();
        })

        /* When the button is pressed, remove the extension div */
        document.querySelectorAll('.btn-remove').forEach(button => {
          button.addEventListener('click', function(e) {
            e.currentTarget.parentNode.parentNode.remove();
          })
        });
      }

      setupFilters();
    })
    .catch((error) => console.error("Failed to load JSON", error));

// Filtering logic
function setupFilters() {
  const checkboxAll = document.getElementById("checkbox1");
  const checkboxActive = document.getElementById("checkbox2");
  const checkboxInactive = document.getElementById("checkbox3");

  function applyFilter() {
    const cards = document.querySelectorAll(".extension-card");
    const showAll = checkboxAll.checked;
    const showActive = checkboxActive.checked;
    const showInactive = checkboxInactive.checked;

    cards.forEach((card) => {
      const isActive = card.dataset.active === "true";

      if (showAll) {
        card.style.display = "flex";
      } else if (showActive && isActive) {
        card.style.display = "flex";
      } else if (showInactive && !isActive) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Ensure only one checkbox is selected at a time
  [checkboxAll, checkboxActive, checkboxInactive].forEach((cb) => {
    cb.addEventListener("change", () => {
      [checkboxAll, checkboxActive, checkboxInactive].forEach((other) => {
        if (other !== cb) other.checked = false;
      });
      applyFilter();
    });
  });

  // Default to "All" checked
  checkboxAll.checked = true;
  applyFilter();
}