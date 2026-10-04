fetch("issues.json")
    .then(response => response.json())
    .then(issues => {

        const issueContainer = document.getElementById("issues");
        const searchBox = document.getElementById("search");

        function displayIssues(issueList) {

            issueContainer.innerHTML = "";

            issueList.forEach(function(issue) {

                const card = document.createElement("div");
                card.className = "magazine-card";

                card.innerHTML = `
                    <a href="${issue.file}">
                        <h3>Issue #${issue.number}</h3>
                        <img src="${issue.cover}">
                        <p class="card-description">${issue.description}</p>
                    </a>
                `;

                issueContainer.appendChild(card);
            });
        }

        displayIssues(issues);

        searchBox.addEventListener("input", function() {

            const searchTerm = searchBox.value.toLowerCase();

            const matchingIssues = issues.filter(function(issue) {

                return (
                    issue.title.toLowerCase().includes(searchTerm) ||
                    issue.description.toLowerCase().includes(searchTerm) ||
                    issue.number.toString().includes(searchTerm)
                );

            });

            displayIssues(matchingIssues);
        });

    });
