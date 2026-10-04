const issueNumber = document.body.dataset.issue;

const statusKey = "issue" + issueNumber;
const positionKey = "issue" + issueNumber + "-position";


// Mark as in-progress if this is the first visit

const currentStatus = localStorage.getItem(statusKey);

if (currentStatus === null) {
    localStorage.setItem(statusKey, "in-progress");
}


// Restore previous reading position

const savedPosition = localStorage.getItem(positionKey);

if (savedPosition !== null) {
    window.scrollTo(0, Number(savedPosition));
}


// Save reading position while scrolling

window.addEventListener("scroll", function() {

    localStorage.setItem(positionKey, window.scrollY);

    const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

    if (atBottom) {
        localStorage.setItem(statusKey, "finished");
        localStorage.removeItem(positionKey);
    }

});
