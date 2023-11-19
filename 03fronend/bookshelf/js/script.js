const STORAGE_KEY = "BOOK_APP";
const RENDER_EVENT = "render-book";

let books = [];

document.addEventListener("DOMContentLoaded", function () {
  const addBookForm = document.getElementById("add-book");
  const searchInput = document.getElementById("search-input");

  addBookForm.addEventListener("submit", addBook);
  searchInput.addEventListener("keyup", searchBook);
  document.addEventListener(RENDER_EVENT, renderBooks);
  getBooks();
});

function addBook(e) {
  e.preventDefault();
  const id = generateId();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").valueAsNumber;
  const bookObj = {
    id,
    title,
    author,
    year,
    isComplete: false,
  };
  books.push(bookObj);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveBooks();
}

function generateId() {
  return +new Date();
}

function renderBooks() {
  const completedBookList = document.getElementById("completed-books-list");
  completedBookList.innerHTML = "";
  const incompletedBookList = document.getElementById("incompleted-books-list");
  incompletedBookList.innerHTML = "";
  for (const book of books) {
    const bookElement = makeBook(book);
    book.isComplete
      ? completedBookList.append(bookElement)
      : incompletedBookList.append(bookElement);
    addAction(book.id);
  }
}

function addAction(id) {
  const toggleComplete = document.getElementById(`t-${id}`);
  const deleteBtn = document.getElementById(`d-${id}`);
  toggleComplete.addEventListener("click", updateBook(id));
  deleteBtn.addEventListener("click", showDeleteModal(id));
}

function getBooks(noRender) {
  const unparsedBooks = localStorage.getItem(STORAGE_KEY);
  if (unparsedBooks === null) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    return;
  }
  const parsedBooks = JSON.parse(unparsedBooks);
  books = parsedBooks;
  if (noRender) return;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function saveBooks() {
  const parsedBooks = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsedBooks);
}

function searchBook() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  getBooks(true);
  books = books.filter((b) => b.title.toLowerCase().includes(searchInput));
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function makeBook(book) {
  const bookStatus = book.isComplete ? "completed" : "incompleted";
  const toggleCompleteText = book.isComplete ? "Undo" : "Selesai Baca";
  const bookElement = document.createElement("div");
  bookElement.classList = `book-${bookStatus}`;
  bookElement.innerHTML = `
              <div class="book-title-${bookStatus} pad-in">
                <p> Title: ${book.title} </p>
                <div class="action-btn">
                  <div class="toggle-complete" id="t-${book.id}">${toggleCompleteText}</div>
                  <div class="delete" id="d-${book.id}">Hapus</div>
                </div>
              </div>
              <div class="book-author pad-in"><i>By ${book.author}</i></div>
              <div class="book-year pad-in">Published: ${book.year}</div>`;
  return bookElement;
}


function updateBook(id) {
  return function () {
    books = books.map((book) => {
      if (book.id == id) {
        book = { ...book, isComplete: !book.isComplete };
      }
      return book;
    });
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBooks();
  };
}

function deleteBook(id) {
  return function (e) {
    e.preventDefault();
    books = books.filter((book) => book.id != id);
    removeModal();
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBooks();
  };
}

function showDeleteModal(id) {
  return function () {
    showModal(id);
  };
}
function showModal(id) {
  const bookTitle = books.find((b) => b.id == id).title;
  const modalElement = document.createElement("div");
  modalElement.classList = "modal";
  modalElement.innerHTML = `
      <div class="container .modal-content">
        <p id="modal-message">Apakah anda yakin ingin menghapus buku "${bookTitle}" ?</p>
        <div class="modal-action">
          <button id="modal-ok-btn">Ya</button>
          <button id="modal-cancel-btn">Batal</button>
        </div>
      </div>
`;

  const main = document.getElementsByClassName("app")[0];
  main.append(modalElement);

  const modalOkBtn = document.getElementById("modal-ok-btn");
  modalOkBtn.addEventListener("click", deleteBook(id));

  const modalCancelBtn = document.getElementById("modal-cancel-btn");
  modalCancelBtn.addEventListener("click", removeModal);
}

function removeModal() {
  const modal = document.getElementsByClassName("modal")[0];
  modal.remove();
}
