"use strict";


const uButton = document.getElementById("update");
const aButton = document.getElementById("add");
const cButton = document.getElementById("clear");
const rButton = document.getElementById("remove");
const sButton = document.getElementById("save");
const canButton = document.getElementById("cancel");

const mB = document.getElementById("changesButts");

const title = document.getElementById("bookTitle");
const author = document.getElementById("bookAuthor");
const bStatus = document.getElementById("bookStatus");
const genre = document.getElementById("bookGenre");
const pages = document.getElementById("bookPages");
const rating = document.getElementById("bookRating");
const isbn = document.getElementById("bookISBN");

function startEdit() {
    uButton.style.display = "none";
    mB.style.display = "block";
    aButton.style.display = "none";
    cButton.style.display = "none";
    rButton.style.display = "none";
    sButton.style.display = "inline-block";
    canButton.style.display = "inline-block";
    enableEdit();
}

function finishEdit() {
    uButton.style.display = "inline-block";
    mB.style.display = "none";
    aButton.style.display = "inline-block";
    cButton.style.display = "inline-block";
    rButton.style.display = "inline-block";
    sButton.style.display = "none";
    canButton.style.display = "none";
    disableEdit();
}
function disableEdit() {
    title.disabled = true;
    author.disabled = true;
    bStatus.disabled = true;
    genre.disabled = true;
    pages.disabled = true;
    rating.disabled = true;
    isbn.disabled = true;

}
function enableEdit() {
    title.disabled = false;
    author.disabled = false;
    bStatus.disabled = false;
    genre.disabled = false;
    pages.disabled = false;
    rating.disabled = false;
    isbn.disabled = false;

}
function clearValues() {
    title.value = null;
    author.value = null;
    bStatus.selectedIndex = 0;
    genre.selectedIndex = 0;
    pages.value = null;
    rating.value = null;
    isbn.value = null;
    enableEdit();
}
