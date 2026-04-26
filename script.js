
const myLibrary = [];

class Library {
    constructor () {
        this.myLibrary = [];
    }

    removeBookFromLibrary(book){
        console.log("removing " + book.title + " from library");
        var targetId = book.fullID;
        for (let index = 0; index < this.myLibrary.length; index++) {
            console.log("comparing "+ this.myLibrary[index].getTitle + " with " + book.getTitle);
            if (this.myLibrary[index].fullID == targetId) {
                console.log("removing " + this.myLibrary[index].getTitle);
                this.myLibrary.splice(index,1);
                break;
            }
        }
        console.log(this.myLibrary);
        //return library;
    }

    addBookToLibrary(book) {
        console.log("adding " + book.title + " to library")
        this.myLibrary.push(book);
        console.log(this.myLibrary);
    }
    
    updateBookCell(book){
        const targetCell = document.getElementById(book.fullID);
        targetCell.innerHTML = book.info();
    }

    printLibrary() {
        var displayLibrary = document.getElementById("myLibraryContents");
        var displayLibraryBody = displayLibrary.getElementsByTagName('tbody')[0];
        console.log("printing library body \n" + displayLibraryBody);
        
        if (displayLibraryBody != null) {
            while (displayLibraryBody.rows.length > 0) {
                displayLibraryBody.deleteRow(0);
            }
        }
    
        for (const book of this.myLibrary) {
    
            var row = displayLibrary.insertRow(0);
            var cellText = row.insertCell(0);
            var cellBtnUpdateReadStatus = row.insertCell(1);
            var cellBtnRemoveBook = row.insertCell(2);
            cellText.innerHTML = book.info();
            cellText.setAttribute('id',book.fullID);
    
            const btnUpdateReadStatus = document.createElement("BUTTON");
            btnUpdateReadStatus.textContent = 'Update Read Status';
            btnUpdateReadStatus.id = 'myBtnUpdateReadStatus';
            btnUpdateReadStatus.addEventListener('click', () =>  {
                book.updateReadStatus();
                this.updateBookCell(book);
                }
            );

            /*
            btnUpdateReadStatus.addEventListener('click', function () {
                book.updateReadStatus();
                this.updateBookCell(book);
                }
            );
            */
    
            const btnRemoveBook = document.createElement("BUTTON");
            btnRemoveBook.textContent = 'Remove from Library';
            btnRemoveBook.id = 'myBtnRemoveFromLibrary';
            btnRemoveBook.addEventListener('click', () => {
                this.removeBookFromLibrary(book);
                this.printLibrary();
                }
            );
            
            /*btnRemoveBook.addEventListener('click', function () {
                this.removeBookFromLibrary(book);
                this.printLibrary();
                }
            );*/
    
            cellBtnUpdateReadStatus.appendChild(btnUpdateReadStatus);
            cellBtnRemoveBook.appendChild(btnRemoveBook);
        }
        displayLibrary.setAttribute('border','1');
    }

