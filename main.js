// hide loading bar 
document.getElementById("spinner").style.display = "none";

// error massage 
document.getElementById("error-text").style.display = "none";

// spinner 
const toggleSpinner = displayStyle => {
    document.getElementById("spinner").style.display = displayStyle;
}

// previous result display block 
const toggleSearchCount = displayStyle => {
    document.getElementById("search-count").style.display = displayStyle;
}

// display error 
const displayError = displayStyle => {
    const errorMassage = document.getElementById("error-text").style.display = displayStyle;
}

// book search 
const searchBook = () => {
    const searchField = document.getElementById("search-text");
    const searchInput = searchField.value;

    // show spinner 
    toggleSpinner("block");

    // block count results 
    toggleSearchCount("none");

    searchField.value = "";

    // check wheather api working or not 
    if (searchInput === "") {
        // show error massage 
        displayError("block");

        // hide spinner 
        toggleSpinner("none");
    }
    else {
        // hide error massage 
        displayError("none");

        const url = `https://openlibrary.org/search.json?q=${searchInput}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.num_found, data.docs))
    }
}

// check any value null or not 
const createBook = (book) => {
    const bookImageId = (book?.cover_i);
    const bookTitle = (book?.title);
    const bookAuthors = (book?.author_name);
    const bookPublisher = (book?.publisher);
    const bookPublisherYear = (book?.first_publish_year);
    let title = "";
    let author = "";
    let year = "";
    if (bookTitle) {
        title = bookTitle;
    }
    else {
        title = "Unknown";
    }
    if (bookAuthors) {
        author = bookAuthors[0];
    }
    else {
        author = "Unknown";
    }
    if (bookPublisher) {
        publisher = bookPublisher;
    }
    else {
        publisher = "Unknown";
    }
    if (bookPublisherYear) {
        year = bookPublisherYear;
    }
    else {
        year = "Unknown";
    }

    // display the search book result 
    displayBooks(bookImageId, title, author, publisher, year);
}

// display search result 
const displaySearchResult = (count, books) => {

    // display total result count 
    const searchCount = document.getElementById("search-count");
    searchCount.textContent = '';
    const h4 = document.createElement("h4");

    // check wheather count attribute null or not 
    if (count) {
        h4.innerText = `Total Result Found: ${count}`;
    }
    else {
        h4.innerText = `Sorry no result found.`;
    }
    searchCount.appendChild(h4);

    // display search result 
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = '';
    books.forEach(book => {
        createBook(book);
    });

    // block spinner 
    toggleSpinner("none");

    // show count result 
    toggleSearchCount("block");
}

// display search result 
const displayBooks = (id, title, author, publisher, year) => {
    const card = document.createElement('div');
    card.setAttribute('class', "col")
    card.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${id}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">Author Name: ${author}</p>
                    <p class="card-text">Publisher: ${publisher}</p>
                    <p class="card-text">First Publish Year: ${year}</p>
                </div>
            </div>
            `
    const result = document.getElementById('search-result')
    result.appendChild(card);
}