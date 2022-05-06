"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    let title = new URLSearchParams(window.location.search).get('title').replaceAll("~", " ");

    document.querySelector("#pagetitle").innerHTML = title;

    fetch("assets/json/artikels.json")
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            loadArticle(jsondata, title);
        });
}

function loadArticle(data, title) {
    let article = getArticleByTitle(data, title);

    document.querySelector("#article").innerHTML += `
        <article>
            <div class="topText">
            <h1>${title}</h1>
            <img src="assets/images/articles/${article.logo}" alt="" id="logo">
                <div>
                    <p>${article.date} - ${article.location}</p>
                    <p>${article.frequency} georganiseerd door ${article.organiser} voor ${article.audience}</p>
                </div>
            </div>
            <hr>
            <div class="description">
                ${generateText(article.text)}
                
                <div class="experience">
                    <div>
                        <h3>Positive points</h3>
                        <ul>${generateList(article.experience.positivePoints)}</ul>
                    </div>
                    <div>
                        <h3>Negative points</h3>
                        <ul>${generateList(article.experience.negativePoints)}</ul>
                    </div>
                </div>
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

        } else if (block.includes("@LIST-")) {

            let items = block.split("@LIST-")[1].split(" ~ ");
            output += `<ul>`;
            items.forEach(item => {
                output += `<li>${item}</li>`;
            })
            output += `</ul>`;

        } else {
            output += `<p>${block}</p>`
        }
    }

    return output;
}

function generateList(points) {
    let output = ``;

    for (let pointIndex in points) {
        output += `<li>${points[pointIndex]}</li>`;
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
