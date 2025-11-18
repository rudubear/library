
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

function createTextField (fieldType, fieldID, type, defaultValue){
    var newField = document.createElement(fieldType);
    newField.setAttribute('type',type);
    newField.setAttribute('id',fieldID);
   
    if (type == 'checkbox') {
        newField.setAttribute('checked',defaultValue);
    }
    else {
        newField.setAttribute('value',defaultValue);
    }
    
    return newField;

}

function createTextInTableRow(tableID, value, rowPosition, rowID, cellPosition)
{
    var row = tableID.insertRow(rowPosition);
    row.setAttribute('id',rowID);
    var cell = row.insertCell(cellPosition);
    cell.innerHTML = value;
}


function initializeLibrary() {
    var displayEnterBookInfo = document.getElementById("enterBookInfo");
    displayEnterBookInfo.setAttribute('border','1');
    //displayEnterBookInfo = document.createElement("inputBook");
    
    const myModal = document.createElement('dialog');
    const myModalTable = document.createElement('table')
    myModalTable.setAttribute('border','1');

    
    myModal.innerHTML=
        '<p>Time to add a book!</p>' +
        '<form name ="myForm" onsubmit="return hue()" method="post">' +
        '<table id="tblAddBook">heh</table></form>';
    const myBody = document.getElementById("myBody");;
    myBody.appendChild(myModal);

    const cell0 = document.createElement('td');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    const cell3 = document.createElement('td');
    
    createTextInTableRow(displayEnterBookInfo, "Book", 0, 'rowBook', 0);
    createTextInTableRow(displayEnterBookInfo, "Author", 1, 'rowAuthor', 0);
    createTextInTableRow(displayEnterBookInfo, "Pages", 2, 'rowPages',  0);
    createTextInTableRow(displayEnterBookInfo, "Read", 3, 'rowIsRead', 0);
    createTextInTableRow(displayEnterBookInfo, "Commands", 4, 'rowCommands', 0);

    const inputBookField = createTextField("INPUT", 'newBookID', 'text', 'a book name');
    const inputAuthorField = createTextField("INPUT", 'newAuthorID', 'text', 'author name');
    const inputPagesField = createTextField("INPUT", 'newPagesID', 'number', '100');
    const inputIsReadField = createTextField("INPUT", 'newIsReadID', 'checkbox', true);

    const myRowBook = document.getElementById('rowBook');
    const myRowAuthor = document.getElementById('rowAuthor');
    const myPages = document.getElementById('rowPages');
    const myIsRead = document.getElementById('rowIsRead');

    cell0.appendChild(inputBookField);
    cell1.appendChild(inputAuthorField);
    cell2.appendChild(inputPagesField);
    cell3.appendChild(inputIsReadField);

    myRowBook.appendChild(cell0);
    myRowAuthor.appendChild(cell1);
    myPages.appendChild(cell2);
    myIsRead.appendChild(cell3);

    const btnAddBook = document.createElement("BUTTON");
    btnAddBook.textContent = 'Add Book';
    btnAddBook.id = 'myBtnAddBook';
    btnAddBook.addEventListener('click', function () {
        myModal.show();
    }
    );

    const cell4 = document.createElement('td');
    cell4.appendChild(btnAddBook);

    var btnrow = document.getElementById('rowCommands');
    btnrow.setAttribute('id','rowAddBook');
    var btncell = btnrow.insertCell();
    btncell.appendChild(btnAddBook);

    
    //myModal.show();

}
initializeLibrary();

const book1 = new Book("Dune","Frank Herbet", 500, false);
const book2 = new Book("Before They are Hanged","Joe Abercombie", 300, true);
const book3 = new Book("A Song of Fire and Ice", "George R. R. Martin", 600, false);
const book4 = new Book("Lord of The Rings", "J. R.R. Tolken");

addBookToLibrary(book1, myLibrary);
addBookToLibrary(book2, myLibrary);
addBookToLibrary(book3, myLibrary);
addBookToLibrary(book4, myLibrary);

printLibrary(myLibrary);