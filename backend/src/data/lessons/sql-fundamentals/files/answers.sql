-- 1. Every column of every book
SELECT * FROM books;

-- 2. Title and author of every book, A to Z by title
SELECT title, author FROM books ORDER BY title;

-- 3. George Orwell's books: title and year, oldest first
SELECT title, year FROM books WHERE author = 'George Orwell' ORDER BY year;

-- 4. In-stock books under 400 rupees: title and price, cheapest first, then by title
SELECT title, price FROM books WHERE in_stock = 1 AND price < 400 ORDER BY price, title;

-- 5. The 3 longest books: title and pages
SELECT title, pages FROM books ORDER BY pages DESC LIMIT 3;

-- 6. Dystopia or Fiction books from the 1900s: title, genre and year, oldest first
SELECT title, genre, year FROM books WHERE genre IN ('Dystopia', 'Fiction') AND year BETWEEN 1900 AND 1999 ORDER BY year;

-- 7. Books with "the" anywhere in the title: title only, A to Z
SELECT title FROM books WHERE title LIKE '%the%' ORDER BY title;

-- 8. Every genre, once each, A to Z
SELECT DISTINCT genre FROM books ORDER BY genre;

-- 9. Andy Weir's books with 5% tax added: title and price_with_tax, cheapest first
SELECT title, ROUND(price * 1.05, 2) AS price_with_tax FROM books WHERE author = 'Andy Weir' ORDER BY price_with_tax;
