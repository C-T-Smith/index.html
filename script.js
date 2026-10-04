fetch("issues.json")
    .then(response => response.json())
    .then(issues => {
        document.querySelector("h2").textContent =
            "Found " + issues.length + " issues!";
    });
