const options = [
    {
        name: "Option 1",
        description: "This is the first option.",
        image_url: "https://via.placeholder.com/150"
    },
    {
        name: "Option 2",
        description: "This is the second option.",
        image_url: "https://via.placeholder.com/150"
    },
    {
        name: "Option 3",
        description: "This is the third option.",
        image_url: "https://via.placeholder.com/150"
    }
];

function setCookie(name, value) {
    document.cookie = `${name}=${value};path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

function renderOptions() {
    const optionsDiv = document.getElementById("options");
    options.forEach(option => {
        const optionDiv = document.createElement("div");
        optionDiv.innerHTML = `
            <h2>${option.name}</h2>
            <p>${option.description}</p>
            <img src="${option.image_url}" alt="${option.name}" />
            <br />
            <a href="selection.html" onclick="saveSelection('${option.name}')">Select</a>
        `;
        optionsDiv.appendChild(optionDiv);
    });
}

function saveSelection(optionName) {
    const option = options.find(o => o.name === optionName);
    const jsonOption = JSON.stringify(option);
    setCookie("selection", jsonOption);
}

function renderSelection() {
    const selectedOptionDiv = document.getElementById("selectedOption");
    const jsonOption = getCookie("selection");
    if (jsonOption) {
        const option = JSON.parse(jsonOption);
        selectedOptionDiv.innerHTML = `
            <h2>${option.name}</h2>
            <p>${option.description}</p>
            <img src="${option.image_url}" alt="${option.name}" />
        `;
    } else {
        selectedOptionDiv.textContent = "No option selected.";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("options")) {
        renderOptions();
    }
    if (document.getElementById("selectedOption")) {
        renderSelection();
    }
});
