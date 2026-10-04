const issueNumber = document.body.dataset.issue;

const currentStatus = localStorage.getItem("issue" + issueNumber);

if (currentStatus === null) {
    localStorage.setItem("issue" + issueNumber, "in-progress");
}

window.addEventListener("scroll", function() {

    const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;

    if (atBottom) {
        localStorage.setItem("issue" + issueNumber, "finished");
    }

});
