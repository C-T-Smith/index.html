fetch("issues.json")
    .then(response => response.json())
    .then(issues => {

        const issueContainer = document.getElementById("issues");
        const continueContainer = document.getElementById("continue-reading");
        const searchBox = document.getElementById("search");

        function createCard(issue) {

            const card = document.createElement("div");
            card.className = "magazine-card";

            card.innerHTML = `
                <a href="${issue.file}">
                    <h3>Issue #${issue.number}</h3>
                    <img src="${issue.cover}">
                    <p class="card-description">${issue.description}</p>
                </a>
            `;

            return card;
        }

        function displayIssues(issueList) {

            issueContainer.innerHTML = "";

            issueList.forEach(function(issue) {
                issueContainer.appendChild(createCard(issue));
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


        // CONTINUE READING

        const unfinishedIssues = issues.filter(function(issue) {

            return localStorage.getItem("issue" + issue.number) === "in-progress";

        });

        unfinishedIssues.forEach(function(issue) {

            continueContainer.appendChild(createCard(issue));

        });

    });
