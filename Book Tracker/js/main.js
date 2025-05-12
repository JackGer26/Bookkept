document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  const url = `https://openlibrary.org/isbn/${choice}.json`

  if (choice === '') { // Check if input field is empty
    return; // Do nothing if input field is empty
  }

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        if (data.title) { // Check if data.title is not undefined
          const bookList = localStorage.getItem('Books') ? JSON.parse(localStorage.getItem('Books')) : [];
          const isbnList = localStorage.getItem('ISBNs') ? JSON.parse(localStorage.getItem('ISBNs')) : [];

          // Check if the ISBN already exists
          if (isbnList.includes(choice)) {
            alert('ISBN already exists in the list');
            return;
          }

          // Check if the book title already exists
          if (bookList.some(book => book.title.trim().toLowerCase() === data.title.trim().toLowerCase())) {
            alert('This book title already exists in the list');
            return;
          }

          // Add the book title and ISBN to localStorage
          bookList.push({ title: data.title.trim(), isbn: choice });
          isbnList.push(choice);

          localStorage.setItem('Books', JSON.stringify(bookList));
          localStorage.setItem('ISBNs', JSON.stringify(isbnList));

          const ul = document.querySelector('ul');
          ul.innerHTML = ''; // Clear the ul element
          bookList.forEach((book, index) => {
            const li = document.createElement('li');
            li.textContent = `${book.title} [${book.isbn}]`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.style.marginLeft = '10px';
            deleteButton.addEventListener('click', () => {
              // Remove the book from the bookList and isbnList
              bookList.splice(index, 1);
              isbnList.splice(index, 1);

              // Update localStorage with the modified bookList and isbnList
              localStorage.setItem('Books', JSON.stringify(bookList));
              localStorage.setItem('ISBNs', JSON.stringify(isbnList));

              // Remove the list item from the DOM
              ul.removeChild(li);
            });
            li.appendChild(deleteButton);
            ul.appendChild(li);
          });
        } else {
          alert('No book title found');
        }
      })
      .catch(err => {
          alert('Not a valid book');
      });
}

// Load books on page load
document.addEventListener('DOMContentLoaded', () => {
  const bookList = localStorage.getItem('Books') ? JSON.parse(localStorage.getItem('Books')) : [];
  const ul = document.querySelector('ul');
  ul.innerHTML = ''; // Clear the ul element
  bookList.forEach((book, index) => {
    const li = document.createElement('li');
    li.textContent = `${book.title} [${book.isbn}]`;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginLeft = '10px';
    deleteButton.addEventListener('click', () => {
      // Remove the book from the bookList and isbnList
      bookList.splice(index, 1);
      const isbnList = bookList.map(book => book.isbn);
      localStorage.setItem('Books', JSON.stringify(bookList));
      localStorage.setItem('ISBNs', JSON.stringify(isbnList));

      // Remove the list item from the DOM
      ul.removeChild(li);
      updateScrollbar();
    });
    li.appendChild(deleteButton);
    ul.appendChild(li);
    updateScrollbar();
  });

  function updateScrollbar() {
    const ul = document.querySelector('ul');
    if (ul.children.length > 10) {
      ul.style.maxHeight = '300px';
      ul.style.overflowY = 'auto';
    } else {
      ul.style.maxHeight = '';
      ul.style.overflowY = '';
    }
  }
});

