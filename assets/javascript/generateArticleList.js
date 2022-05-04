"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    let checkbox = document.querySelector("#compact");
    checkbox.addEventListener("change", changeCompact);

    fetch("./artikels.json")
        .then(response => {
            console.log(response);
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
    data = sortData(data);
    let articleContainer = document.querySelector("#articles");

    for (let index in data) {
        if (data.hasOwnProperty(index))

        articleContainer.innerHTML += `
        <article>
            <div class="topText">
            <h1 class="titleShort">${data[index].title}</h1>
            <img src="assets/images/articles/${data[index].logo}" alt="logo" id="logo">
                <div>
                    <p>${data[index].date} - ${data[index].location}</p>
                    <p>${data[index].frequency} georganiseerd door ${data[index].organiser} voor ${data[index].audience}</p>
                    <p>${data[index].description}</p>
                </div>
            </div>
        </article>
        `
    }
}

function sortData(data) {
    let dataArray = Object.values(data);

    return dataArray.sort(function (a, b) {
        return Date.parse(b.date) - Date.parse(a.date);
    });
}


function changeCompact(e) {
    if (e.target.checked) {
        document.querySelectorAll("article").forEach(item => item.classList.add("compact"));
    } else {
        document.querySelectorAll("article").forEach(item => item.classList.remove("compact"));
    }
}
