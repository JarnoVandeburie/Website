"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    let checkbox = document.querySelector("#compact");
    checkbox.addEventListener("change", changeCompact);

    fetch("assets/json/artikels.json")
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            loadArticles(jsondata);
            document.querySelectorAll(".titleShort").forEach(title => title.addEventListener('click', redirect));
        });
}

function redirect(e) {
    let title = (e.target.innerText).replaceAll(" ", "~");
    window.location = 'info_artikel.html?title=' + title;
}

function loadArticles(data) {
    let oldestFirst = false; //temp

    data.sort(function(a,b) {
        a = a.date.split('/').reverse().join('');
        b = b.date.split('/').reverse().join('');
        if (oldestFirst) {
            return a > b ? 1 : a < b ? -1 : 0;
        } else {
            return a < b ? 1 : a > b ? -1 : 0;
        }
    });   

    generateArticles(data)
}

function generateArticles(data) {
    let articleContainer = document.querySelector("#articles");

    for (let index in data) {
        if (data.hasOwnProperty(index))

        articleContainer.innerHTML += `
        <article>
            <div class="topText">
            <h1 class="titleShort">${data[index].title}</h1>
            <div class="logo"><img src="assets/images/articles/${data[index].logo}" alt="logo"></div>
                <div>
                    <p>${data[index].date} - ${data[index].location}</p>
                    <p>${data[index].frequency == "" ? "Georganiseerd" : data[index].frequency + " georganiseerd"} door ${data[index].organiser} voor ${data[index].audience}</p>
                    <p>${data[index].description}</p>
                </div>
            </div>
        </article>
        `
    }
}


function changeCompact(e) {
    if (e.target.checked) {
        document.querySelectorAll("article").forEach(item => item.classList.add("compact"));
    } else {
        document.querySelectorAll("article").forEach(item => item.classList.remove("compact"));
    }
}
