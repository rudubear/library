
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
        output = this.title + " Written by " + this.author + " " + this.pages + " pages";
        if (this.read == false)
            output += "<br> not read yet <br> ";
        else    
            output += "<br>  read this book <br>  ";
        return output;
    }

    this.getReadStatus = this.read;
    this.getID = this.id;
    this.getTitle = this.title;

}

Book.prototype.updateReadStatus = function () {
    console.log(this.read);
    if (this.read == true ) {
        console.log("status updated from read to not read for " + this.title);
        this.read = false;
    }
    else if (this.read == false) {
        console.log("status updated from not read to read for " + this.title);
        this.read = true;
    }
}

function removeBookFromLibrary(book, library){
    console.log("removing " + book.title + " from library");
    var targetId = book.getID;
    for (let index = 0; index < library.length; index++) {
        console.log("comparing "+ library[index].getTitle + " with " + book.getTitle);
        if (library[index].getID == targetId) {
            console.log("removing " + library[index].getTitle);
            library.splice(index,1);
            break;
        }
    }
    console.log(library);
    //return library;
}

function addBookToLibrary(book, library) {
    console.log("adding " + book.title + " to library")
    library.push(book);
    console.log(library);
}

function updateBookCell(book){
    const targetCell = document.getElementById(book.getID);
    targetCell.innerHTML = book.info();
}

function printLibrary(library) {
    var displayLibrary = document.getElementById("myLibraryContents");
    var displayLibraryBody = displayLibrary.getElementsByTagName('tbody')[0];
    console.log("printing library body \n" + displayLibraryBody);
    
    if (displayLibraryBody != null) {
        while (displayLibraryBody.rows.length > 0) {
            displayLibraryBody.deleteRow(0);
        }
    }

    for (const book of library) {

        var row = displayLibrary.insertRow(0);
        var cellText = row.insertCell(0);
        var cellBtnUpdateReadStatus = row.insertCell(1);
        var cellBtnRemoveBook = row.insertCell(2);
        cellText.innerHTML = book.info();
        cellText.setAttribute('id',book.getID);

        const btnUpdateReadStatus = document.createElement("BUTTON");
        btnUpdateReadStatus.textContent = 'Update Read Status';
        btnUpdateReadStatus.id = 'myBtnUpdateReadStatus';
        btnUpdateReadStatus.addEventListener('click', function () {
            book.updateReadStatus();
            updateBookCell(book);
            }
        );

        const btnRemoveBook = document.createElement("BUTTON");
        btnRemoveBook.textContent = 'Remove from Library';
        btnRemoveBook.id = 'myBtnRemoveFromLibrary';
        btnRemoveBook.addEventListener('click', function () {
            removeBookFromLibrary(book, library);
            printLibrary(library);
            //updateBookCell(book);
            }
        );

        cellBtnUpdateReadStatus.appendChild(btnUpdateReadStatus);
        cellBtnRemoveBook.appendChild(btnRemoveBook);
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
    //var displayEnterBookInfo = document.getElementById("enterBookInfo");
    //displayEnterBookInfo.setAttribute('border','1');
    //displayEnterBookInfo = document.createElement("inputBook");
    const myForm = document.createElement('form');
    myForm.setAttribute('id','myForm');
    myForm.setAttribute('action','/submit-data');
    myForm.setAttribute('method','POST');

    const myModal = document.createElement('dialog');
    myModal.setAttribute('id','myDialog');
    const myModalTable = document.createElement('table');
    const myModalTableBody = document.createElement('tbody');
    const myModalTableP = document.createElement('p');
    myModalTableP.textContent = "Time to add a book to the library!";
    
    myModalTable.setAttribute('border','1');

    myModal.appendChild(myForm);
    myForm.appendChild(myModalTableP);
    myForm.appendChild(myModalTable);
    myModalTable.appendChild(myModalTableBody);


    //myModal.innerHTML=
    //    '<p>Time to add a book!</p>' +
    //    '<form name ="myForm" onsubmit="return hue()" method="post">' +
    //    '<table id="tblAddBook">heh</table></form>';
    
    const btnEnterBookInfo = document.createElement("BUTTON");
    btnEnterBookInfo.textContent = 'Enter Book Information';
    btnEnterBookInfo.id = 'myBtnEnterBookInformation';
    btnEnterBookInfo.addEventListener('click', function () {
        myModal.show();
    }
    );



    const myBody = document.getElementById("myBody");
    myBody.appendChild(btnEnterBookInfo);
    myBody.appendChild(myModal);

    const cell0 = document.createElement('td');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    const cell3 = document.createElement('td');
    
    createTextInTableRow(myModalTable, "Book", 0, 'rowBook', 0);
    createTextInTableRow(myModalTable, "Author", 1, 'rowAuthor', 0);
    createTextInTableRow(myModalTable, "Pages", 2, 'rowPages',  0);
    createTextInTableRow(myModalTable, "Read", 3, 'rowIsRead', 0);
    createTextInTableRow(myModalTable, "Commands", 4, 'rowCommands', 0);

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
        var newBookValue = document.getElementById('newBookID').value;
        var newAuthorValue = document.getElementById('newAuthorID').value;
        var newPagesID = document.getElementById('newPagesID').value;
        var newIsReadID = document.getElementById('newIsReadID').checked;
        const myBook = new Book (newBookValue, newAuthorValue, newPagesID, newIsReadID);
        addBookToLibrary(myBook, myLibrary);
        printLibrary(myLibrary);
        myModal.close();
        event.preventDefault();
       // Event.preventDefault();
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
const book4 = new Book("Lord of The Rings", "J. R.R. Tolken", 2000, false);

addBookToLibrary(book1, myLibrary);
addBookToLibrary(book2, myLibrary);
addBookToLibrary(book3, myLibrary);
addBookToLibrary(book4, myLibrary);

printLibrary(myLibrary);