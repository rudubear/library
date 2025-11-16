
const myLibrary = [];


function Book(title, author, pages, read){
    if (!new.target) {
        throw Error(" you must use the new operator to call the constructor")
    }


    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

    this.info = function(){
        output = this.title + " by " + this.author + ", " + this.pages + " pages";
        if (this.read == false)
            output += ", not read yet";
        else    
            output += ", read this book";
        return output;
    }

}

function addBookToLibrary(book, library) {
    console.log("adding " + book.title + " to library")
    library.push(book);
}

function printLibrary(library) {
    var displayLibrary = document.getElementById("myLibraryContents");
    for (const book of library) {

        var row = displayLibrary.insertRow(0);
        var cell = row.insertCell(0);
        cell.innerHTML = book.info();
        //var row = document.createElement("tr");
        //var bookCell = document.createElement("td");

        //bookCell.innerHTML = "testy" //book.info();
        console.log(displayLibrary);
        //displayLibrary.insertRow(row);
        //row.appendChild(bookCell);
        
        //document.getElementById("myLibraryContents").appendChild(row);
        // displayLibrary.appendChild(row);
        //console.log(book.info());
    }
    displayLibrary.setAttribute('border','1');
}

function createTextfield (fieldType, fieldID, type, defaultValue){
    var newField = document.createElement(fieldType);
    newField.setAttribute('type',type);
    newField.setAttribute('value',defaultValue);
    newField.setAttribute('id',fieldID);
    return newField;
}

function initializeLibrary() {
    var displayEnterBookInfo = document.getElementById("enterBookInfo");
    var displayEnterBookInfo = document.createElement("inputBook");
}

const book1 = new Book("Dune","Frank Herbet", 500, false);
const book2 = new Book("Before They are Hanged","Joe Abercombie", 300, true);
const book3 = new Book("A Song of Fire and Ice", "George R. R. Martin", 600, false);
const book4 = new Book("Lord of The Rings", "J. R.R. Tolken");

addBookToLibrary(book1, myLibrary);
addBookToLibrary(book2, myLibrary);
addBookToLibrary(book3, myLibrary);
addBookToLibrary(book4, myLibrary);

printLibrary(myLibrary);