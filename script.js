// Grab elements from DOM
const container = document.getElementById("extension-list");
const extensionCard =
  // Grab data from JSON
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      // Output data

      console.log(data);
    })
    .catch((error) => console.error("Failed to load JSON", error));

console.log(data);
