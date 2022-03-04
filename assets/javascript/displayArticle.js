"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    let title = new URLSearchParams(window.location.search).get('title').replace("~", " ");

    document.querySelector("#pagetitle").innerHTML = title;

    fetch("./artikels.json")
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            loadArticle(jsondata, title);
        });
}

function loadArticle(data, title) {
    let article = getArticleByTitle(data, title);

    document.querySelector("#articles").innerHTML += `
        <article>
            <div class="topText">
            <h1>${title}</h1>
                <div>
                    <p>${article.date} - ${article.location}</p>
                    <p>${article.frequency} georganiseerd door ${article.organiser} voor ${article.audience}</p>
                </div>
                <img src="assets/images/articles/${article.logo}" alt="" id="logo">
            </div>
            <hr>
            <div class="description">
                ${generateText(article.text)}
            </div>
        </article>
        `
}

function generateText(textArray) {
    let output = ``;

    for (let blockIndex in textArray) {
        let block = textArray[blockIndex];
        if (block.includes("@IMAGE-")) {
            let image = "assets/images/articles/" + block.split("@IMAGE-")[1];
            output += `<img src="${image}" alt="${image}">`;
        } else {
            output += `<p>${block}</p>`
        }
    }

    return output;
}

function getArticleByTitle(data, title) {
    let output = null;
    data.forEach(part => {
        if (part.title === title) output = part;
    });

    return output;
}