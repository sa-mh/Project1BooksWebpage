"use strict";
const titlei = document.getElementById("bookTitle");
const authori = document.getElementById("bookAuthor");
const bStatusi = document.getElementById("bookStatus");
const genrei = document.getElementById("bookGenre");
const pagesi = document.getElementById("bookPages");
const ratingi = document.getElementById("bookRating");
const isbni = document.getElementById("bookISBN");
const addButton = document.getElementById("add");
const removeButton = document.getElementById("remove");
const saveButton = document.getElementById("save");
const theInputs = document.getElementById("inputLand");
const bookOutput = document.getElementById("imageDiv");
const slideList = document.getElementById("slideList");
const lButt = document.getElementById("leftButton");
const rButt = document.getElementById("rightButton");
const fields = document.querySelectorAll("div.centered table input, div.centered table select");

console.log(theInputs);

theInputs.addEventListener('submit', function (event) {
    event.preventDefault();
    if (event.submitter.id == "save") {
        updateBook();
    }
    else if(event.submitter.id == "add"){
        const data = {
            title: titlei.value,
            author: authori.value,
            genre: genrei.value,
            status: bStatusi.value,
            pages: pagesi.value,
            rating: ratingi.value,
            isbn: isbni.value,
            coverURL: "bookCover.jpg"
        }
        console.log(data);
        fetch("http://localhost:8080/addbook", { //Make request
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json"
            }
        }).then(response => { // Receive response
            return response.json(); // Convert response body to json
        }).then(data => { //json data from previous .then()
            addCards();
            console.log(data);
            console.log("got here");
            this.reset();
        }).catch(error => console.log(error));
        clearValues();
        disableEdit();
    }
    else{
        console.log("you broke it");
    }
});
function addCards() {
    let i = 0;
    bookOutput.innerHTML = ' ';
    slideList.innerHTML = ' ';
    fetch("http://localhost:8080/getbooks").then(response => response.json()).then(arrayOfBooks => {
        console.log("Books: ", arrayOfBooks);
        bookOutput.innerHTML = ' ';
        arrayOfBooks.forEach(function (book) {
            console.log(book);
            const slideInfo = document.createElement("li");
            slideInfo.setAttribute("data-target", "#demo");
            slideInfo.setAttribute("data-slide-to", i);
            if (i == 0) {
                slideInfo.setAttribute("class", "active");
            }
            slideInfo.setAttribute("data-id", book.id)
            slideInfo.setAttribute("onClick", "changeBook()");
            slideList.appendChild(slideInfo);


            const slide = document.createElement("div");
            if (i == 0) {
                slide.className = "carousel-item active";
            }
            else {
                slide.className = "carousel-item";
            }
            const bookCover = document.createElement("img");
            bookCover.setAttribute("src", "bookCover.jpg");
            bookCover.setAttribute("width", 275);
            bookCover.setAttribute("height", 370);
            bookCover.setAttribute("alt", "b" + book.id);

            slide.appendChild(bookCover);

            bookOutput.appendChild(slide);
            if (i == 0) {
                titlei.value = book.title;
                authori.value = book.author;
                genrei.value = book.genre;
                bStatusi.value = book.status;
                pagesi.value = book.pages;
                ratingi.value = book.rating;
                isbni.value = book.isbn;
                disableEdit();
            }


            i++;
        });
    }).catch(error => console.error(error));
}
addCards();
lButt.addEventListener("click", function (event) {
    changeBook();
});
rButt.addEventListener("click", function (event) {
    changeBook();
});
function removeBook() {
    let listItem = document.querySelector("li.active");
    let imageList = document.querySelector("div.active");
    fetch("http://localhost:8080/remove/" + listItem.getAttribute("data-id").toString(), { //Make request
        method: "DELETE"
    })
        .catch(error => console.log(error));
    location.reload();
}
function changeBook() {
    setTimeout(() => {
        enableEdit();
        var listItem = document.querySelector("li.active");
        console.log("http://localhost:8080/getbook/" + listItem.getAttribute("data-id"));
        fetch("http://localhost:8080/getbook/" + listItem.getAttribute("data-id"))
            .then(response => response.json())
            .then(receivedData => {
                titlei.value = receivedData.title;
                authori.value = receivedData.author;
                genrei.value = receivedData.genre;
                bStatusi.value = receivedData.status;
                pagesi.value = receivedData.pages;
                ratingi.value = receivedData.rating;
                isbni.value = receivedData.isbn;
            })
            .catch(error => console.error(error));
        disableEdit();
    }, 600);
}
function updateBook() {
    var listItem = document.querySelector("li.active");
    const data = {
        title: titlei.value,
        author: authori.value,
        genre: genrei.value,
        status: bStatusi.value,
        pages: pagesi.value,
        rating: ratingi.value,
        isbn: isbni.value,
        coverURL: "bookCover.jpg"
    }
    console.log(data);
    fetch("http://localhost:8080/updatebook?id="  + listItem.getAttribute("data-id"), { //Make request  + listItem.getAttribute("data-id")
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': "application/json"
        }
    }).then(response => { // Receive response
        return response.json(); // Convert response body to json
    }).then(data => { //json data from previous .then()
        console.log(data);
        console.log("got here");
        this.reset();
    }).catch(error => console.log(error));
    finishEdit();
}

//doesnt always seem to delete the right thing
//https://github.com/JHarry444/SpringDucks/tree/master/src/main/java/com/qa/duck/service
//https://github.com/JHarry444/CN-FE/blob/main/07_example_site/index.html
//update?id=id