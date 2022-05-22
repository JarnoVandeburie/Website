"use strict";

document.addEventListener("DOMContentLoaded", init);

async function init() {

    document.querySelector("#sidebarMenu").innerHTML += `
    <ul class="sidebarMenuInner">
        <li><a href="index.html">Home</a></li>
        <li><a href="artikelen.html">Artikelen</a></li>
        <li><a href="opbouw.html">Opbouw site</a></li>
        <li><a href="ucdp.html">UCDP</a></li>
    </ul>
    `;

    await UncheckAll();
}

async function UncheckAll(){
    setTimeout(function () {
        document.querySelectorAll('input[type=checkbox]').forEach(box => box.checked = false);
    }, 2);




}
