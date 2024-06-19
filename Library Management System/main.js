// Define a Book class
class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
      this.available = true;
    }
  }
  
  // Initialize an empty array to store books
  let library = [];
  
  // Function to add a new book
  function addBook(title, author, isbn) {
    const book = new Book(title, author, isbn);
    library.push(book);
    renderBooks();
  }
  
  // Function to render the books in the UI
  function renderBooks(filteredBooks = library) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
  
    filteredBooks.forEach((book) => {
      const bookItem = document.createElement('li');
      bookItem.innerHTML = `
        <img src="book-cover.jpg" alt="Book Cover">
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>ISBN: ${book.isbn}</p>
        <p>Availability: ${book.available ? 'Available' : 'Borrowed'}</p>
        <button onclick="borrowBook('${book.title}')">Borrow</button>
      `;
      bookList.appendChild(bookItem);
    });
  }
  
  // Function to borrow a book
  function borrowBook(title) {
    const book = library.find(book => book.title === title);
    if (book && book.available) {
      book.available = false;
      renderBooks();
    }
  }
  
  // Event listener for the search form
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredBooks = library.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.isbn.toLowerCase().includes(searchTerm)
      );
    });
    renderBooks(filteredBooks);
  });
  
  // Event listener for the add book form
  const addBookForm = document.getElementById('add-book-form');
  addBookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleInput = document.getElementById('title-input');
    const authorInput = document.getElementById('author-input');
    const isbnInput = document.getElementById('isbn-input');
    addBook(titleInput.value, authorInput.value, isbnInput.value);
    titleInput.value = '';
    authorInput.value = '';
    isbnInput.value = '';
  });
  
  // Add some initial books
  addBook('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565');
  addBook('To Kill a Mockingbird', 'Harper Lee', '9780446310789');
  addBook('1984', 'George Orwell', '9780451524935');