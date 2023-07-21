let response = await fetch('http://localhost:9001/updateBook',{
    method: "PATCH",
    headers: {
        'Content-Type': 'application/json'
    });
    body: JSON.stringify ({
        "id": 3,
        "title": "Legends of Arathrae",
    }),
let updatebook = await response.json();
console.log(updatedbook);

// Function to retrieve a list of books from the server and display them on the admin page
async function displayBooks() {
    try {
      const response = await fetch('http://localhost:3001/listBooks');
      const books = await response.json();
      const bookList = document.querySelector('.book-list');
  
      books.forEach((book) => {
        const bookContainer = document.createElement('div');
        bookContainer.classList.add('book-item');
  
        const titleElement = document.createElement('h3');
        titleElement.textContent = book.title;
        bookContainer.appendChild(titleElement);
  
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = book.quantity;
        bookContainer.appendChild(quantityInput);
  
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Update Quantity';
        submitButton.addEventListener('click', async () => {
          try {
            const updatedQuantity = quantityInput.value;
            const updateResponse = await fetch('http://localhost:3001/updateBook', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: book.id,
                quantity: updatedQuantity
              })
            });
  
            if (updateResponse.ok) {
              // If update is successful, display a success message or perform any other necessary actions
              console.log(`Quantity of book ${book.title} updated to ${updatedQuantity}`);
            } else {
              // Handle error cases if needed
              console.error('Failed to update quantity');
            }
          } catch (error) {
            console.error('Error updating quantity', error);
          }
        });
  
        bookContainer.appendChild(submitButton);
        bookList.appendChild(bookContainer);
      });
    } catch (error) {
      console.error('Error fetching books', error);
    }
  }
  
  // Call the function to display books when the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    displayBooks();
  });
  
