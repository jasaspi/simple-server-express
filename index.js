const express = require('express');
const { request } = require('http');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* List all the books 
List the data of one book DONE
Create a book (you can send the values using Postman)  DONE
Update a book (you can send the values using Postman) DONE
Delete a book DONE
Show the webpage on a browser. */

let books = [
    { id: '1', title: 'Harry Potter ja viisasten kivi', year: 1997, author: 'J.K Rowling' },
    { id: '2', title: 'Internet', year: 2022, author: 'Mikko Hyppönen' },
    { id: '3', title: 'JavaScript', year: 2001, author: 'Koodari Koodinen' }
]

//route to '(route)home'
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get("/api/books", (request, response) => {
    response.json(books);
})

// get data of one book
app.get('/api/books/:id', (request, response) => {
    const id = Number(request.params.id);
    const book = books.find(book => book.id === id);
    if (book) {
        response.json(book);
    } else {
        response.status(404).json({
            message: 'Not found'
        })
    }
});

// delete data of one book
app.delete('/api/books/:id', (request, response) => {
    const id = Number(request.params.id);
    books = books.filter(book => book.id != id);
    response.json(books);
    response.status(204).end();
})


//create book
app.post('/api/books', (request, response) => {
    // console.log(request.body);
    // response.send("ok");
    if (!request.body.title || !request.body.year || !request.body.author) {
        response.status(400).json({
            message: 'Some information was not entered'
        })
    } else {

        const newId = parseInt(books[books.length - 1].id, 10) + 1;
        const newBook = {
            id: newId,
            title: request.body.title,
            year: request.body.year,
            author: request.body.author

        }

        books.push(newBook);

        const url = `${request.protocol}://${request.get('host')}${request.originalUrl}/${newId}`;

        response.location(url);
        response.status(201).json(newBook);
    };

});

//update a book
app.patch('/api/books/:id', (request, response) => {
    const idToUpdate = Number(request.params.id);
    const newTitle = request.body.title;
    const newYear = request.body.year;
    const newAuthor = request.body.author;
/* 
    books.forEach(book => {
        if (book.id === idToUpdate) {
            book.title = newTitle;
            book.year = newYear;
            book.author = newAuthor;
        }
    }); */


    const book = books.find(book => book.id === idToUpdate);
    if (book) {
        book.title = newTitle;
        book.year = newYear;
        book.author = newAuthor;
        response.status(200).json(book)
    } else {
        response.status(404).json({
            message: 'Book not found'
        })
    }

});



app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response, next) => {
    response.status(404).send("Sorry the requested resource was not found.")
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));