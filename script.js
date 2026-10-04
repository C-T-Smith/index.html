fetch("issues.json")
    .then(response => response.json())
    .then(issues => {

        const issueContainer = document.getElementById("issues");
        const continueContainer = document.getElementById("continue-reading");
        const connectedContainer = document.getElementById("connected-stories");
        const standaloneContainer = document.getElementById("standalone-stories");
        const searchBox = document.getElementById("search");


        // Create one magazine card

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


        // Put a list of issues into a shelf

        function displayIssues(container, issueList) {

            container.innerHTML = "";

            issueList.forEach(function(issue) {
                container.appendChild(createCard(issue));
            });

        }


        // --------------------------------
        // LATEST RELEASES
        // --------------------------------

        const latestIssues = [...issues].sort(function(a, b) {
            return b.number - a.number;
        });

        displayIssues(issueContainer, latestIssues);


        // --------------------------------
        // CONTINUE READING
        // --------------------------------

        const unfinishedIssues = issues
            .filter(function(issue) {
                return localStorage.getItem("issue" + issue.number) === "in-progress";
            })
            .sort(function(a, b) {
                return b.number - a.number;
            });

        displayIssues(continueContainer, unfinishedIssues);


        // --------------------------------
        // CONNECTED STORIES
        // --------------------------------

        const connectedIssues = issues
            .filter(function(issue) {
                return issue.series !== null;
            })
            .sort(function(a, b) {
                return b.number - a.number;
            });

        displayIssues(connectedContainer, connectedIssues);


        // --------------------------------
        // STANDALONE STORIES
        // --------------------------------

        const standaloneIssues = issues
            .filter(function(issue) {
                return issue.series === null;
            })
            .sort(function(a, b) {
                return b.number - a.number;
            });

        displayIssues(standaloneContainer, standaloneIssues);


        // --------------------------------
        // SEARCH
        // --------------------------------

        searchBox.addEventListener("input", function() {

            const searchTerm = searchBox.value.toLowerCase();

            const matchingIssues = issues.filter(function(issue) {

                return (
                    issue.title.toLowerCase().includes(searchTerm) ||
                    issue.description.toLowerCase().includes(searchTerm) ||
                    issue.number.toString().includes(searchTerm)
                );

            });

            displayIssues(issueContainer, matchingIssues);

        });

    });