    createTextField (fieldType, fieldID, type, defaultValue){
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
    
    createTextInTableRow(tableID, value, rowPosition, rowID, cellPosition)
    {
        var row = tableID.insertRow(rowPosition);
        row.setAttribute('id',rowID);
        var cell = row.insertCell(cellPosition);
        cell.innerHTML = value;
    }

    initializeLibrary() {
        
        const myForm = document.createElement('form');
        myForm.setAttribute('id','myForm');
        myForm.setAttribute('action','/submit-data');
        myForm.setAttribute('method','POST');
    
        const myModal = document.createElement('dialog');
        myModal.setAttribute('id','myDialog');
        const myFormTable = document.createElement('table');
        const myFormTableBody = document.createElement('tbody');
        const myFormTableP = document.createElement('p');
        myFormTableP.textContent = "Time to add a book to the library!";
        
        myFormTable.setAttribute('border','1');
    
        myModal.appendChild(myForm);
        myForm.appendChild(myFormTableP);
        myForm.appendChild(myFormTable);
        myFormTable.appendChild(myFormTableBody);
        
        const btnEnterBookInfo = document.createElement("BUTTON");
        btnEnterBookInfo.textContent = 'Enter Book Information';
        btnEnterBookInfo.id = 'myBtnEnterBookInformation';
        btnEnterBookInfo.addEventListener('click', function () {
            myModal.showModal();
        }
        );
    
    
    
        const myBody = document.getElementById("myBody");
        myBody.appendChild(btnEnterBookInfo);
        myBody.appendChild(myModal);
    
        const cell0 = document.createElement('td');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');
        const cell3 = document.createElement('td');
        
        this.createTextInTableRow(myFormTable, "Book", 0, 'rowBook', 0);
        this.createTextInTableRow(myFormTable, "Author", 1, 'rowAuthor', 0);
        this.createTextInTableRow(myFormTable, "Pages", 2, 'rowPages',  0);
        this.createTextInTableRow(myFormTable, "Read", 3, 'rowIsRead', 0);
        this.createTextInTableRow(myFormTable, "Commands", 4, 'rowCommands', 0);
    
        const inputBookField = this.createTextField("INPUT", 'newBookID', 'text', 'a book name');
        const inputAuthorField = this.createTextField("INPUT", 'newAuthorID', 'text', 'author name');
        const inputPagesField = this.createTextField("INPUT", 'newPagesID', 'number', '100');
        const inputIsReadField = this.createTextField("INPUT", 'newIsReadID', 'checkbox', true);

        inputAuthorField.addEventListener('input', (event) => {
            if (inputAuthorField.value.length < 3){
                inputAuthorField.setCustomValidity("author name must be at least 3 characters");
                console.log("author name must be at least 3 characters");
                inputAuthorField.reportValidity();
            } else {
                inputAuthorField.setCustomValidity(""); //Valid
                console.log("we gucci");
            }
        })

    
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
        btnAddBook.type="SUBMIT";
        btnAddBook.textContent = 'Add Book';
        btnAddBook.id = 'myBtnAddBook';
        btnAddBook.addEventListener('click', (e) => {
            e.preventDefault();
            if(inputAuthorField.validity.valid){
                var newBookValue = document.getElementById('newBookID').value;
                var newAuthorValue = document.getElementById('newAuthorID').value;
                var newPagesID = document.getElementById('newPagesID').value;
                var newIsReadID = document.getElementById('newIsReadID').checked;
                const myBook = new Book (newBookValue, newAuthorValue, newPagesID, newIsReadID);
                this.addBookToLibrary(myBook);
                this.printLibrary();
                myModal.close();
            }

            
            
           // Event.preventDefault();
        }

        /*btnAddBook.addEventListener('click', function () {
            var newBookValue = document.getElementById('newBookID').value;
            var newAuthorValue = document.getElementById('newAuthorID').value;
            var newPagesID = document.getElementById('newPagesID').value;
            var newIsReadID = document.getElementById('newIsReadID').checked;
            const myBook = new Book (newBookValue, newAuthorValue, newPagesID, newIsReadID);
            this.addBookToLibrary(myBook);
            this.printLibrary();
            myModal.close();
            event.preventDefault();
           // Event.preventDefault();
        }*/
        );
    
        const cell4 = document.createElement('td');
        cell4.appendChild(btnAddBook);
        var btnrow = document.getElementById('rowCommands');
        btnrow.setAttribute('id','rowAddBook');
        var btncell = btnrow.insertCell();
        btncell.appendChild(btnAddBook);
        
        
        //myModal.show();
        
    }
}



class Book{
    constructor (title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }

    get readStatus () {
        return this.read;
    }

    set readStatus (newReadStatus) {
        this.read = newReadStatus;
    }

    get fullID () {
        return this.id;
    }

    get fullTitle() {
        return this.title;
    } 

    info () {
        let output = this.title + " Written by " + this.author + " " + this.pages + " pages";
        if (this.read == false)
            output += "<br> not read yet <br> ";
        else    
            output += "<br>  read this book <br>  ";
        return output;
    }

    updateReadStatus() {
        console.log(this.read);
        if (this.readStatus == true ) {
            console.log("status updated from read to not read for " + this.fullTitle);
            this.readStatus = false;
        }
        else if (this.readStatus == false) {
            console.log("status updated from not read to read for " + this.title);
            this.readStatus = true;
        }    
    }
}




const book1 = new Book("Dune","Frank Herbet", 500, false);
const book2 = new Book("Before They are Hanged","Joe Abercombie", 300, true);
const book3 = new Book("A Song of Fire and Ice", "George R. R. Martin", 600, false);
const book4 = new Book("Lord of The Rings", "J. R.R. Tolken", 2000, false);

let myCoolLibrary = new Library();
myCoolLibrary.initializeLibrary();

myCoolLibrary.addBookToLibrary(book1);
myCoolLibrary.addBookToLibrary(book2);
myCoolLibrary.addBookToLibrary(book3);
myCoolLibrary.addBookToLibrary(book4);


myCoolLibrary.printLibrary();

//addBookToLibrary(book1, myLibrary);
//addBookToLibrary(book2, myLibrary);
//addBookToLibrary(book3, myLibrary);
//addBookToLibrary(book4, myLibrary);

//printLibrary(myLibrary);