const express = require('express');
const path = require('path');

const app = express();

/* List all the books 
List the data of one book 
Create a book (you can send the values using Postman) 
Update a book (you can send the values using Postman)
Delete a book 
Show the webpage on a browser. */

let books = [
    { id: '1588323375416', title: 'Harry Potter ja viisasten kivi', year: 1997, author: 'J.K Rowling' },
    { id: '1588323390624', title: 'Internet', year: 2022, author: 'Mikko Hyppönen' },
    { id: '1588323412643', title: 'JavaScript', year: 2001, author: 'Koodari Koodinen' }
]

//route to '(route)home'
app.get('/', (request, response) => {
    
    response.sendFile(path.join(__dirname,'public', 'index.html'));
});

app.get('/about', (request, response) => {
    response.sendFile(path.join(__dirname,'public', 'about.html'));
});

app.get("/books", (req, res) => {
    res.json(books);
})


app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response, next) => {
    response.status(404).send("Sorry the requested resource was not found.")
})




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));