# BookKept

BookKept is an app for user to be able to keep tracks of the books they have read with ease.

**Link to project:** https://bookkept.netlify.app/
![Bookkept Image](https://github.com/JackGer26/Bookkept/blob/main/BookKept.PNG?raw=true)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

The user will enter an ISBN of a book into the input field and click a button to fetch book data from the Open Library API, which is parsed as JSON. A function is triggered by an event listener, which sends a request to the Open Library API using the entered ISBN. The code checks if the input is empty or if the book title or ISBN already exists in the list using conditional statements; if any condition fails, it alerts the user and stops further execution.

If the user enters a valid book that does not already exist in the list, the ISBN of the book is added to an array named isbnList, and the book title is stored in an array named Booklist. Both of these arrays are stored in local storage to ensure the user keeps their read books between browser sessions.

The book list is dynamically rendered in the ul element, with each book displayed as a li containing the book title, ISBN, and a delete button.

When the delete button is clicked, the corresponding book is removed from the arrays using the splice method, local storage, and the DOM.

On page load, a DOMContentLoaded event ensures the book list is loaded from local storage and rendered in the ul.

## Optimizations

Originally, the scrollbar logic (updateScrolbBar) was not consistently applied after adding or deleting books. This problem meant that if a user added 11 books, for example, and then deleted two, the scroll bar would still appear, despite there only being 9 books present in the list. To fix this, I ensured the updateScrollbar function is called after every addition or deletion of a book to keep the UI responsive and consistent.

Secondly, previously, the isbnList was recalculated from bookList during deletion, which led to varying inconsistencies. However, the code now directly updates the isbnList during deletion in the DOMContentLoaded event handler by mapping the updated bookList to extract ISBNs. This ensures consistency and avoids recalculating isbnList unnecessarily.

Next, an issue occurred where duplicate book titles could be added to the list if they had differing ISBNs. To change this, I added validation logic to check if the entered ISBN already exists in the isbnList OR if the book title already exists in the bookList. If a duplicate is found in either, then an alert is shown and the function is exited early.

In the early stages of coding, the list was not cleared before rendering, which led to duplicate entries being displayed in some instances. I fixed this by adding a line that ensures the ul is cleared before re-rendering the list. This prevents duplicate DOM elements from being appended.

Finally, deleting a book would previously have required re-rendering the entire list, which was inefficient. The code now removes only the specific li element corresponding to the deleted book using the removeChild method. This avoids unnecessary re-rendering of the entire list.

## Lessons Learned:

Data-UI Synchronization - The code demonstrates how to keep the (in this case, the ul) in sync with the underlying data (bookList and isbnList) stored in the localStorage. For example, when a book is added, it updates the DOM and localStorage; meanwhile, when a book is deleted, it removes the corresponding li from the DOM and updates localStorage. Playing with this code and feature in specific, reinforced that changes to the data model must be reflected in the UI and vice versa to avoid inconsistencies and bugs.

Usability - This code taught me the importance of paying attention to scalability and thus usability in my design, especially when dealing with dynamic content. Before the implementation of the scrollbar helper function, the book list could grow way too long, causing problems with the background image and the ease of using the website due to the excessive amount of scrolling.

Persistent State Management - This is my first public project using local storage, which was used here to ensure that the book list persisted across page reloads, providing a seamless user experience. It was an exciting lesson to learn so much and be able to play around with local storage. Moreover, it is encouraging that I was able to release a working app using local storage on my first attempt. Using persistent storage mechanisms to maintain application state when necessary will open up many paths in future projects.

Overall, this code highlighted the importance of building a cohesive system where the UI, data, and storage are tightly integrated and kept in sync. It also emphasizes the need for thoughtful validation, error handling, and performance optimization to create a robust and user-friendly application.
