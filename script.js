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
        removeBtn.className = "btn-remove";

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
        inputCheckbox.addEventListener("change", () => {
          card.dataset.active = inputCheckbox.checked ? "true" : "false";
          applyFilter();
        });

        /* When the button is pressed, remove the extension div */
        document.querySelectorAll(".btn-remove").forEach((button) => {
          button.addEventListener("click", function (e) {
            e.currentTarget.parentNode.parentNode.remove();
          });
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

// Grab SVG icons for Light/dark mode and store in constants
const lightIcon = document.getElementById("light-icon");
const darkIcon = document.getElementById("dark-icon");

// Check if dark mode is preferred system-wide
const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
let darkMode = darkModeMediaQuery.matches;

// Function to apply the theme (class and icon visibility)
function applyTheme(isDarkMode) {
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode"); // In case you add a light-mode class
    lightIcon.style.display = "none"; // Hide sun icon
    darkIcon.style.display = "block"; // Show moon icon
    document.documentElement.style.colorScheme = "dark";
  } else {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode"); // In case you add a light-mode class
    lightIcon.style.display = "block"; // Show sun icon
    darkIcon.style.display = "none"; // Hide moon icon
    document.documentElement.style.colorScheme = "light";
  }
}

// Set initial theme based on system preference or stored preference
applyTheme(darkMode);

// Listen for changes in system preference (optional, but good for UX)
darkModeMediaQuery.addEventListener("change", (e) => {
  darkMode = e.matches;
  applyTheme(darkMode);
});

/// Toggle dark mode on button click
function toggleLightMode() {
  // Corrected function name
  darkMode = !darkMode; // Toggle the state
  applyTheme(darkMode);
  // Optional: Store user's preference in localStorage
  // localStorage.setItem('theme', darkMode ? 'dark' : 'light');
}

// Optional: Check localStorage for saved theme preference on load
/*
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  darkMode = savedTheme === 'dark';
  applyTheme(darkMode);
}
*/
