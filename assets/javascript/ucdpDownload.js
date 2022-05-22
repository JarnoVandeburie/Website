"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
	document.querySelector("#btn-ucdp").addEventListener("click", downloadFile);
}

function downloadFile() {
	document.querySelector("#btn-ucdp").setAttribute("download", "../UCDP/pdf");
	document.querySelector("#btn-ucdp").click();
}