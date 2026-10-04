fetch("issues.json")
    .then(response => response.json())
    .then(issues => {

        console.log(issues);

    });
