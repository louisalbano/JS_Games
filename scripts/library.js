
//#region DECLARATIONS ---------------------------------------------------

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function toggleButtonVisibility() {
  const addBtn = document.querySelector('#add');
  const submitBtn = document.querySelector('#submit');
  const cancelBtn = document.querySelector('#cancel');

  addBtn.classList.toggle('is-visible');
  submitBtn.classList.toggle('is-visible');
  cancelBtn.classList.toggle('is-visible');
};

function cancelAddBook() {
  const tableBody = document.querySelector('#books');
  tableBody.lastChild.remove();
  toggleButtonVisibility();
}

function submitBook(myLibrary) {
  const fields = document.getElementsByTagName('input');
  myLibrary.push(new Book(fields[0]['value'], fields[1]['value'],
    fields[2]['value'], fields[3]['value']));

  toggleButtonVisibility();

  var books = document.querySelector('#books');
  while (books.firstChild) {
    books.removeChild(books.firstChild);
  }

  render(myLibrary)
}

function addBookToLibrary(library) {
  const tableBody = document.querySelector('#books');
  const row = document.createElement('tr');

  // Show/hide appropriate buttons
  toggleButtonVisibility();

  // Add empty text fields for new book
  for (i = 0; i < 3; i++) {
    const cell = document.createElement('td');
    const cellField = document.createElement('input')
    cellField.type = 'text';
    cell.appendChild(cellField);
    row.appendChild(cell);
  }

  // Add checkbox for Read
  const checkboxContainer = document.createElement('label');
  checkboxContainer.classList.add('checkbox-container');
  const cell = document.createElement('td');
  const checkbox = document.createElement('input')
  const span = document.createElement('span');
  span.classList.add('checkmark')
  checkbox.type = 'checkbox';
  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(span);
  cell.appendChild(checkboxContainer);
  row.appendChild(cell);

  tableBody.appendChild(row);
}

function render(library) {
  const tableBody = document.querySelector('#books');

  // build table body
  library.forEach(element => {
    const row = document.createElement('tr');

    for (var key in element) {
      let value =
        key === 'read'
          ? element[key]
            ? 'Read'
            : 'Not Read'
          : element[key];
      const cell = document.createElement('td');
      const cellText = document.createTextNode(value);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tableBody.appendChild(row)
  });
}

//#endregion

//#region EXECUTED ---------------------------------------------------

let myLibrary = [new Book('The Hobbit', 'J.R.R. Tolkien', 295, false),
new Book('American Gods', 'Neil Gaiman', 545, true)];

render(myLibrary);
const addBtn = document.querySelector('#add');
const submitBtn = document.querySelector('#submit');
const cancelBtn = document.querySelector('#cancel');
addBtn.addEventListener('click', (e) => {
  addBookToLibrary(myLibrary);
});
submitBtn.addEventListener('click', (e) => {
  submitBook(myLibrary);
});
cancelBtn.addEventListener('click', (e) => {
  cancelAddBook();
});

//#endregion