"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector("#sidebarMenu").innerHTML += `
    <ul class="sidebarMenuInner">
        <li><a href="index.html">Home</a></li>
        <li><a href="artikels.html">Artikelen</a></li>
        <li><a href="deze_site.html">Opbouw site</a></li>
    </ul>
    `
}
